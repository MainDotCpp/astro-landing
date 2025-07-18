import { defineConfig, presetAttributify, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
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
  theme: {
    animation: {
      breathing: 'breathing 2s ease-in-out infinite',
    },
    keyframes: {
      breathing: {
        '0%, 100%': { transform: 'scale(1)', opacity: '1' },
        '50%': { transform: 'scale(1.05)', opacity: '0.9' },
      },
    },
  },
})
