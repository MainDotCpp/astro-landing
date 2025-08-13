# BandButton 组件

一个现代化的Band平台专用按钮组件，支持多种变体、尺寸和状态。

## 特性

- 📏 4种尺寸：sm、md、lg、xl
- 🔄 多种状态：正常、加载中、禁用
- 📱 响应式设计，移动端优化
- ♿ 完整的可访问性支持
- 🎯 TypeScript类型安全
- 🎭 丰富的动画效果

## 基本用法

```astro
---
import BandButton from '@/components/button/BandButton.astro'
---

<BandButton text="BAND에서 무료 급등주 받기" />
```

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `text` | `string` | `'BAND에서 무료 급등주 받기'` | 按钮文本 |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 按钮尺寸 |
| `icon` | `boolean` | `true` | 是否显示图标 |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `fullWidth` | `boolean` | `false` | 是否全宽显示 |
| `class` | `string` | `''` | 自定义CSS类 |
| `href` | `string` | `undefined` | 链接地址（可选） |
| `target` | `'_blank' \| '_self'` | `'_self'` | 链接打开方式 |

## 示例

### 尺寸变体

```astro
<BandButton size="sm" text="小按钮" />
<BandButton size="md" text="中按钮" />
<BandButton size="lg" text="大按钮" />
<BandButton size="xl" text="超大按钮" />
```

### 状态变体

```astro
<BandButton text="正常按钮" />
<BandButton text="加载中..." loading={true} />
<BandButton text="禁用按钮" disabled={true} />
<BandButton text="无图标按钮" icon={false} />
```

### 链接按钮

```astro
<BandButton text="内部链接" href="/" />
<BandButton text="外部链接" href="https://band.us" target="_blank" />
```

### 全宽按钮

```astro
<BandButton text="全宽按钮" fullWidth={true} />
```

### 自定义样式

```astro
<BandButton
  text="自定义按钮"
  class="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
/>
```

## 设计系统

### 颜色

- **Primary**: `#00C651` (Band品牌绿)
- **Secondary**: `#F8F9FA` (浅灰背景)
- **Text**: `#1A1A1A` (深灰文字)

### 动画

- **Hover**: 轻微上移 + 阴影增强
- **Active**: 按下时的缩放反馈
- **Loading**: 旋转动画
- **Focus**: 可访问性友好的焦点指示

### 响应式

- 移动端优化的触摸尺寸
- 自适应文本大小
- 支持减少动画偏好设置

## 可访问性

- 完整的键盘导航支持
- 屏幕阅读器友好
- 高对比度模式支持
- 焦点管理
- ARIA属性支持

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 测试

访问 `/band-button-test` 页面查看所有变体的演示。
