import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@astrojs/react'
// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// 自定义 Vite 插件：排除第三方 CSS 文件不被 TailwindCSS 处理
function excludeThirdPartyCss() {
  return {
    name: 'exclude-third-party-css',
    enforce: 'pre',
    transform(code, id) {
      // 排除第三方 CSS 文件
      if (id.includes('style-static.min.css') || 
          id.includes('bootstrap.min.css') ||
          id.includes('et-core-unified')) {
        // 返回空字符串，跳过处理
        return { code: '', map: null }
      }
      return null
    }
  }
}

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  compressHTML: false,
  vite: {
    plugins: [
      excludeThirdPartyCss(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
      },
    },
  },
  build: {
    // assetsPrefix: 'https://assetfun.top',
    format: 'preserve',
    assets: 'mjSFqQ',
  },
})
