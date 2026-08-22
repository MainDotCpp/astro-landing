import antfu from '@antfu/eslint-config'

export default antfu(
  {
    astro: true,
    formatters: {
      prettier: true,
      css: true,
      html: true,
    },
  },
  {
    rules: {
      // link / kakao_link / band_link 由 SSI 注入声明在页面里，供外部的
      // /mjSFqQ/QvBmKz.js 读取。ESLint 看不到这层跨文件关系，会误判为未使用。
      // 其余选项与 antfu 默认保持一致。
      'unused-imports/no-unused-vars': ['error', {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_|^(?:link|kakao_link|band_link)$',
      }],
    },
  },
)
