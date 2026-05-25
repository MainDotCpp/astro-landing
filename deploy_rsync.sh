#!/bin/bash
# 一键部署脚本：构建 + 推送到所有目标服务器 + 输出可访问 URL
#
# 用法:
#   ./deploy_rsync.sh                        # 构建 + 部署到所有目标，输出各域名根 URL
#   ./deploy_rsync.sh US/20250915-1.0/       # 同上，但 URL 拼接子路径方便直接打开
#   ./deploy_rsync.sh --no-build [path]      # 跳过构建，直接部署 ./dist/

set -uo pipefail

usage() {
  cat <<'EOF'
一键部署脚本：构建 + 推送到所有目标服务器 + 输出可访问 URL

用法:
  ./deploy_rsync.sh                        构建 + 部署到所有目标，输出各域名根 URL
  ./deploy_rsync.sh US/20250915-1.0/       同上，URL 拼接子路径方便直接打开
  ./deploy_rsync.sh --no-build [path]      跳过构建，直接部署 ./dist/
  ./deploy_rsync.sh -h | --help            显示此帮助
EOF
}

# ====== 参数解析 ======
RUN_BUILD=true
URL_PATH=""
for arg in "$@"; do
  case "$arg" in
    --no-build) RUN_BUILD=false ;;
    -h|--help) usage; exit 0 ;;
    *) URL_PATH="${arg#/}" ;;
  esac
done

# ====== 工具检查 ======
RSYNC="/opt/homebrew/bin/rsync"
if [ ! -x "$RSYNC" ]; then
  echo "错误: 未找到 Homebrew 版 rsync (macOS 自带版本不支持 --chown)"
  echo "请运行: brew install rsync"
  exit 1
fi
if ! command -v sshpass &>/dev/null; then
  echo "错误: sshpass 未安装"
  echo "请运行: brew install sshpass"
  exit 1
fi

# ====== 通用配置 ======
SSH_PORT=5522
SOURCE_DIR="./dist/"

EXCLUDE_BASE="--exclude=.htaccess --exclude=.DS_Store --exclude=.user.ini --exclude=.well-known --exclude=*_/ --exclude=**/*_/ --exclude=YY/ --exclude=**/YY/"
EXCLUDE_WITH_PRIVATE="$EXCLUDE_BASE --exclude=private"

# ====== 部署目标 ======
# 字段顺序: label | ip | password | remote_path | base_url | source_dir | exclude_private(true/false)
TARGETS=(
  "KR|141.164.43.115|Haishi@1688|/www/wwwroot/coincool.top/|https://coincool.top|$SOURCE_DIR|true"
  "JP|108.160.138.123|Haishi@1688|/www/wwwroot/richwise.top/|https://richwise.top|$SOURCE_DIR|true"
  "3rd|108.160.141.193|Leuan_3rd|/www/wwwroot/xn--ces516hyxm.com/|https://xn--ces516hyxm.com|$SOURCE_DIR|false"
  "zutoml|202.182.125.131|Haishi@1688|/www/wwwroot/zutoml.top/|https://zutoml.top|$SOURCE_DIR|false"
  "advancedshara-KR|158.247.212.142|Haishi@1688|/www/wwwroot/advancedshara.top/|https://advancedshara.top|./dist/KR/|true"
  "advancedshara-mjSFqQ|158.247.212.142|Haishi@1688|/www/wwwroot/advancedshara.top/mjSFqQ/|https://advancedshara.top/mjSFqQ|./dist/mjSFqQ/|true"
)

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
SUCCESS_URLS=()
FAILED_TARGETS=()

deploy_one() {
  local label="$1" ip="$2" pw="$3" remote_path="$4" base_url="$5" src="$6" exclude_private="$7"
  local excl

  if [ "$exclude_private" = "true" ]; then
    excl="$EXCLUDE_WITH_PRIVATE"
  else
    excl="$EXCLUDE_BASE"
  fi

  echo ">>> [$label] $src -> $ip:$remote_path"

  if [ ! -d "$src" ]; then
    echo "  ⚠ 源目录 $src 不存在，跳过"
    FAILED_TARGETS+=("$label (源目录缺失: $src)")
    echo ""
    return
  fi

  # shellcheck disable=SC2086
  sshpass -p "$pw" "$RSYNC" -rlptzv \
    --chown=www:www \
    --chmod=D755,F644 \
    --progress \
    $excl \
    "$src" \
    -e "ssh -p $SSH_PORT -o StrictHostKeyChecking=no" \
    "root@$ip:$remote_path"

  if [ $? -eq 0 ]; then
    echo "✓ [$label] 部署成功"
    SUCCESS_URLS+=("$base_url/$URL_PATH")
  else
    echo "✗ [$label] 部署失败"
    FAILED_TARGETS+=("$label ($ip)")
  fi
  echo ""
}

# ====== 部署主循环 ======
echo "================================"
echo "部署到 ${#TARGETS[@]} 个目标"
[ -n "$URL_PATH" ] && echo "URL 子路径: /$URL_PATH"
echo "================================"
echo ""

for entry in "${TARGETS[@]}"; do
  IFS='|' read -r label ip pw remote_path base_url src exclude_private <<<"$entry"
  deploy_one "$label" "$ip" "$pw" "$remote_path" "$base_url" "$src" "$exclude_private"
done

# ====== 汇总输出 ======
echo "================================"
echo "部署结果汇总"
echo "================================"
echo ""
echo "成功 (${#SUCCESS_URLS[@]}/${#TARGETS[@]}):"
if [ ${#SUCCESS_URLS[@]} -eq 0 ]; then
  echo "  (无)"
else
  for url in "${SUCCESS_URLS[@]}"; do
    echo "  ✓ $url"
  done
fi

if [ ${#FAILED_TARGETS[@]} -gt 0 ]; then
  echo ""
  echo "失败 (${#FAILED_TARGETS[@]}/${#TARGETS[@]}):"
  for t in "${FAILED_TARGETS[@]}"; do
    echo "  ✗ $t"
  done
  exit 1
fi
