import mdx from '@astrojs/mdx'
import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite'

// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react()],
  compressHTML: false,
  vite: {
    // plugins: [tailwindcss()],
  },
  build: {
    assetsPrefix: 'https://assetfun.top',
    assets: 'static',
  },
  // experimental: {
  //   csp: {
  //     scriptDirective: {
  //       strictDynamic: true,
  //     },
  //   },
  // },
})
