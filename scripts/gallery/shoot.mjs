#!/usr/bin/env node
import fs from 'node:fs/promises'
/**
 * 落地页画廊 — 批量截图（增量）
 *
 * 只截「代表页」，按产物 HTML 的内容指纹判断是否需要重截。
 * 截图是缓存层：没截到的页面画廊会自动回落成实时 iframe，所以这里失败不致命。
 *
 * 用法:
 *   node scripts/gallery/shoot.mjs                 # 增量截全部
 *   node scripts/gallery/shoot.mjs --all           # 强制全量重截
 *   node scripts/gallery/shoot.mjs --ids=a1b2,c3d4 # 只截指定模板
 *   node scripts/gallery/shoot.mjs --base=http://localhost:4321  # 截 dev server 而非 dist
 */
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'
import { bundle } from './bundle.mjs'

const ROOT = path.resolve(import.meta.dirname, '../..')
const DIST = path.join(ROOT, 'dist')
const GALLERY = path.join(ROOT, 'public/_gallery')
const SHOTS = path.join(GALLERY, 'shots')
const MANIFEST = path.join(GALLERY, 'shots.json')

const VIEWPORT = { width: 390, height: 844 }
const CONCURRENCY = 5
const MAX_FULL_HEIGHT = 12000

/** 第三方脚本一律拦截：既防止往生产 GA4 打几百次 pageview，也大幅加速 */
const BLOCK_HOSTS = /googletagmanager|google-analytics|facebook\.(?:net|com)|tiktok|doubleclick|hotjar|clarity\.ms|criteo|taboola/i

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

/** 极简静态服务器，按 build.format:"preserve" 的规则解析 URL */
function serveDist() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      try {
        let rel = decodeURIComponent(req.url.split('?')[0])
        if (rel.endsWith('/'))
          rel += 'index.html'
        const file = path.join(DIST, rel)
        if (!file.startsWith(DIST)) {
          res.writeHead(403).end()
          return
        }
        const buf = await fs.readFile(file)
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream' })
        res.end(buf)
      }
      catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404')
      }
    })
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }))
  })
}

/**
 * 滚一遍整页再回到顶部。
 * 项目里的 .reveal 元素初始 opacity:0，靠 scroll 事件才加 .in —— 不滚就会截出大片空白。
 * 同时触发 loading="lazy" 图片加载。
 */
async function primePage(page) {
  // 页面自己的 scroll 监听可能抛错（有几页的处理器会读 undefined 的 preventDefault），
  // 滚动只是为了触发 reveal / 懒加载，失败就退回不滚动直接截
  await page.evaluate(async () => {
    await new Promise((done) => {
      let y = 0
      const step = () => {
        window.scrollTo(0, y)
        y += Math.round(window.innerHeight * 0.8)
        if (y < document.body.scrollHeight + window.innerHeight) {
          setTimeout(step, 90)
        }
        else {
          window.scrollTo(0, 0)
          setTimeout(done, 350)
        }
      }
      step()
    })
  }).catch(() => {})
  await page.evaluate(() => document.fonts?.ready).catch(() => {})
}

async function shootOne(context, base, tpl) {
  const page = await context.newPage()
  try {
    await page.route('**/*', (route) => {
      const url = route.request().url()
      if (BLOCK_HOSTS.test(url))
        return route.abort()
      return route.continue()
    })

    const url = base + encodeURI(tpl.rep.url)
    await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 })
      .catch(() => page.goto(url, { waitUntil: 'load', timeout: 20000 }))
      .catch(() => page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }))
    await page.waitForTimeout(600)
    await primePage(page)

    // 首屏：视口 clip
    const card = await page.screenshot({ animations: 'disabled', clip: { x: 0, y: 0, ...VIEWPORT } })
    await sharp(card).resize({ width: 390 }).webp({ quality: 72 }).toFile(path.join(SHOTS, `${tpl.id}.card.webp`))

    // 整页长图：必须用 fullPage —— clip 超出视口的部分会被直接丢掉
    const fullPng = await page.screenshot({ animations: 'disabled', fullPage: true })
    const meta = await sharp(fullPng).metadata()
    const scaled = Math.round(meta.height * (390 / meta.width))
    const outH = Math.min(scaled, MAX_FULL_HEIGHT)
    // WebP 单边硬上限 16383px —— 超长页必须在编码前裁掉，否则 sharp 直接报错
    let pipe = sharp(fullPng).resize({ width: 390 })
    if (outH < scaled)
      pipe = pipe.extract({ left: 0, top: 0, width: 390, height: outH })
    await pipe.webp({ quality: 62 }).toFile(path.join(SHOTS, `${tpl.id}.full.webp`))

    return { id: tpl.id, hash: tpl.rep.hash, height: outH }
  }
  finally {
    await page.close().catch(() => {})
  }
}

/** 并发池 */
async function pool(items, limit, worker) {
  const results = []
  let cursor = 0
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++
      results[i] = await worker(items[i], i)
    }
  }))
  return results
}

export async function shoot({ ids = null, all = false, base = null, quiet = false } = {}) {
  const index = JSON.parse(await fs.readFile(path.join(GALLERY, 'index.json'), 'utf8'))
  let manifest = {}
  try {
    manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'))
  }
  catch { /* 首次运行 */ }

  // 页面被删掉后，它的截图会变成孤儿：清掉，否则缓存目录只增不减
  const alive = new Set(index.templates.map(t => t.id))
  const orphans = Object.keys(manifest).filter(id => !alive.has(id))
  for (const id of orphans) {
    delete manifest[id]
    await fs.rm(path.join(SHOTS, `${id}.card.webp`), { force: true })
    await fs.rm(path.join(SHOTS, `${id}.full.webp`), { force: true })
  }
  if (orphans.length && !quiet)
    console.log(`  清理 ${orphans.length} 张孤儿截图`)

  let targets = index.templates.filter(t => !t.fragment && !t.blacklisted)
  if (ids?.length)
    targets = targets.filter(t => ids.includes(t.id))
  if (!all && !ids?.length)
    targets = targets.filter(t => manifest[t.id]?.hash !== t.rep.hash)

  if (!targets.length) {
    if (orphans.length)
      await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 0))
    if (!quiet)
      console.log('✓ 截图已是最新，无需重截')
    return { shot: 0, failed: [] }
  }

  await fs.mkdir(SHOTS, { recursive: true })

  let server = null
  let origin = base
  if (!origin) {
    const s = await serveDist()
    server = s.server
    origin = `http://127.0.0.1:${s.port}`
  }

  const { chromium } = await import('playwright')
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  })

  const failed = []
  let done = 0
  const t0 = Date.now()

  // 边跑边落盘：中途中断也能保住已截的部分，画廊刷新即可看到
  const flush = () => fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 0))

  await pool(targets, CONCURRENCY, async (tpl) => {
    try {
      const r = await shootOne(context, origin, tpl)
      manifest[tpl.id] = { hash: r.hash, height: r.height, at: new Date().toISOString() }
    }
    catch (e) {
      failed.push({ id: tpl.id, url: tpl.rep.url, error: String(e.message ?? e).split('\n')[0] })
    }
    done++
    if (done % 15 === 0)
      await flush()
    if (!quiet && done % 10 === 0)
      process.stdout.write(`\r  截图中 ${done}/${targets.length}…`)
  })

  await browser.close()
  server?.close()

  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 0))
  await bundle({ quiet: true })

  if (!quiet) {
    const secs = ((Date.now() - t0) / 1000).toFixed(1)
    console.log(`\r✓ 截图完成 ${targets.length - failed.length}/${targets.length} · ${secs}s          `)
    if (failed.length) {
      console.log(`  ✗ ${failed.length} 个失败:`)
      failed.slice(0, 20).forEach(f => console.log(`     ${f.url} — ${f.error}`))
    }
  }
  return { shot: targets.length - failed.length, failed }
}

// CLI
if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  const arg = k => process.argv.find(a => a.startsWith(`--${k}=`))?.split('=').slice(1).join('=')
  await shoot({
    all: process.argv.includes('--all'),
    ids: arg('ids')?.split(',').filter(Boolean) ?? null,
    base: arg('base') ?? null,
  })
}
