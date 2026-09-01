#!/usr/bin/env node
/**
 * 落地页画廊 — 生成线上入口 public/_gallery/index.php
 *
 * 为什么要打成一个 PHP 文件：
 * 画廊索引里有全部落地页路径（含 private 与 cloak 目录结构），不能在公网裸奔。
 * 静态的 index.html / index.json 只要文件在 web 根下就能被直接访问，密码门形同虚设，
 * 所以把 HTML 和两份 JSON 全部内嵌进 index.php，未登录时一个字节都不输出。
 * 缩略图仍走静态直出——文件名是 sha1 前 10 位，拿不到索引就无法枚举。
 *
 * 输出到 public/index.php —— 画廊已接管站点首页（原来的目录树导航被它取代）。
 * 由 scan.mjs / shoot.mjs 自动调用，也可单独跑：node scripts/gallery/bundle.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = path.resolve(import.meta.dirname, '../..')
const GALLERY = path.join(ROOT, 'public/_gallery')
/** 线上入口就是站点根目录（画廊已接管首页，覆盖原来的目录树导航） */
const OUT = path.join(ROOT, 'public/index.php')
/** 备份密码，防止覆盖 index.php 后读不回来（不在 public 下，不会被部署） */
const PW_CACHE = path.join(ROOT, '.gallery-password')

/** 复用 public/index.php 里那套 session 密码，登录一次两个入口都通 */
async function readPassword() {
  if (process.env.GALLERY_PASSWORD)
    return process.env.GALLERY_PASSWORD
  for (const f of [OUT, PW_CACHE]) {
    try {
      const txt = await fs.readFile(f, 'utf8')
      const pw = f === PW_CACHE ? txt.trim() : /\$correct_password\s*=\s*'([^']+)'/.exec(txt)?.[1]
      if (pw)
        return pw
    }
    catch { /* 试下一个来源 */ }
  }
  return null
}

function LOGIN_PAGE(pw) {
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>落地页预览</title>
<style>
body{margin:0;height:100vh;display:grid;place-content:center;gap:14px;background:#14161a;color:#e8e6e1;
  font:13px/1.5 ui-monospace,"SF Mono",Menlo,monospace;text-align:center}
h1{margin:0;font:650 15px/1 -apple-system,"PingFang SC",sans-serif;letter-spacing:-.02em}
h1 em{font-style:normal;color:#e8402a}
form{display:flex;border:1px solid #2b3038;background:#1b1e24}
input{background:none;border:0;outline:none;color:inherit;font:inherit;padding:9px 12px;width:200px}
button{background:none;border:0;border-left:1px solid #2b3038;color:#71767f;font:inherit;
  padding:0 14px;cursor:pointer}
button:hover{color:#e8402a}
.err{color:#e8402a;font-size:11px;min-height:16px}
</style></head>
<body>
  <h1>落地页预览<em>.</em></h1>
  <form method="post"><input type="password" name="password" placeholder="密码" autofocus
    autocomplete="current-password"><button type="submit">进入</button></form>
  <div class="err">${pw}</div>
</body></html>`
}

export async function bundle({ quiet = false } = {}) {
  // 注意：这个文件只有在服务器真的执行 PHP 时才是安全的。
  // 如果 nginx 没配 PHP，它会被当普通文件原样返回 —— 密码和整份索引直接公开下载。
  // deploy_rsync.sh 部署后会自动 curl 校验一次，别把这道检查去掉。

  const html = await fs.readFile(path.join(GALLERY, 'index.html'), 'utf8')
  const index = await fs.readFile(path.join(GALLERY, 'index.json'), 'utf8')
  let shots = '{}'
  try {
    shots = await fs.readFile(path.join(GALLERY, 'shots.json'), 'utf8')
  }
  catch { /* 还没截过图 */ }

  const password = await readPassword()
  if (!password) {
    console.warn('  ⚠ 读不到密码（试过 GALLERY_PASSWORD / public/index.php / .gallery-password），跳过生成入口')
    return null
  }

  // </script> 出现在 JSON 里会提前闭合脚本块
  const safe = s => s.replace(/<\//g, '<\\/')
  const boot = '<script>'
    + `window.__SHOTS_BASE__='_gallery/shots/';`
    + `window.__GALLERY__={index:${safe(index)},shots:${safe(shots)}}`
    + '</script>'

  const php = `<?php
/**
 * 落地页画廊 · 线上入口 —— 由 scripts/gallery/bundle.mjs 生成，请勿手改。
 * 改画廊本体请改 public/_gallery/index.html，然后重新跑 bun run gallery:scan。
 */
session_start();
$correct_password = ${JSON.stringify(password).replace(/"/g, '\'')};

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ' . strtok($_SERVER['REQUEST_URI'], '?'));
    exit;
}
$error = '';
if (isset($_POST['password'])) {
    if (hash_equals($correct_password, $_POST['password'])) {
        session_regenerate_id(true);
        $_SESSION['authenticated'] = true;
    } else {
        $error = '密码错误，请重试';
    }
}
header('X-Robots-Tag: noindex, nofollow', true);
if (empty($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    header('Content-Type: text/html; charset=utf-8');
    echo str_replace('{{ERR}}', htmlspecialchars($error, ENT_QUOTES, 'UTF-8'), <<<'LOGIN'
${LOGIN_PAGE('{{ERR}}')}
LOGIN);
    exit;
}
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
?>
${html.replace('</head>', `${boot}\n</head>`)}`

  await fs.writeFile(PW_CACHE, password)
  await fs.writeFile(OUT, php)
  const out = OUT
  const kb = Math.round(new TextEncoder().encode(php).length / 1024)
  if (!quiet)
    console.log(`✓ 线上入口 index.php 已生成 · ${kb}KB（含索引，密码门后才输出）`)
  return out
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  await bundle()
}
