// 按钮组件导出
export { default as BandButton } from './BandButton.astro'

// 类型导出
export interface BandButtonProps {
  text?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  class?: string
  href?: string
  target?: '_blank' | '_self'
}
