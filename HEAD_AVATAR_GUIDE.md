# 头像图片指南

## 需要的头像图片

### 1. 主讲师头像
**文件名：** `sq2_head.jpg` 和 `sq5_head.jpg`
**位置：** `src/pages/private/JP/[people]/20250722-1.[version]/static/`
**用途：** 三橋貴明的专业头像
**规格要求：**
- 尺寸：400x400px 或更高（正方形）
- 格式：JPG
- 风格：专业商务人士
- 年龄：45-55岁左右
- 着装：正装或商务休闲
- 表情：自信、专业、可信赖
- 背景：纯色或简洁

### 2. 用户案例头像
**需求：** 用于用户评价区域的田中和佐藤案例
**当前状态：** 使用文字占位符，可选择保持或使用真实头像

## 推荐获取方式

### 免费资源
1. **Unsplash** (https://unsplash.com)
   - 搜索关键词：`business man japan`, `professional headshot`, `asian businessman`
   - 高质量免费商用图片

2. **Pexels** (https://pexels.com)
   - 搜索：`japanese businessman`, `professional portrait`
   - 免费商用授权

3. **Pixabay** (https://pixabay.com)
   - 搜索：`business portrait`, `professional man`
   - 免费使用

### AI生成选项
1. **Generated Photos** (https://generated.photos)
   - 生成逼真的AI人像
   - 可指定年龄、性别、着装

2. **ThisPersonDoesNotExist** (https://thispersondoesnotexist.com)
   - 免费AI生成人像
   - 刷新页面获取新头像

## 图片处理要求

### 技术规格
```
主讲师头像：
- 最小尺寸：300x300px
- 推荐尺寸：400x400px 或 500x500px
- 格式：JPG（压缩后文件大小 < 100KB）
- 质量：80-90%
```

### 视觉要求
1. **专业性**
   - 正装或商务着装
   - 整洁的发型
   - 自信的表情

2. **可信度**
   - 成熟稳重的外观
   - 直视镜头
   - 温和但权威的表情

3. **日本本土化**
   - 亚洲面孔优先
   - 符合日本商务文化

## 文件放置指南

### 目录结构
```
src/pages/private/JP/[people]/20250722-1.[version]/static/
├── sq2_head.jpg     # 版本2使用
├── sq5_head.jpg     # 版本5使用
├── sq2_header.png   # 现有文件
├── sq2_img.png      # 现有文件
├── sq5_header.png   # 现有文件
└── sq5_img.png      # 现有文件
```

### 替换步骤
1. 下载合适的头像图片
2. 调整尺寸为正方形（建议400x400px）
3. 压缩文件大小（目标 < 100KB）
4. 重命名为指定文件名
5. 放置到对应的static目录

## 当前占位符效果
页面当前使用文字占位符显示"三橋"，替换后将显示真实头像照片。

## 法律注意事项
- 确保图片有适当的使用授权
- 避免使用真实人物照片（除非有授权）
- 推荐使用AI生成或免费商用图片
- 保留图片来源信息以备查证

## 快速实施建议

### 方案A：使用免费资源
1. 访问 Unsplash.com
2. 搜索 "asian businessman professional"
3. 选择2张不同角度/风格的专业头像
4. 下载高分辨率版本
5. 使用图片编辑工具裁剪为正方形
6. 压缩并重命名为 sq2_head.jpg 和 sq5_head.jpg

### 方案B：AI生成（推荐）
1. 访问 Generated.photos
2. 设置参数：Male, 45-50岁, Asian, Business attire
3. 生成2个不同的头像
4. 下载并按规格处理
5. 放置到指定位置

## 测试验证
替换图片后，检查：
- 头像是否正确显示
- 圆形裁剪效果是否正常
- 移动端显示是否正确
- 加载速度是否合理

## 备选方案
如果暂时无法获取合适头像，当前的文字占位符"三橋"也能正常工作，可以后续再进行替换。
