<?php
/**
 * 落地页导航 - 查找包含index.html的目录
 * 使用现代化界面展示并提供导航功能
 * 需要密码验证访问
 */

session_start();

// 密码验证
$correct_password = 'Haishi@1688';
$is_authenticated = isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true;

// 处理密码提交
if (isset($_POST['password'])) {
    if ($_POST['password'] === $correct_password) {
        $_SESSION['authenticated'] = true;
        $is_authenticated = true;
    } else {
        $login_error = '密码错误，请重试';
    }
}

// 处理退出登录
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

// 构建目录树结构
function buildDirectoryTree($baseDir) {
    $indexPaths = [];
    
    try {
        // 使用 RecursiveDirectoryIterator 递归扫描目录
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($baseDir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        foreach ($iterator as $file) {
            // 只处理名为 index.html 的文件
            if ($file->isFile() && $file->getFilename() === 'index.html') {
                $dir = $file->getPath();
                $relativePath = str_replace($baseDir . DIRECTORY_SEPARATOR, '', $dir);
                $relativePath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
                
                if (!empty($relativePath)) {
                    $indexPaths[] = $relativePath;
                }
            }
        }
    } catch (Exception $e) {
        // 备用方案
        $indexPaths = scanForIndexPathsBackup($baseDir);
    }
    
    // 构建树状结构
    $tree = [];
    
    foreach ($indexPaths as $path) {
        $pathParts = explode('/', $path);
        $currentNode = &$tree;
        $currentPath = '';
        
        foreach ($pathParts as $part) {
            $currentPath = $currentPath ? $currentPath . '/' . $part : $part;
            
            if (!isset($currentNode[$part])) {
                $currentNode[$part] = [
                    'name' => $part,
                    'path' => $currentPath,
                    'url' => './' . $currentPath . '/',
                    'hasIndex' => false,
                    'children' => []
                ];
            }
            
            $currentNode = &$currentNode[$part]['children'];
        }
        
        // 标记这个路径有index.html
        $currentNode = &$tree;
        foreach ($pathParts as $i => $part) {
            if ($i === count($pathParts) - 1) {
                // 最后一个部分，标记有index
                $currentNode[$part]['hasIndex'] = true;
            } else {
                $currentNode = &$currentNode[$part]['children'];
            }
        }
    }
    
    // 递归排序
    function sortTree(&$tree) {
        ksort($tree);
        foreach ($tree as &$node) {
            if (!empty($node['children'])) {
                sortTree($node['children']);
            }
        }
    }
    
    sortTree($tree);
    return $tree;
}

// 备用扫描方案
function scanForIndexPathsBackup($baseDir) {
    $paths = [];
    
    function scanRecursive($dir, $baseDir, &$paths) {
        $items = @scandir($dir);
        if ($items === false) return;
        
        if (in_array('index.html', $items)) {
            $relativePath = str_replace($baseDir . DIRECTORY_SEPARATOR, '', $dir);
            $relativePath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
            if (!empty($relativePath)) {
                $paths[] = $relativePath;
            }
        }
        
        foreach ($items as $item) {
            if ($item === '.' || $item === '..') continue;
            $itemPath = $dir . DIRECTORY_SEPARATOR . $item;
            if (is_dir($itemPath)) {
                scanRecursive($itemPath, $baseDir, $paths);
            }
        }
    }
    
    scanRecursive($baseDir, $baseDir, $paths);
    return $paths;
}

// 计算总的index.html数量
function countIndexFiles($tree) {
    $count = 0;
    foreach ($tree as $node) {
        if ($node['hasIndex']) {
            $count++;
        }
        if (!empty($node['children'])) {
            $count += countIndexFiles($node['children']);
        }
    }
    return $count;
}

// 只有认证用户才扫描目录
if ($is_authenticated) {
    $baseDir = __DIR__;
    $directoryTree = buildDirectoryTree($baseDir);
    $totalCount = countIndexFiles($directoryTree);
}

// 渲染树状结构
function renderDirectoryTree($tree, $level = 0) {
    if (empty($tree)) return '';
    
    $html = '<ul class="directory-tree">';
    
    foreach ($tree as $node) {
        $hasChildren = !empty($node['children']);
        $hasIndex = $node['hasIndex'];
        
        $html .= '<li class="directory-item">';
        
        // 根据层级决定是否添加缩进样式
        $nodeClass = $level > 0 ? 'directory-node' : 'directory-node root-node';
        $html .= '<div class="' . $nodeClass . '">';
        
        // 目录头部
        $html .= '<div class="directory-header" onclick="toggleDirectory(this)">';
        
        // 展开/折叠图标（只有子目录才显示）
        if ($hasChildren) {
            $html .= '<span class="expand-icon collapsed"></span>';
        } else {
            $html .= '<span class="expand-icon" style="visibility: hidden;"></span>';
        }
        
        // 目录图标
        $html .= '<span class="directory-icon">' . ($hasIndex ? '🔗' : '📁') . '</span>';
        
        // 目录名称
        $nameClass = $hasIndex ? 'has-index' : 'no-index';
        $html .= '<span class="directory-name ' . $nameClass . '">' . htmlspecialchars($node['name']) . '</span>';
        
        // 如果有index.html，显示访问链接
        if ($hasIndex) {
            $html .= '<a href="' . htmlspecialchars($node['url']) . '" class="index-link" onclick="event.stopPropagation()" target="_blank">打开</a>';
        }
        
        $html .= '</div>';
        
        // 子目录
        if ($hasChildren) {
            $html .= '<div class="directory-children collapsed">';
            $html .= renderDirectoryTree($node['children'], $level + 1);
            $html .= '</div>';
        }
        
        $html .= '</div>';
        $html .= '</li>';
    }
    
    $html .= '</ul>';
    return $html;
}
?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>落地页导航</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: #ffffff;
            color: #333333;
            line-height: 1.6;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        .header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f0f0f0;
        }

        .header h1 {
            font-size: 1.8em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .header p {
            color: #7f8c8d;
            font-size: 0.9em;
        }

        .stats {
            margin-top: 10px;
            font-size: 0.9em;
            color: #34495e;
        }

        .directory-tree {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .directory-item {
            margin: 0;
            padding: 0;
        }

        .directory-node {
            border-left: 1px solid #e0e0e0;
            margin-left: 15px;
            padding-left: 15px;
        }

        .directory-node.root-node {
            border-left: none;
            margin-left: 0;
            padding-left: 0;
        }

        .directory-header {
            display: flex;
            align-items: center;
            padding: 5px 0;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
        }

        .directory-header:hover {
            background-color: #f8f9fa;
        }

        .expand-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 5px;
            font-size: 12px;
            color: #666;
            user-select: none;
        }

        .expand-icon.collapsed::before {
            content: '▶';
        }

        .expand-icon.expanded::before {
            content: '▼';
        }

        .directory-icon {
            margin-right: 8px;
            color: #95a5a6;
        }

        .directory-name {
            font-weight: 500;
            flex: 1;
        }

        .directory-name.has-index {
            color: #2c3e50;
        }

        .directory-name.no-index {
            color: #7f8c8d;
        }

        .index-link {
            color: #3498db;
            text-decoration: none;
            margin-left: 10px;
            font-size: 0.9em;
        }

        .index-link:hover {
            text-decoration: underline;
        }

        .directory-children {
            overflow: hidden;
        }

        .directory-children.collapsed {
            max-height: 0;
        }

        .directory-children.expanded {
            max-height: none;
        }

        .no-results {
            text-align: center;
            color: #7f8c8d;
            font-size: 1.1em;
            margin-top: 40px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 4px;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ecf0f1;
            text-align: center;
            color: #7f8c8d;
            font-size: 0.9em;
        }

        /* 登录表单样式 */
        .login-container {
            max-width: 400px;
            margin: 100px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            padding: 40px;
            text-align: center;
        }

        .login-title {
            font-size: 1.8em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 30px;
        }

        .login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .login-input {
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s ease;
        }

        .login-input:focus {
            border-color: #3498db;
        }

        .login-button {
            padding: 12px 20px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .login-button:hover {
            background: #2980b9;
        }

        .login-error {
            color: #e74c3c;
            font-size: 0.9em;
            margin-top: 10px;
        }

        .logout-link {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #7f8c8d;
            text-decoration: none;
            font-size: 0.9em;
        }

        .logout-link:hover {
            color: #2c3e50;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            body {
                padding: 15px;
            }
            
            .header h1 {
                font-size: 1.5em;
            }

            .login-container {
                margin: 50px auto;
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <?php if (!$is_authenticated): ?>
        <!-- 登录表单 -->
        <div class="login-container">
            <h1 class="login-title">🔐 落地页导航</h1>
            <form class="login-form" method="POST">
                <input type="password" name="password" class="login-input" placeholder="请输入访问密码" required autofocus>
                <button type="submit" class="login-button">登录</button>
                <?php if (isset($login_error)): ?>
                    <div class="login-error"><?php echo htmlspecialchars($login_error); ?></div>
                <?php endif; ?>
            </form>
        </div>
    <?php else: ?>
        <!-- 主导航界面 -->
        <a href="?logout" class="logout-link">退出登录</a>
        <div class="container">
            <div class="header">
                <h1>落地页导航</h1>
                <div class="stats">
                    共找到 <?php echo $totalCount; ?> 个落地页
                </div>
            </div>

            <?php if (empty($directoryTree)): ?>
                <div class="no-results">
                    未找到落地页
                </div>
            <?php else: ?>
                <?php echo renderDirectoryTree($directoryTree); ?>
            <?php endif; ?>

            <div class="footer">
                <p>点击目录名称展开/收起，点击"打开"进入页面</p>
            </div>
        </div>
    <?php endif; ?>

    <?php if ($is_authenticated): ?>
    <script>
        // 目录折叠状态管理
        const STORAGE_KEY = 'directory_tree_state';
        
        // 获取存储的状态
        function getStoredState() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                return stored ? JSON.parse(stored) : {};
            } catch (e) {
                return {};
            }
        }
        
        // 保存状态
        function saveState(path, isExpanded) {
            try {
                const state = getStoredState();
                state[path] = isExpanded;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                // localStorage不可用时忽略错误
            }
        }
        
        // 获取目录路径
        function getDirectoryPath(element) {
            const pathParts = [];
            let current = element;
            
            while (current) {
                const nameElement = current.querySelector('.directory-name');
                if (nameElement) {
                    pathParts.unshift(nameElement.textContent.trim());
                }
                current = current.parentElement?.closest('.directory-node');
            }
            
            return pathParts.join('/');
        }
        
        // 切换目录展开/收起状态
        function toggleDirectory(headerElement) {
            const node = headerElement.parentElement;
            const childrenElement = node.querySelector('.directory-children');
            const expandIcon = headerElement.querySelector('.expand-icon');
            
            if (!childrenElement || !expandIcon) return;
            
            const isCurrentlyCollapsed = childrenElement.classList.contains('collapsed');
            const path = getDirectoryPath(node);
            
            if (isCurrentlyCollapsed) {
                // 展开
                childrenElement.classList.remove('collapsed');
                childrenElement.classList.add('expanded');
                expandIcon.classList.remove('collapsed');
                expandIcon.classList.add('expanded');
                saveState(path, true);
            } else {
                // 收起
                childrenElement.classList.remove('expanded');
                childrenElement.classList.add('collapsed');
                expandIcon.classList.remove('expanded');
                expandIcon.classList.add('collapsed');
                saveState(path, false);
            }
        }
        
        // 恢复保存的状态
        function restoreState() {
            const state = getStoredState();
            const allNodes = document.querySelectorAll('.directory-node');
            
            allNodes.forEach(node => {
                const childrenElement = node.querySelector('.directory-children');
                const expandIcon = node.querySelector('.expand-icon');
                
                if (!childrenElement || !expandIcon) return;
                
                const path = getDirectoryPath(node);
                const shouldExpand = state[path] === true;
                
                if (shouldExpand) {
                    childrenElement.classList.remove('collapsed');
                    childrenElement.classList.add('expanded');
                    expandIcon.classList.remove('collapsed');
                    expandIcon.classList.add('expanded');
                }
            });
        }
        
        // 页面加载完成后恢复状态
        document.addEventListener('DOMContentLoaded', function() {
            restoreState();
        });
        
        // 全局暴露toggleDirectory函数供HTML使用
        window.toggleDirectory = toggleDirectory;
    </script>
    <?php endif; ?>
</body>
</html>

