# Umami 简单跟踪使用指南

## 概述

项目已集成 Umami Analytics，使用 `injectScript` API 实现全局自动跟踪。所有页面会自动包含跟踪代码，无需手动添加。

## 自动跟踪功能

### 1. 页面浏览（自动）
- ✅ 所有页面访问自动跟踪
- ✅ 无需任何配置

### 2. 页面停留时间（自动）
- ✅ 用户离开页面时自动记录停留时间
- ✅ 无需任何配置

## 手动跟踪（使用 HTML 属性）

### CTA 按钮点击跟踪

在按钮上添加 `data-umami-event` 属性：

```html
<!-- 基础跟踪 -->
<button data-umami-event="cta-click">立即注册</button>

<!-- 带额外数据的跟踪 -->
<button 
  data-umami-event="cta-click"
  data-umami-event-position="hero"
  data-umami-event-type="line"
>
  LINE友達追加
</button>
```

### 表单提交跟踪

在表单上添加 `data-umami-event` 属性：

```html
<form data-umami-event="form-submit" data-umami-event-form="contact">
  <input type="email" name="email" />
  <button type="submit">提交</button>
</form>
```

### 外部链接跟踪

在链接上添加 `data-umami-event` 属性：

```html
<a 
  href="https://line.me"
  data-umami-event="external-link"
  data-umami-event-destination="line"
>
  访问 LINE
</a>
```

## 配置（可选）

### 环境变量

如果需要自定义 Umami 配置，可以在 `.env` 文件中添加：

```env
PUBLIC_UMAMI_SRC=https://your-umami-instance.com/script.js
PUBLIC_UMAMI_WEBSITE_ID=your-website-id
```

如果不设置，将使用默认配置。

## 跟踪的事件列表

| 事件名称 | 触发方式 | 说明 |
|---------|---------|------|
| `page-view` | 自动 | 页面浏览（Umami 自动跟踪） |
| `time-on-page` | 自动 | 页面停留时间（秒） |
| `cta-click` | 手动添加属性 | CTA 按钮点击 |
| `form-submit` | 手动添加属性 | 表单提交 |
| `external-link` | 手动添加属性 | 外部链接点击 |

## 使用示例

### 完整的落地页示例

```html
<!-- Hero 区域的 CTA -->
<button 
  data-umami-event="cta-click"
  data-umami-event-position="hero"
  data-umami-event-type="line"
>
  LINE友達追加
</button>

<!-- Footer 区域的 CTA -->
<button 
  data-umami-event="cta-click"
  data-umami-event-position="footer"
  data-umami-event-type="line"
>
  今すぐ友達追加
</button>

<!-- 联系表单 -->
<form data-umami-event="form-submit" data-umami-event-form="contact">
  <input type="email" name="email" placeholder="邮箱" />
  <button type="submit">提交</button>
</form>
```

## 注意事项

1. **自动跟踪**：页面浏览和停留时间会自动跟踪，无需任何操作
2. **手动跟踪**：按钮、表单、链接需要添加 `data-umami-event` 属性
3. **数据属性**：使用 `data-umami-event-<key>` 格式添加额外数据
4. **性能**：跟踪代码使用 `defer` 加载，不会影响页面性能

## 查看数据

访问你的 Umami 仪表板查看：
- 页面浏览量
- 页面停留时间
- 自定义事件（CTA 点击、表单提交等）

