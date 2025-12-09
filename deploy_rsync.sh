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
EXCLUDE_PARAMS="--exclude=.htaccess --exclude=.DS_Store --exclude=.user.ini --exclude=.well-known --exclude=private --exclude=*_/ --exclude=**/*_/ --exclude=YY/ --exclude=**/YY/"

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
EXCLUDE_PARAMS_NO_PRIVATE="--exclude=.htaccess --exclude=.DS_Store --exclude=.user.ini --exclude=.well-known --exclude=*_/ --exclude=**/*_/ --exclude=YY/ --exclude=**/YY/"
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
echo "---"
echo ""

# 部署到新服务器 (202.182.125.131)
echo ">>> 正在部署到新服务器 (202.182.125.131)..."
sshpass -p "${PASSWORD_JP}" rsync -rlptzv \
    --chown=www:www \
    --chmod=D755,F644 \
    --progress \
    ${EXCLUDE_PARAMS_NO_PRIVATE} \
    ${SOURCE_DIR} \
    -e "ssh -p ${SSH_PORT} -o StrictHostKeyChecking=no" \
    root@202.182.125.131:/www/wwwroot/zutoml.top

if [ $? -eq 0 ]; then
    echo "✓ 新服务器部署成功"
else
    echo "✗ 新服务器部署失败"
fi

echo ""
echo "---"
echo ""

# 部署到新服务器 (158.247.212.142) - 上传 KR 和 mjSFqQ 目录
echo ">>> 正在部署到新服务器 (158.247.212.142) - 上传 KR 和 mjSFqQ 目录..."

KR_SOURCE_DIR="./dist/KR/"
MJ_SOURCE_DIR="./dist/mjSFqQ/"
DEPLOY_SUCCESS=true

# 上传 KR 目录
if [ ! -d "$KR_SOURCE_DIR" ]; then
    echo "警告: KR 目录 $KR_SOURCE_DIR 不存在，跳过"
else
    echo "  > 正在上传 KR 目录..."
    sshpass -p "${PASSWORD_KR}" rsync -rlptzv \
        --chown=www:www \
        --chmod=D755,F644 \
        --progress \
        ${EXCLUDE_PARAMS} \
        ${KR_SOURCE_DIR} \
        -e "ssh -p ${SSH_PORT} -o StrictHostKeyChecking=no" \
        root@158.247.212.142:/www/wwwroot/advancedshara.top/

    if [ $? -eq 0 ]; then
        echo "  ✓ KR 目录上传成功"
    else
        echo "  ✗ KR 目录上传失败"
        DEPLOY_SUCCESS=false
    fi
fi

# 上传 mjSFqQ 目录
if [ ! -d "$MJ_SOURCE_DIR" ]; then
    echo "警告: mjSFqQ 目录 $MJ_SOURCE_DIR 不存在，跳过"
else
    echo "  > 正在上传 mjSFqQ 目录..."
    sshpass -p "${PASSWORD_KR}" rsync -rlptzv \
        --chown=www:www \
        --chmod=D755,F644 \
        --progress \
        ${EXCLUDE_PARAMS} \
        ${MJ_SOURCE_DIR} \
        -e "ssh -p ${SSH_PORT} -o StrictHostKeyChecking=no" \
        root@158.247.212.142:/www/wwwroot/advancedshara.top/mjSFqQ/

    if [ $? -eq 0 ]; then
        echo "  ✓ mjSFqQ 目录上传成功"
    else
        echo "  ✗ mjSFqQ 目录上传失败"
        DEPLOY_SUCCESS=false
    fi
fi

# 总结部署结果
if [ "$DEPLOY_SUCCESS" = true ]; then
    echo "✓ 新服务器 (158.247.212.142) 部署成功"
else
    echo "✗ 新服务器 (158.247.212.142) 部署失败"
fi

echo ""
echo "================================"
echo "部署完成！"
echo "================================"

