import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const files = execSync(
  `grep -rl "link-btn\\|onLinkBtnClick\\|mixinJump\\|XoONOW\\|跟踪代码粘贴\\|jumpToKakao\\|jumpToBand" --include="*.astro" --include="*.html" src public 2>/dev/null | grep -v "wp-content\\|vendor\\|node_modules\\|\\.min\\.\\|mjSFqQ/js/\\|__v2test__"`,
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
).trim().split('\n').filter(Boolean)

/** 从 `{` 位置起做括号配对，返回匹配的 `}` 的下标（跳过字符串与注释） */
export function matchBrace(s, open) {
  let d = 0
  for (let i = open; i < s.length; i++) {
    const c = s[i]
    if (c === '"' || c === '\'' || c === '`') {
      const q = c
      i++
      while (i < s.length && s[i] !== q) { if (s[i] === '\\') i++; i++ }
      continue
    }
    if (c === '/' && s[i + 1] === '/') { while (i < s.length && s[i] !== '\n') i++; continue }
    if (c === '/' && s[i + 1] === '*') { i += 2; while (i < s.length && !(s[i] === '*' && s[i + 1] === '/')) i++; i++; continue }
    if (c === '{') d++
    else if (c === '}') { d--; if (d === 0) return i }
  }
  return -1
}

/** 定位 onLinkBtnClick 的完整定义区间 [start, end) */
export function findDef(body) {
  const re = /(?:function\s+onLinkBtnClick\s*\([^)]*\)\s*|(?:(?:const|var|let)\s+|window\.)onLinkBtnClick\s*=\s*(?:async\s*)?(?:function\s*\([^)]*\)\s*|\([^)]*\)\s*=>\s*))\{/
  const m = re.exec(body)
  if (!m) return null
  const open = m.index + m[0].length - 1
  const close = matchBrace(body, open)
  if (close < 0) return null
  let end = close + 1
  while (end < body.length && /[;\s]/.test(body[end])) end++
  return [m.index, end]
}

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
const cls = {}
const put = (k, v) => { (cls[k] ||= []).push(v) }

for (const f of files) {
  const src = readFileSync(f, 'utf8')
  let pure = 0; let mixed = 0; const leftovers = []

  for (const m of src.matchAll(SCRIPT_RE)) {
    const body = m[2]
    const d = findDef(body)
    if (!d) continue
    const rest = (body.slice(0, d[0]) + body.slice(d[1]))
      .replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '').trim()
    if (rest === '') pure++
    else { mixed++; leftovers.push(rest.slice(0, 90).replace(/\s+/g, ' ')) }
  }

  if (pure || mixed) {
    put(mixed ? 'B. 内嵌定义-块内还有其他代码' : 'A. 内嵌定义-纯块(可整块替换)', f)
    leftovers.forEach(l => put('样本:残留', `${f} ::: ${l}`))
  }
  else if (/XoONOW\.js/.test(src)) put('C. 引用XoONOW(仅换文件名)', f)
  else put('D. 靠组件注入(只需统一绑定)', f)
}

for (const k of Object.keys(cls).sort()) {
  if (k.startsWith('样本')) continue
  console.log(`${String(cls[k].length).padStart(4)}  ${k}`)
}
console.log('\n─── B 类文件与残留 ───')
;(cls['样本:残留'] || []).forEach(s => console.log('   ' + s))
