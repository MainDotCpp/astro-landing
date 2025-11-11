#!/bin/bash

# 配置
SSH_PORT=5522
SOURCE_DIR="./dist/"
PASSWORD_KR="Haishi@1688"
PASSWORD_JP="Haishi@1688"
PASSWORD_THIRD="Leuan_3rd"

# 检查源目录
if [ ! -d "$SOURCE_DIR" ]; then
    echo "错误: 源目录 $SOURCE_DIR 不存在"
    echo "提示: 请先运行 'bun run build' 构建项目"
    exit 1
fi

# 检查 sshpass 是否安装
if ! command -v sshpass &> /dev/null; then
    echo "错误: sshpass 未安装"
    echo "请使用 'brew install sshpass' 安装"
    exit 1
fi

# 忽略文件参数
EXCLUDE_PARAMS="--exclude=.htaccess --exclude=.DS_Store --exclude=.user.ini --exclude=.well-known --exclude=private"

echo "================================"
echo "开始部署到所有服务器..."
echo "================================"
echo ""

# 部署到 KR 服务器
echo ">>> 正在部署到 KR 服务器 (coincool.top)..."
sshpass -p "${PASSWORD_KR}" rsync -rlptzv \
    --chown=www:www \
    --chmod=D755,F644 \
    --progress \
    ${EXCLUDE_PARAMS} \
    ${SOURCE_DIR} \
    -e "ssh -p ${SSH_PORT} -o StrictHostKeyChecking=no" \
    root@141.164.43.115:/www/wwwroot/coincool.top/

if [ $? -eq 0 ]; then
    echo "✓ KR 服务器部署成功"
else
    echo "✗ KR 服务器部署失败"
fi

echo ""
echo "---"
echo ""

# 部署到 JP 服务器
echo ">>> 正在部署到 JP 服务器 (richwise.top)..."
sshpass -p "${PASSWORD_JP}" rsync -rlptzv \
    --chown=www:www \
    --chmod=D755,F644 \
    --progress \
    ${EXCLUDE_PARAMS} \
    ${SOURCE_DIR} \
    -e "ssh -p ${SSH_PORT} -o StrictHostKeyChecking=no" \
    root@108.160.138.123:/www/wwwroot/richwise.top/

if [ $? -eq 0 ]; then
    echo "✓ JP 服务器部署成功"
else
    echo "✗ JP 服务器部署失败"
fi

echo ""
echo "---"
echo ""

# 部署到第三方服务器 (不忽略 private 文件夹)
echo ">>> 正在部署到第三方服务器 (xn--ces516hyxm.com)..."
EXCLUDE_PARAMS_NO_PRIVATE="--exclude=.htaccess --exclude=.DS_Store --exclude=.user.ini --exclude=.well-known"
sshpass -p "${PASSWORD_THIRD}" rsync -rlptzv \
    --chown=www:www \
    --chmod=D755,F644 \
    --progress \
    ${EXCLUDE_PARAMS_NO_PRIVATE} \
    ${SOURCE_DIR} \
    -e "ssh -p ${SSH_PORT} -o StrictHostKeyChecking=no" \
    root@108.160.141.193:/www/wwwroot/xn--ces516hyxm.com/

if [ $? -eq 0 ]; then
    echo "✓ 第三方服务器部署成功"
else
    echo "✗ 第三方服务器部署失败"
fi

echo ""
echo "================================"
echo "部署完成！"
echo "================================"

