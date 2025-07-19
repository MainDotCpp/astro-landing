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
  shortcuts: {
    'kakao-color': 'bg-[#fcef3b] text-black',
    'band-color': 'bg-[#b7eb8f] text-black',
    'link-btn': 'cursor-pointer ',
  },
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
  },
})
