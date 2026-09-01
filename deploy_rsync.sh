#!/bin/bash
# 一键部署脚本：构建 + 推送到所有目标服务器
#
# 用法:
#   ./deploy_rsync.sh                构建 + 部署到所有目标
#   ./deploy_rsync.sh --no-build     跳过构建，直接部署 ./dist/
#   ./deploy_rsync.sh -h | --help    显示此帮助

set -uo pipefail

usage() {
  sed -n '2,7p' "$0" | sed 's/^# \{0,1\}//'
}

# ====== 参数解析 ======
RUN_BUILD=true
for arg in "$@"; do
  case "$arg" in
    --no-build) RUN_BUILD=false ;;
    -h|--help) usage; exit 0 ;;
    *) echo "未知参数: $arg"; usage; exit 1 ;;
  esac
done

# ====== 工具检查 ======
RSYNC="/opt/homebrew/bin/rsync"
if [ ! -x "$RSYNC" ]; then
  echo "错误: 未找到 Homebrew 版 rsync (macOS 自带版本不支持 --chown)"
  echo "请运行: brew install rsync"
  exit 1
fi
# sshpass 仅密码认证目标需要；SSH key 免密目标 (password 字段为 -) 无需 sshpass。
# 具体检查在 TARGETS 定义之后按需进行。

# ====== 通用配置 ======
SSH_PORT=5522
SOURCE_DIR="./dist/"

# 画廊：只部署 index.php（密码门 + 内嵌索引）与缩略图；
# index.html / *.json 是本地开发用的裸文件，传上去就能绕过密码门直接读到全部路径
EXCLUDE_BASE="--exclude=.htaccess --exclude=.DS_Store --exclude=.user.ini --exclude=.well-known --exclude=*_/ --exclude=**/*_/ --exclude=YY/ --exclude=**/YY/ --exclude=/_gallery/index.html --exclude=/_gallery/index.json --exclude=/_gallery/shots.json"
EXCLUDE_WITH_PRIVATE="$EXCLUDE_BASE --exclude=private"

# ====== 部署目标 ======
# 字段顺序: label | host | password | remote_path | source_dir | exclude_private(true/false)
#   host     — IP 地址(密码认证) 或 ~/.ssh/config 中的别名(SSH key 免密认证)
#   password — 登录密码; 填 "-" 表示走 SSH key 免密 (host 用 ~/.ssh/config 别名)
TARGETS=(
  "hskr2|hskr2|-|/www/wwwroot/t.dd-ll.xyz/|$SOURCE_DIR|true"
  "3rd|108.160.141.193|Leuan_3rd|/www/wwwroot/xn--ces516hyxm.com/|$SOURCE_DIR|false"
)

# 存在密码认证目标时才要求 sshpass
NEED_SSHPASS=false
for entry in "${TARGETS[@]}"; do
  IFS='|' read -r _ _ _pw _ <<<"$entry"
  [ "$_pw" != "-" ] && NEED_SSHPASS=true
done
if $NEED_SSHPASS && ! command -v sshpass &>/dev/null; then
  echo "错误: sshpass 未安装 (存在密码认证目标)"
  echo "请运行: brew install sshpass"
  exit 1
fi

# ====== 构建 ======
if $RUN_BUILD; then
  echo "================================"
  echo "构建项目 (bun run build)"
  echo "================================"
  if ! bun run build; then
    echo "✗ 构建失败，已中止部署"
    exit 1
  fi
  echo ""
fi

if [ ! -d "$SOURCE_DIR" ]; then
  echo "错误: 源目录 $SOURCE_DIR 不存在 (使用 --no-build 时请先手动构建)"
  exit 1
fi

# ====== 部署函数 ======
SUCCESS_LABELS=()
FAILED_TARGETS=()

deploy_one() {
  local label="$1" host="$2" pw="$3" remote_path="$4" src="$5" exclude_private="$6"
  local excl ssh_cmd dest_prefix
  local -a auth

  if [ "$exclude_private" = "true" ]; then
    excl="$EXCLUDE_WITH_PRIVATE"
  else
    excl="$EXCLUDE_BASE"
  fi

  # 认证方式: password 为 "-" 走 SSH key 免密 (host 为 ~/.ssh/config 别名,
  # 端口/用户/IdentityFile 由 config 提供); 否则用 sshpass 密码认证。
  if [ "$pw" = "-" ]; then
    auth=()
    ssh_cmd="ssh -o StrictHostKeyChecking=no"
    dest_prefix="$host"
  else
    auth=(sshpass -p "$pw")
    ssh_cmd="ssh -p $SSH_PORT -o StrictHostKeyChecking=no"
    dest_prefix="root@$host"
  fi

  echo ">>> [$label] $src -> $dest_prefix:$remote_path"

  if [ ! -d "$src" ]; then
    echo "  ⚠ 源目录 $src 不存在，跳过"
    FAILED_TARGETS+=("$label (源目录缺失: $src)")
    echo ""
    return
  fi

  # When deploying a full Astro build, publish hashed assets before HTML.
  # Otherwise a CDN can request new /mjSFqQ/* files while rsync is still running,
  # cache the temporary 404, and leave the freshly deployed page without styles.
  if [ "$src" = "$SOURCE_DIR" ] && [ -d "${SOURCE_DIR}mjSFqQ" ]; then
    echo "  先同步静态资源: ${SOURCE_DIR}mjSFqQ/ -> $dest_prefix:${remote_path%/}/mjSFqQ/"

    # shellcheck disable=SC2086
    ${auth[@]+"${auth[@]}"} "$RSYNC" -rlptzv \
      --chown=www:www \
      --chmod=D755,F644 \
      --progress \
      $excl \
      "${SOURCE_DIR}mjSFqQ/" \
      -e "$ssh_cmd" \
      "${dest_prefix}:${remote_path%/}/mjSFqQ/"

    if [ $? -ne 0 ]; then
      echo "✗ [$label] 静态资源预同步失败"
      FAILED_TARGETS+=("$label assets ($host)")
      echo ""
      return
    fi
  fi

  # shellcheck disable=SC2086
  ${auth[@]+"${auth[@]}"} "$RSYNC" -rlptzv \
    --chown=www:www \
    --chmod=D755,F644 \
    --progress \
    $excl \
    "$src" \
    -e "$ssh_cmd" \
    "${dest_prefix}:$remote_path"

  if [ $? -eq 0 ]; then
    echo "✓ [$label] 部署成功"
    SUCCESS_LABELS+=("$label")
  else
    echo "✗ [$label] 部署失败"
    FAILED_TARGETS+=("$label ($host)")
  fi
  echo ""
}

# ====== 部署主循环 ======
echo "================================"
echo "部署到 ${#TARGETS[@]} 个目标"
echo "================================"
echo ""

for entry in "${TARGETS[@]}"; do
  IFS='|' read -r label host pw remote_path src exclude_private <<<"$entry"
  deploy_one "$label" "$host" "$pw" "$remote_path" "$src" "$exclude_private"
done

# ====== 部署后自检：确认 PHP 真的在执行 ======
# 画廊入口 index.php 内嵌了密码与全部落地页路径。
# 一旦服务器没执行 PHP，它会被当普通文件原样返回 —— 等于公开下载。
verify_php() {
  local url="https://t.dd-ll.xyz/"
  echo "自检: $url"
  local ct
  ct=$(curl -sI --max-time 20 "$url" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type"{print $2}')
  if [ -z "$ct" ]; then
    echo "  ⚠ 取不到响应头，请手动确认"
  elif [ "${ct#text/html}" != "$ct" ]; then
    if curl -s --max-time 20 "${url}index.php" | grep -q 'correct_password'; then
      echo "  ✗ 危险: 源码可下载，密码与索引已暴露！立即换回占位并排查 PHP 配置"
    else
      echo "  ✓ PHP 正常执行 ($ct)"
    fi
  else
    echo "  ✗ 危险: content-type 是 $ct —— PHP 没执行，index.php 正被当文件下载"
    echo "     密码与全部落地页路径已暴露，立即处理"
  fi
  echo ""
}
verify_php

# ====== 汇总 ======
echo "================================"
echo "部署完成: 成功 ${#SUCCESS_LABELS[@]}/${#TARGETS[@]}"
echo "================================"

if [ ${#FAILED_TARGETS[@]} -gt 0 ]; then
  echo "失败:"
  for t in "${FAILED_TARGETS[@]}"; do
    echo "  ✗ $t"
  done
  exit 1
fi
