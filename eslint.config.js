import antfu from '@antfu/eslint-config'

export default antfu({
  astro: true,
  formatters: {
    prettier: true,
    css: true,
    html: true,
  },
})
