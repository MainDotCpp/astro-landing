import { defineConfig, presetAttributify, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Noto Sans JP', 'Noto Sans SC'],
      },
    }),
  ],
  rules: [
    ['link-btn', {
      cursor: 'pointer',
    }],
  ],
})
