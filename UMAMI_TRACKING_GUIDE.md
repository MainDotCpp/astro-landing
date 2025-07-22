# Umami Analytics 追踪系统使用指南

## 概述

本项目集成了完整的 Umami Analytics 追踪系统，提供详细的用户行为分析和转化率监控。

## 配置步骤

### 1. 基础配置

1. 注册 Umami 账户：[https://umami.is](https://umami.is) 或自建服务器
2. 创建网站并获取 `website-id`
3. 修改 `src/components/TrackCode.astro` 中的配置：

```javascript
<script
  defer
  src="https://your-umami-instance.com/script.js"
  data-website-id="YOUR_ACTUAL_WEBSITE_ID"
  data-domains="yourdomain.com"
>
</script>
```

### 2. 环境变量配置（推荐）

在 `.env` 文件中添加：

```env
PUBLIC_UMAMI_WEBSITE_ID=your-website-id
PUBLIC_UMAMI_SRC=https://your-umami-instance.com/script.js
PUBLIC_UMAMI_DOMAINS=yourdomain.com
```

## 追踪功能说明

### 自动追踪功能

系统会自动追踪以下事件：

1. **页面浏览** - 所有页面访问
2. **滚动深度** - 25%, 50%, 75%, 100% 滚动位置
3. **页面停留时间** - 用户离开页面时记录
4. **表单提交** - 所有表单的提交事件
5. **输入框焦点** - 用户首次点击输入框
6. **视频播放** - 视频播放和完成事件
7. **JavaScript错误** - 页面JS错误监控
8. **页面可见性** - 页面隐藏/显示状态

### 手动事件追踪

#### 1. HTML 属性追踪（推荐）

在 HTML 元素上添加 `data-umami-event` 属性：

```html
<!-- 基础事件追踪 -->
<button data-umami-event="cta-click">立即注册</button>

<!-- 带额外数据的事件追踪 -->
<button data-umami-event="contact" data-umami-event-method="line" data-umami-event-source="hero-section">
  LINE友達追加
</button>

<!-- 图片加载追踪 -->
<img src="hero.jpg" data-track-load alt="Hero Image" />
```

#### 2. JavaScript 函数追踪

```javascript
// 自定义事件追踪
trackCustomEvent('button-click', {
  buttonText: 'Download',
  section: 'header'
})

// 转化漏斗追踪
trackFunnelStep('step-1-landing')
trackFunnelStep('step-2-form-view')
trackFunnelStep('step-3-form-submit')
trackFunnelStep('step-4-success')

// A/B测试追踪
trackABTest('hero-design', 'variant-a')
```

### 落地页专用事件

针对投资落地页，推荐追踪以下关键事件：

```html
<!-- 主要CTA按钮 -->
<button data-umami-event="contact" data-umami-event-method="line" data-umami-event-position="hero">LINE友達追加</button>

<!-- 成功案例查看 -->
<div data-umami-event="success-case-view" data-umami-event-percentage="100">成功案例卡片</div>

<!-- 课程特点查看 -->
<div data-umami-event="feature-view" data-umami-event-feature="smartphone">功能特点</div>

<!-- 紧急性区域曝光 -->
<div data-umami-event="urgency-view" data-umami-event-message="immediate-action">紧急性文案</div>
```

## 转化漏斗设置

为落地页设置标准转化漏斗：

```javascript
// 页面加载时
trackFunnelStep('landing-view')

// 滚动到成功案例
trackFunnelStep('success-cases-view')

// 滚动到功能介绍
trackFunnelStep('features-view')

// 查看参与方法
trackFunnelStep('participation-view')

// 点击CTA按钮
trackFunnelStep('cta-click')

// 成功转化（如果有回调）
trackFunnelStep('conversion-complete')
```

## A/B 测试配置

```javascript
// 在页面加载时设置测试变体
const variant = Math.random() > 0.5 ? 'variant-a' : 'variant-b'

// 记录用户看到的变体
trackABTest('landing-design-test', variant)

// 根据变体显示不同内容
if (variant === 'variant-a') {
  // 显示变体A的内容
}
else {
  // 显示变体B的内容
}
```

## 数据分析指标

### 关键指标监控

1. **转化率指标**
   - 页面访问 → CTA点击转化率
   - 各漏斗步骤转化率
   - 不同流量源转化效果

2. **用户行为指标**
   - 页面停留时间
   - 滚动深度分布
   - 跳出率
   - 功能区域查看率

3. **技术指标**
   - 页面加载性能
   - JavaScript错误率
   - 移动端 vs 桌面端表现

### Umami 仪表板配置

1. **事件统计**
   - contact (CTA点击)
   - scroll-depth (滚动深度)
   - funnel-step (转化漏斗)
   - feature-view (功能查看)

2. **自定义报告**
   - 按设备类型分组
   - 按流量来源分组
   - 按时间段分析

## 最佳实践

### 1. 事件命名规范

```javascript
// 使用一致的命名格式
'action-object-context'

// 示例
'click-cta-hero' // 点击-CTA-首屏
'view-success-case' // 查看-成功案例
'submit-form-contact' // 提交-表单-联系
'play-video-intro' // 播放-视频-介绍
```

### 2. 数据属性组织

```html
<!-- 主事件名称 -->
data-umami-event="contact"

<!-- 事件上下文数据 -->
data-umami-event-method="line" data-umami-event-position="hero" data-umami-event-variant="a"
data-umami-event-source="organic"
```

### 3. 性能优化

- 使用 `defer` 加载追踪脚本
- 限制事件频率（如滚动事件）
- 批量发送事件数据
- 避免追踪敏感信息

### 4. 隐私保护

- 不追踪个人身份信息
- 遵守GDPR和其他隐私法规
- 提供用户选择退出机制

## 故障排除

### 常见问题

1. **事件不显示**
   - 检查website-id是否正确
   - 确认域名配置匹配
   - 查看浏览器控制台错误

2. **重复事件**
   - 避免多次初始化追踪代码
   - 使用防抖动机制

3. **性能影响**
   - 确保脚本使用defer加载
   - 监控追踪代码的执行时间

### 调试模式

在开发环境中添加调试输出：

```javascript
// 在 TrackCode.astro 中添加
if (window.location.hostname === 'localhost') {
  const originalTrack = umami.track
  umami.track = function (eventName, eventData) {
    console.log('Umami Event:', eventName, eventData)
    return originalTrack.call(this, eventName, eventData)
  }
}
```

## 集成示例

完整的落地页追踪示例：

```html
<!-- 在 BaseLayout.astro 中引入 -->
<TrackCode />

<!-- 在页面组件中使用 -->
<button
  class="line-cta-button link-btn"
  data-umami-event="contact"
  data-umami-event-method="line"
  data-umami-event-position="main-cta"
  data-umami-event-instructor="{people}"
>
  今すぐ友達追加して稼ぐ
</button>
```

通过这套完整的追踪系统，你可以：
- 精确了解用户行为
- 优化转化率
- 进行A/B测试
- 监控页面性能
- 识别改进机会
