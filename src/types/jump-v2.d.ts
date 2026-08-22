// V2 跳转脚本 public/mjSFqQ/QvBmKz.js 暴露的全局入口。
// 该脚本在 <head> 同步加载，一定早于 React hydration，可直接调用。
declare global {
  interface Window {
    /** 唯一入口。不传参跳主链接；'band' / 'kakao' 指定渠道 */
    onLinkBtnClick: (channel?: 'band' | 'kakao') => void
    /** 跳指定 URL，并触发全平台转化事件 */
    jump: (url: string) => void
    mixinJump: () => void
    jumpToKakao: () => void
    jumpToBand: () => void
  }
}

export {}
