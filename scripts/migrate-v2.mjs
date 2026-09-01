/**
 * 跳转 V2 批量迁移
 *   bun scripts/migrate-v2.mjs            # dry-run，只报告
 *   bun scripts/migrate-v2.mjs --apply    # 落盘
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { findDef } from './classify-v2.mjs'

// 注意：SSI 注入当前是停用状态（`<!--` 与 `#` 之间留一个空格，nginx 不识别）。
// 原因见 CLAUDE.md —— 目标文件缺失时 nginx 会把整张 404 页塞进 const link 的
// 字符串字面量里，撑破 JS 导致整个 script 块 SyntaxError。
// 若要重新启用，用 CLAUDE.md 里那条 sed 整站切换，不要单独改这里。
const APPLY = process.argv.includes('--apply')
const V2 = '/mjSFqQ/QvBmKz.js'

const files = execSync(
  `grep -rl "link-btn\\|onLinkBtnClick\\|mixinJump\\|XoONOW\\|跟踪代码粘贴\\|jumpToKakao\\|jumpToBand" --include="*.astro" --include="*.html" src public 2>/dev/null | grep -v "wp-content\\|vendor\\|node_modules\\|\\.min\\.\\|mjSFqQ/js/\\|__v2test__"`,
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
).trim().split('\n').filter(Boolean)

const counts = {}
const bump = (k, n = 1) => { counts[k] = (counts[k] || 0) + n }
const skipped = []
const changedFiles = []

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
// 已知的页内真锚点，不是跳转 CTA
const ANCHOR_EXCLUDE = /href\s*=\s*"#(?!")[A-Za-z][\w-]*"/

for (const f of files) {
  const orig = readFileSync(f, 'utf8')
  let s = orig
  const isAstro = f.endsWith('.astro')
  const inlineAttr = isAstro ? ' is:inline' : ''

  // ── 1. 内嵌 onLinkBtnClick 定义：整块 / 局部删除 ──
  const blocks = [...s.matchAll(SCRIPT_RE)]
  for (let i = blocks.length - 1; i >= 0; i--) {
    const m = blocks[i]
    const body = m[2]
    const d = findDef(body)
    if (!d) continue
    const rest = (body.slice(0, d[0]) + body.slice(d[1]))
      .replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '').trim()

    if (rest === '') {
      // 纯定义块 → 换成 SSI link 声明 + V2 脚本引用
      const repl = `<script${inlineAttr}>\n    const link = '<!-- #include file="link.txt" -->'\n</script>\n<script src="${V2}"${inlineAttr}></script>`
      s = s.slice(0, m.index) + repl + s.slice(m.index + m[0].length)
      bump('内嵌定义-整块替换')
    }
    else {
      // 块内还有别的代码 → 只摘掉函数定义，其余保留
      let newBody = body.slice(0, d[0]) + body.slice(d[1])
      // 定义没了，同块内对该名字的引用要指向 V2 挂在 window 上的实现，
      // 否则 `window.onLinkBtnClick = onLinkBtnClick` 这类语句会 ReferenceError
      const selfMount = /\n?[^\n]*\bwindow\.onLinkBtnClick\s*=\s*onLinkBtnClick\s*;?[^\n]*/g
      if (selfMount.test(newBody)) { newBody = newBody.replace(selfMount, ''); bump('删除自挂载语句') }
      const dangling = newBody.match(/(?<!\.)\bonLinkBtnClick\b/g)
      if (dangling) {
        newBody = newBody.replace(/(?<!\.)\bonLinkBtnClick\b/g, 'window.onLinkBtnClick')
        bump('裸引用→window.onLinkBtnClick', dangling.length)
      }
      const newBlock = `<script${m[1]}>${newBody}</script>\n<script${inlineAttr}>\n    const link = '<!-- #include file="link.txt" -->'\n</script>\n<script src="${V2}"${inlineAttr}></script>`
      s = s.slice(0, m.index) + newBlock + s.slice(m.index + m[0].length)
      bump('内嵌定义-保留同块其他代码')
      skipped.push(`${f}  (同块保留: ${rest.slice(0, 60).replace(/\s+/g, ' ')})`)
    }
  }

  // ── 2. 脚本引用换成 V2 ──
  if (/XoONOW\.js/.test(s)) {
    s = s.replace(/\/mjSFqQ\/XoONOW\.js/g, V2)
    bump('脚本引用 XoONOW→QvBmKz')
  }

  // ── 3. 独立的 link 占位 → SSI 注入 ──
  s = s.replace(/((?:const|var|let)\s+link\s*=\s*)(['"])(?:https?:\/\/[^'"]*|)\2/g, (mm, head) => {
    bump('link 占位→SSI')
    return `${head}'<!-- #include file="link.txt" -->'`
  })

  // ── 4. 槽位上方插入 head.html ──
  if (!/include file="head\.html"/.test(s)) {
    const slot = /([ \t]*)(<!--+\s*[⬇↓][^\n]*?(?:跟踪代码粘贴|PASTE TRACKING CODE)[^\n]*?-->)/i.exec(s)
    if (slot) {
      s = s.slice(0, slot.index) + `${slot[1]}<!-- #include file="head.html" -->\n` + s.slice(slot.index)
      bump('插入 head.html')
    }
  }

  // ── 5. 绑定统一 ──
  // 5a. Astro frontmatter 里的 jumpFn 字符串（引号需换成双引号包单引号）
  s = s.replace(/'jumpToBand\(\)'/g, () => { bump('jumpFn:band'); return `"onLinkBtnClick('band')"` })
  s = s.replace(/'jumpToKakao\(\)'/g, () => { bump('jumpFn:kakao'); return `"onLinkBtnClick()"` })
  // 5b. 直接调用点
  s = s.replace(/\bmixinJump\(\)/g, () => { bump('mixinJump→onLinkBtnClick'); return 'onLinkBtnClick()' })
  s = s.replace(/\bjumpToBand\(\)/g, () => { bump('jumpToBand→带参'); return `onLinkBtnClick('band')` })
  s = s.replace(/\bjumpToKakao\(\)/g, () => { bump('jumpToKakao→带参'); return 'onLinkBtnClick()' })

  // 5c. 有 link-btn 但没有任何 onclick 的标签 → 补 onclick
  s = s.replace(/<(a|button|div|span|li|p)\b([^>]*)>/gi, (tag, name, attrs) => {
    if (!/\blink-btn\b/.test(attrs)) return tag
    if (/onclick\s*=/i.test(attrs)) return tag
    if (/class\s*=\s*\{/.test(attrs)) { bump('跳过:动态class'); skipped.push(`${f}  (动态 class: ${tag.slice(0, 70)})`); return tag }
    if (ANCHOR_EXCLUDE.test(attrs)) { bump('跳过:页内锚点'); skipped.push(`${f}  (页内锚点: ${tag.slice(0, 70)})`); return tag }
    bump('补 onclick')
    return `<${name}${attrs} onclick="onLinkBtnClick()">`
  })

  if (s !== orig) {
    changedFiles.push(f)
    if (APPLY) writeFileSync(f, s, 'utf8')
  }
}

console.log(APPLY ? '=== 已落盘 ===' : '=== DRY RUN（未写入）===')
console.log(`扫描 ${files.length} 个文件，将改动 ${changedFiles.length} 个\n`)
for (const k of Object.keys(counts).sort()) console.log(`${String(counts[k]).padStart(5)}  ${k}`)
if (skipped.length) {
  console.log(`\n─── 跳过 / 需留意 (${skipped.length}) ───`)
  skipped.forEach(x => console.log('   ' + x))
}
