// 按钮组件导出
export { default as BandButton } from './BandButton.astro'
export { default as BandCtaButton } from './BandCtaButton.astro'
// CTA 按钮组件导出
export { default as BaseCtaButton } from './BaseCtaButton.astro'
export { default as KakaoCopyButton } from './KaKaoCopyButton.tsx'

export { default as KakaoCtaButton } from './KakaoCtaButton.astro'
export { default as MixedCtaButton } from './MixedCtaButton.astro'
export { default as ModalBandButton } from './ModalBandButton.astro'
export { default as ModalKakaoButton } from './ModalKakaoButton.astro'

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

export interface KakaoCopyButtonProps {
  text?: string
  copyText?: string
  size?: 'sm' | 'md' | 'lg'
  autoHideDelay?: number
  className?: string
}
