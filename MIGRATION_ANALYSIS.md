# UnoCSS → TailwindCSS 迁移分析报告

## 📊 当前项目状态

### 依赖情况
- **TailwindCSS**: v4.1.16 (通过 `@tailwindcss/vite` 集成)
- **UnoCSS**: v66.3.3 (通过 `unocss/astro` 集成)
- **@unocss/reset**: v66.3.3 (devDependencies)

### 配置文件
- `uno.config.ts` - UnoCSS 配置
- `astro.config.mjs` - 集成了 UnoCSS
- `src/styles/globals.css` - 使用 `@import 'tailwindcss'`

## 🔍 UnoCSS 使用情况分析

### 1. Shortcuts（快捷类）
UnoCSS 配置中定义了以下 shortcuts：

```typescript
shortcuts: {
  'kakao-color': 'bg-[#fcef3b] text-black',
  'band-color': 'bg-[#b7eb8f] text-black',
  'link-btn': 'cursor-pointer',
  'line-button': 'bg-gradient-to-r from-[#06C755] to-[#05B655] ...',
}
```

**实际使用情况**：
- ✅ `link-btn`: **已在 `globals.css` 中定义**，UnoCSS shortcut 可能被覆盖
- ⚠️ `kakao-color`: 未找到实际使用
- ⚠️ `band-color`: 未找到实际使用
- ⚠️ `line-button`: 部分页面使用，但多数页面使用自定义 CSS

### 2. 动画（breathing）
```typescript
preflights: [
  {
    getCSS: () => `
     @keyframes breathing {
       0%, 100% { transform: scale(1); opacity: 1; }
       50% { transform: scale(1.05); opacity: 0.9; }
     }
    `,
  },
],
theme: {
  animation: {
    breathing: 'breathing 2s ease-in-out infinite',
  },
}
```

**实际使用情况**：
- ✅ `breathing` 动画在 `CtaButton.astro` 中使用
- ⚠️ 但 `CtaButton.astro` 中已经自己定义了 `@keyframes breathing`

### 3. Presets
- `presetUno()` - TailwindCSS 兼容层
- `presetAttributify()` - 属性化模式（未发现实际使用）
- `presetWebFonts()` - Google Fonts 集成（Noto Sans JP/SC）

**实际使用情况**：
- ⚠️ `presetAttributify`: 未发现使用
- ⚠️ `presetWebFonts`: 项目中通过其他方式加载字体（`@fontsource/noto-sans-jp`）

### 4. Reset CSS
- UnoCSS 配置了 `injectReset: true`
- 但项目中也使用了 `@unocss/reset`

## ✅ 迁移可行性评估

### 🟢 **高度可行** - 推荐迁移

**理由**：
1. **TailwindCSS v4 已集成**：项目已经使用 TailwindCSS v4，功能完整
2. **UnoCSS 使用量少**：
   - shortcuts 使用率低（多数未使用）
   - `link-btn` 已在 globals.css 中定义
   - `breathing` 动画在组件中已重新定义
3. **功能重复**：UnoCSS 的功能与 TailwindCSS 高度重叠
4. **减少依赖**：移除 UnoCSS 可以简化项目依赖

## 📋 迁移步骤

### Step 1: 迁移 Shortcuts

#### 1.1 link-btn
✅ **已完成** - 已在 `globals.css` 中定义：
```css
.link-btn {
  cursor: pointer;
}
```

#### 1.2 kakao-color, band-color
如果未来需要使用，可以在 `globals.css` 中添加：
```css
.kakao-color {
  @apply bg-[#fcef3b] text-black;
}

.band-color {
  @apply bg-[#b7eb8f] text-black;
}
```

#### 1.3 line-button
在 `globals.css` 中添加：
```css
.line-button {
  @apply bg-gradient-to-r from-[#06C755] to-[#05B34A] hover:from-[#05B34A] hover:to-[#049e41] text-white shadow-lg hover:shadow-xl transition-all cursor-pointer;
}
```

### Step 2: 迁移动画

在 `globals.css` 中添加：
```css
@keyframes breathing {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

.animate-breathing {
  animation: breathing 2s ease-in-out infinite;
}
```

### Step 3: 迁移字体配置

UnoCSS 的 `presetWebFonts` 配置：
```typescript
presetWebFonts({
  provider: 'google',
  fonts: {
    sans: ['Noto Sans JP', 'Noto Sans SC'],
  },
})
```

**替代方案**：
- 项目已使用 `@fontsource/noto-sans-jp`
- 可以在 `globals.css` 中配置字体族：
```css
@theme inline {
  --font-sans: 'Noto Sans JP', 'Noto Sans SC', sans-serif;
}
```

### Step 4: 移除 UnoCSS

1. **移除依赖**：
```bash
npm uninstall unocss @unocss/reset
```

2. **移除配置文件**：
```bash
rm uno.config.ts
```

3. **更新 astro.config.mjs**：
```javascript
// 移除这行
import UnoCSS from 'unocss/astro'

// 从 integrations 中移除
integrations: [react()], // 移除 UnoCSS({ injectReset: true })
```

4. **更新 globals.css**：
确保包含所有迁移的样式

### Step 5: 验证

1. 检查所有页面是否正常显示
2. 验证动画效果
3. 检查按钮样式
4. 确认字体加载正常

## ⚠️ 注意事项

1. **Reset CSS**: UnoCSS 的 reset 功能需要确认是否必要，TailwindCSS v4 可能有自己的 reset
2. **构建性能**: 移除 UnoCSS 可能会略微提升构建速度（减少一个处理步骤）
3. **代码搜索**: 需要全局搜索是否有遗漏的 UnoCSS 特性使用

## 📈 迁移收益

1. ✅ **简化依赖**：减少 2 个 npm 包
2. ✅ **统一技术栈**：只使用 TailwindCSS
3. ✅ **减少配置**：移除 uno.config.ts
4. ✅ **降低维护成本**：减少一个框架的学习和维护成本
5. ✅ **构建优化**：可能提升构建速度

## 🎯 结论

**强烈建议迁移到纯 TailwindCSS**，因为：
- UnoCSS 的使用量极少
- 功能与 TailwindCSS 重复
- 迁移成本低
- 收益明显

迁移风险：**低** ⚠️
迁移难度：**简单** ✅
迁移收益：**高** 📈

