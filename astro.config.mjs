import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@astrojs/react'
// @ts-check
import { defineConfig } from 'astro/config'

import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), UnoCSS({
    injectReset: true,
  })],
  compressHTML: false,
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
      },
    },
  },
  build: {
    // assetsPrefix: 'https://assetfun.top',
    assets: 'static',
  },
})
