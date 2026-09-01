#!/usr/bin/env node
/**
 * 落地页画廊 — 索引扫描
 *
 * 以 dist/ 产物为权威页面清单，用 src/pages 下的源文件把 5000+ 条 URL
 * 折叠回约 430 个「模板」（一个模板 = 一种版式），输出 public/_gallery/index.json。
 *
 * 用法: node scripts/gallery/scan.mjs
 */
import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { bundle } from './bundle.mjs'

const ROOT = path.resolve(import.meta.dirname, '../..')
const DIST = path.join(ROOT, 'dist')
const PAGES = path.join(ROOT, 'src/pages')
const OUT_DIR = path.join(ROOT, 'public/_gallery')
const OUT_FILE = path.join(OUT_DIR, 'index.json')

/** 渠道排序优先级，用于挑选代表页 */
const CHANNEL_ORDER = ['卡扣', '卡群', '棒群', '混合', '引导弹窗', '提高质量_', 'kakao', 'band', 'modal-kakao', 'form-kakao', 'choice']

/** 这些页面在 iframe 里会自己跳走，不截图也不预览 */
const BLACKLIST = [/^common\/重定向\//, /^common\/A页_加载\//]

/**
 * 参数取值域 + 二次拆分。
 *
 * KR 有两套并存的路由体系，产出的 URL 形态完全一样（campaignId.version.渠道），
 * 唯一的区别是渠道值：V1 用中文（卡扣/棒群…），V2 用英文 routeId（kakao/band…）。
 * 不加约束的话宽松的那个模板会把另一套的页面全吞掉。
 *
 * 带 domains 的模板优先认领；splitBy 再把一个"分派入口"拆成各自的版式卡片
 * （V2 入口按 campaignId 分派到 sinmun / gyeonggi / zen 三套完全不同的模板）。
 */
const REFINE = {
  'KR/[name]/[variant]/index.astro': {
    domains: { variant: String.raw`[^/]+\.\d+\.(?:kakao|band|modal-kakao|form-kakao|choice)` },
    splitBy: params => params.variant?.replace(/\.\d+\.[^.]+$/, '') ?? null,
  },
}

// ---------- 工具 ----------

async function walk(dir, filter, base = dir, out = []) {
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  }
  catch {
    return out
  }
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git')
        continue
      await walk(full, filter, base, out)
    }
    else if (filter(e.name)) {
      out.push(path.relative(base, full).split(path.sep).join('/'))
    }
  }
  return out
}

const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * 把源模板相对路径转成匹配 dist 产物的正则。
 * 'KR/[people]/20260621-1.[version].[t]/index.html'
 *   → /^KR\/([^/]+)\/20260621\-1\.([^/]+)\.([^/]+)\/index\.html$/
 */
function templateToRegex(relHtml, domains = {}) {
  const params = []
  const body = relHtml
    .split(/(\[[^\]]+\])/g)
    .map((chunk) => {
      const m = /^\[([^\]]+)\]$/.exec(chunk)
      if (!m)
        return escapeRegex(chunk)
      params.push(m[1])
      return `(${domains[m[1]] ?? '[^/]+'})`
    })
    .join('')
  return { re: new RegExp(`^${body}$`), params }
}

/** 源文件路径 → 它会产出的 dist 相对路径（含 [param] 占位） */
function sourceToDistPattern(rel) {
  const noExt = rel.replace(/\.(astro|md|mdx|html)$/, '')
  return `${noExt}.html`
}

/** dist 相对文件路径 → 可访问 URL（build.format: "preserve"） */
function fileToUrl(file) {
  const url = file.endsWith('/index.html') ? `/${file.slice(0, -'index.html'.length)}` : `/${file}`
  return url
}

/** 剔除每次构建都会变的 timestamp，再算内容指纹 */
function contentHash(html) {
  const stable = html
    .replace(/<meta\s+name=["']timestamp["'][^>]*>/gi, '')
    .replace(/\s+/g, ' ')
  return createHash('sha1').update(stable).digest('hex').slice(0, 12)
}

function pick(html, re) {
  const m = re.exec(html)
  return m ? m[1].trim().replace(/\s+/g, ' ') : null
}

/** 从路径里榨出可分组的元数据 */
function parsePath(file, params) {
  const segs = file.split('/')
  const region = segs[0] || 'ROOT'
  const dirSegs = segs.slice(0, -1)
  const last = dirSegs[dirSegs.length - 1] || segs[segs.length - 1]

  let date = null
  let serial = null
  for (const s of dirSegs) {
    const m = /(\d{8})-(\d+(?:\.\d+)?)/.exec(s)
    if (m) {
      date = m[1]
      serial = m[2]
    }
  }

  // 目录名下划线后的备注，如 20260106-1.0_投资相关度100
  let suffix = null
  const sm = /_([^_/.]+)$/.exec(last)
  if (sm && !CHANNEL_ORDER.includes(last))
    suffix = sm[1]

  // 第二段：人物 / 分类（通版、AI诊股、柳秀真、Adam_Khoo…）
  let category = null
  if (dirSegs.length >= 2) {
    const second = dirSegs[1]
    if (!/^\d{8}-/.test(second))
      category = second
  }
  if (params.people)
    category = params.people
  if (params.name)
    category = params.name

  return { region, category, date, serial, suffix }
}

// ---------- 主流程 ----------

async function main() {
  const t0 = Date.now()

  const distFiles = (await walk(DIST, n => n.endsWith('.html')))
    // 排除构建资源，以及画廊自己（dist/_gallery 是从 public 复制过去的）
    .filter(f => !f.startsWith('mjSFqQ/') && !f.startsWith('_gallery/'))
    .sort()
  if (!distFiles.length) {
    console.error('✗ dist/ 里没有 HTML — 先跑 `bun run build`')
    process.exit(1)
  }

  const sourceFiles = (await walk(PAGES, n => /\.(?:astro|md|mdx|html)$/.test(n)))
    // Astro 忽略下划线开头的文件/目录
    .filter(f => !f.split('/').some(s => s.startsWith('_')))

  // 更「具体」的模板先匹配，避免 KR/[name]/[variant] 这种宽泛模板吞掉别人
  const templates = sourceFiles
    .map((src) => {
      const refine = REFINE[src]
      const pattern = sourceToDistPattern(src)
      const { re, params } = templateToRegex(pattern, refine?.domains)
      const literal = pattern.replace(/\[[^\]]+\]/g, '').length
      return { src, pattern, re, params, literal, refine }
    })
    // 取值域约束比字面量长度更强：先让被约束的模板认领它确实拥有的 URL
    .sort((a, b) => (b.refine ? 1 : 0) - (a.refine ? 1 : 0)
      || b.literal - a.literal
      || a.src.localeCompare(b.src))

  // 1) 用模板认领 dist 产物
  const pool = new Set(distFiles)
  const groups = []
  for (const tpl of templates) {
    const variants = []
    for (const file of pool) {
      const m = tpl.re.exec(file)
      if (!m)
        continue
      const params = {}
      tpl.params.forEach((name, i) => {
        params[name] = m[i + 1]
      })
      variants.push({ file, params })
    }
    if (!variants.length)
      continue
    variants.forEach(v => pool.delete(v.file))

    const split = tpl.refine?.splitBy
    if (split) {
      const buckets = new Map()
      for (const v of variants) {
        const k = split(v.params) ?? '—'
        if (!buckets.has(k))
          buckets.set(k, [])
        buckets.get(k).push(v)
      }
      for (const [k, vs] of buckets) {
        groups.push({ source: `src/pages/${tpl.src}#${k}`, dynamic: true, variants: vs })
      }
    }
    else {
      groups.push({ source: `src/pages/${tpl.src}`, dynamic: tpl.params.length > 0, variants })
    }
  }

  // 2) dist 里剩下的都是 public/ 直投的静态页，各自成组
  for (const file of pool) {
    groups.push({ source: `public/${file}`, dynamic: false, variants: [{ file, params: {} }] })
  }

  // 3) 人工备注（接管仓库里已存在的 folder-alias.json）
  let alias = {}
  try {
    alias = JSON.parse(await fs.readFile(path.join(ROOT, 'folder-alias.json'), 'utf8'))
  }
  catch { /* 没有就算了 */ }

  // 4) 逐组挑代表页 + 读元数据
  const out = []
  for (const g of groups) {
    g.variants.sort((a, b) => {
      const va = Number(a.params.version ?? 0)
      const vb = Number(b.params.version ?? 0)
      if (va !== vb)
        return va - vb
      const chan = v => v.params.t ?? v.params.variant?.split('.').pop() ?? ''
      const ta = CHANNEL_ORDER.indexOf(chan(a))
      const tb = CHANNEL_ORDER.indexOf(chan(b))
      if (ta !== tb)
        return (ta < 0 ? 99 : ta) - (tb < 0 ? 99 : tb)
      return a.file.localeCompare(b.file)
    })

    const rep = g.variants[0]
    let html = ''
    let bytes = 0
    try {
      html = await fs.readFile(path.join(DIST, rep.file), 'utf8')
      bytes = new TextEncoder().encode(html).length
    }
    catch { /* 理论上不会 */ }

    const meta = parsePath(rep.file, rep.params)
    const srcDir = g.source.replace(/\/(index\.(astro|html|md)|[^/]+\.(astro|html|md))$/, '')
    const note = alias[srcDir]?.description ?? alias[g.source]?.description ?? null

    const channels = [...new Set(g.variants
      .map(v => v.params.t ?? v.params.variant?.split('.').pop())
      .filter(Boolean))]
    const people = [...new Set(g.variants.map(v => v.params.people ?? v.params.name).filter(Boolean))]

    // deploy_rsync.sh 排除 *_/ 与 YY/
    const deployable = !rep.file.split('/').some(s => s.endsWith('_') || s === 'YY')

    out.push({
      id: createHash('sha1').update(g.source).digest('hex').slice(0, 10),
      source: g.source,
      dynamic: g.dynamic,
      // 组件片段（pages 目录下的 .astro 组件）渲染出来只有一截 DOM：
      // Astro 会给它们也加 doctype，所以要靠 html/charset/script 三者皆无来判定
      fragment: /\/components\/[^/]+\.astro$/.test(g.source)
        || !/<html[\s>]|<meta\s+charset|<script/i.test(html),
      blacklisted: BLACKLIST.some(re => re.test(rep.file)),
      deployable,
      private: rep.file.startsWith('private/'),
      ...meta,
      title: pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
      description: pick(html, /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i),
      lang: pick(html, /<html[^>]*\slang=["']([^"']+)["']/i),
      note,
      channels,
      people,
      variantCount: g.variants.length,
      rep: { file: rep.file, url: fileToUrl(rep.file), hash: contentHash(html), bytes },
      variants: g.variants.slice(0, 400).map(v => ({ url: fileToUrl(v.file), ...v.params })),
    })
  }

  out.sort((a, b) =>
    a.region.localeCompare(b.region)
    || (b.date ?? '').localeCompare(a.date ?? '')
    || a.source.localeCompare(b.source))

  const payload = {
    generatedAt: new Date().toISOString(),
    stats: {
      templates: out.length,
      urls: distFiles.length,
      grouped: out.reduce((n, t) => n + t.variantCount, 0),
      ungrouped: 0,
      fragments: out.filter(t => t.fragment).length,
    },
    templates: out,
  }
  payload.stats.ungrouped = payload.stats.urls - payload.stats.grouped

  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.writeFile(OUT_FILE, JSON.stringify(payload))

  const kb = Math.round((await fs.stat(OUT_FILE)).size / 1024)
  console.log(`✓ 画廊索引: ${payload.stats.templates} 个模板 / ${payload.stats.urls} 条 URL`
    + ` · 未分组 ${payload.stats.ungrouped} · 碎片 ${payload.stats.fragments}`
    + ` · ${kb}KB · ${Date.now() - t0}ms`)
  if (payload.stats.ungrouped !== 0)
    console.warn('  ⚠ 未分组数应为 0，请检查模板匹配逻辑')

  // 顺手刷新线上入口（密码门 + 内嵌索引）
  await bundle({ quiet: true })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
