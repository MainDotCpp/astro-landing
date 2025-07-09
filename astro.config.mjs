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
  },
  build: {
    // assetsPrefix: 'https://assetfun.top',
    assets: 'static',
  },
})
