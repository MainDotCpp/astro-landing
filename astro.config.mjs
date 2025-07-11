import react from '@astrojs/react'
// @ts-check
import { defineConfig } from 'astro/config'

import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), UnoCSS({
    injectReset: true,
  })],
  compressHTML: false,
  vite: {
    plugins: [visualizer({
      emitFile: true,
      filename: 'stats.html',
    })],
  },
  build: {
    // assetsPrefix: 'https://assetfun.top',
    assets: 'static',
  },
})
