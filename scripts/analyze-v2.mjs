import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const files = execSync(
  `grep -rl "link-btn\\|onLinkBtnClick\\|mixinJump\\|XoONOW\\|跟踪代码粘贴\\|const link" --include="*.astro" --include="*.html" src public 2>/dev/null | grep -v "wp-content\\|vendor\\|node_modules\\|\\.min\\.\\|mjSFqQ/js/"`,
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
).trim().split('\n').filter(Boolean)

const stats = {}
const bump = (k, f) => { (stats[k] ||= new Set()).add(f) }
const samples = {}
const sample = (k, s) => { (samples[k] ||= new Set()).add(s.slice(0, 140)) }

for (const f of files) {
  const src = readFileSync(f, 'utf8')

  // 槽位注释格式
  if (/<!--+\s*⬇/.test(src)) bump('slot:⬇⬇格式', f)
  if (/跟踪代码粘贴在下面/.test(src)) bump('slot:↓粘贴在下面格式', f)
  if (!/跟踪代码粘贴/.test(src)) bump('slot:无槽位', f)

  // link 占位形态
  for (const m of src.matchAll(/(?:const|var|let)\s+link\s*=\s*(['"`])([^'"`]*)\1/g)) {
    bump(`link占位:${m[2] || '(空)'}`, f)
  }

  // 内嵌 onLinkBtnClick 定义形态
  if (/function\s+onLinkBtnClick\s*\(/.test(src)) {
    bump('内嵌定义:function 声明', f)
    sample('内嵌定义:function 声明', /[\s\S]{0,60}function\s+onLinkBtnClick[\s\S]{0,80}/.exec(src)[0])
  }
  if (/(?:const|var|let)\s+onLinkBtnClick\s*=/.test(src)) {
    bump('内嵌定义:箭头函数', f)
    sample('内嵌定义:箭头函数', /[\s\S]{0,60}(?:const|var|let)\s+onLinkBtnClick\s*=[\s\S]{0,80}/.exec(src)[0])
  }

  // 脚本引用
  if (/XoONOW\.js/.test(src)) bump('引用:XoONOW.js', f)
  if (/utils\/main\.js/.test(src)) bump('引用:main.js', f)
  if (/utils\/jump/.test(src)) bump('引用:jump.ts', f)

  // 绑定形态
  for (const m of src.matchAll(/<(a|button|div|span|li|p|img)\b[^>]*>/gi)) {
    const tag = m[0]
    const hasClass = /\blink-btn\b/.test(tag)
    const hasOnLink = /onLinkBtnClick/.test(tag)
    const hasMixin = /mixinJump/.test(tag)
    const hasJumpTo = /jumpTo(?:Kakao|Band|WhatsApp)/.test(tag)
    if (!hasClass && !hasOnLink && !hasMixin && !hasJumpTo) continue

    if (hasMixin) { bump('绑定:mixinJump', f); sample('绑定:mixinJump', tag) }
    if (hasJumpTo) { bump('绑定:jumpToXxx', f); sample('绑定:jumpToXxx', tag) }
    if (hasClass && !hasOnLink && !hasMixin && !hasJumpTo) {
      bump('绑定:仅link-btn需补onclick', f)
      sample('绑定:仅link-btn需补onclick', tag)
    }
    // Astro 动态 class 表达式，正则容易误伤
    if (/class=\{/.test(tag)) { bump('⚠动态class表达式', f); sample('⚠动态class表达式', tag) }
    // 页内锚点
    if (hasClass && /href="#(?!")/.test(tag) && !/href="#"/.test(tag)) {
      bump('⚠页内锚点(排除)', f); sample('⚠页内锚点(排除)', tag)
    }
  }
}

console.log(`扫描文件数: ${files.length}\n`)
const keys = Object.keys(stats).sort()
for (const k of keys) console.log(`${String(stats[k].size).padStart(4)} 文件  ${k}`)

console.log('\n──────── 样本 ────────')
for (const k of Object.keys(samples).sort()) {
  console.log(`\n【${k}】`)
  ;[...samples[k]].slice(0, 4).forEach(s => console.log('   ' + s.replace(/\s+/g, ' ')))
}
