// @ts-nocheck
const HARD_TIMEOUT_MS = 800 // 硬兜底：无论回调是否返回，最迟都跳转，避免卡死
const TIKTOK_FLUSH_MS = 500 // TikTok 无送达回调，至少驻留这么久让其批量事件发出
const CONV_FLUSH_MS = 250 // 仅有 Google Ads 转化脚本、无回调可等时的最小驻留
const FB_DEFAULT_VALUE = 50
const FB_DEFAULT_CURRENCY = 'USD'

let __navigated = false
function navigateOnce(link) {
  if (__navigated || !link) return
  __navigated = true
  window.location.href = link
}

function getPurchaseValue() {
  // 必须是干净的数字（不能带货币符号/字母/逗号），否则 TikTok 报 "value is invalid"
  const v = Number(window.__fbPurchaseValue)
  return (Number.isFinite(v) && v > 0) ? v : FB_DEFAULT_VALUE
}

function getPurchaseCurrency() {
  return (typeof window.__fbPurchaseCurrency === 'string' && window.__fbPurchaseCurrency.trim()) ? window.__fbPurchaseCurrency : FB_DEFAULT_CURRENCY
}

// TikTok 电商事件要求非空的 content_id；可用 window.__ttContentId 覆盖，否则回退到页面路径
function getContentId() {
  if (typeof window.__ttContentId === 'string' && window.__ttContentId.trim()) return window.__ttContentId
  try { return (window.location.pathname || 'lp_default').replace(/^\/+|\/+$/g, '') || 'lp_default' }
  catch (e) { return 'lp_default' }
}

// 统一跳转：先并行触发各平台转化事件，等「有送达回调的平台」全部确认送达、
// 且「fire-and-forget 平台（TikTok/纯转化脚本）」的最小驻留时间已过，再跳转；
// 任何情况下最迟 HARD_TIMEOUT_MS 兜底跳转。navigateOnce 去重，保证只跳一次。
function jump(link) {
  if (!link) return

  const hasGtag = typeof gtag === 'function'
  const hasConv = typeof gtag_report_conversion === 'function'
  const hasFb = typeof window.fbq === 'function'
  const hasTt = typeof window.ttq !== 'undefined' && typeof window.ttq.track === 'function'

  // 没有任何跟踪器：直接跳，不浪费时间
  if (!hasGtag && !hasConv && !hasFb && !hasTt) {
    navigateOnce(link)
    return
  }

  const value = getPurchaseValue()
  const currency = getPurchaseCurrency()

  // pending：仍在等待「送达回调」的跟踪器数（仅 GA4 / Facebook 有可靠回调）
  // minWaitDone：fire-and-forget 跟踪器（TikTok / 纯转化脚本）的最小驻留时间是否已过
  let pending = 0
  let minWaitDone = true

  function tryNavigate() {
    if (pending <= 0 && minWaitDone) navigateOnce(link)
  }

  try {
    // Google Ads 转化脚本（fire-and-forget，内部通常走 sendBeacon）
    if (hasConv) {
      try { gtag_report_conversion(undefined) }
      catch (e) {}
    }

    // GA4：显式 beacon + event_callback 确认送达后再计数归零
    if (hasGtag) {
      pending += 1
      let done = false
      const onSent = () => { if (done) return; done = true; pending -= 1; tryNavigate() }
      try { gtag('event', 'contact', { transport_type: 'beacon', event_callback: onSent }) }
      catch (e) { onSent() }
    }

    // Facebook Pixel：eventCallback 确认 Purchase 送达后再计数归零
    if (hasFb) {
      try { window.fbq('track', 'Contact') }
      catch (e) {}
      try { window.fbq('track', 'AddToCart') }
      catch (e) {}
      pending += 1
      let done = false
      const onSent = () => { if (done) return; done = true; pending -= 1; tryNavigate() }
      try { window.fbq('track', 'Purchase', { value, currency, content_name: link }, { eventCallback: onSent }) }
      catch (e) { onSent() }
    }

    // TikTok Pixel：无可靠送达回调，靠 TIKTOK_FLUSH_MS 最小驻留兜住其批量上报
    if (hasTt) {
      const contentId = getContentId()
      const contents = [{ content_id: contentId, content_type: 'product', content_name: link }]
      try { window.ttq.track('ClickButton', { content_id: contentId, content_type: 'product', content_name: link }) }
      catch (e) {}
      try { window.ttq.track('AddToCart', { content_id: contentId, content_type: 'product', content_name: link, contents }) }
      catch (e) {}
      try {
        window.ttq.track('CompletePayment', {
          value,
          currency,
          content_id: contentId,
          content_type: 'product',
          content_name: link,
          contents: [{ content_id: contentId, content_type: 'product', content_name: link, quantity: 1, price: value }],
        })
      }
      catch (e) {}
    }
  }
  catch (error) {
    console.error(error)
  }

  // fire-and-forget 跟踪器需要的最小驻留时间
  let minWaitMs = 0
  if (hasTt) minWaitMs = TIKTOK_FLUSH_MS
  else if (hasConv && !hasGtag && !hasFb) minWaitMs = CONV_FLUSH_MS

  if (minWaitMs > 0) {
    minWaitDone = false
    setTimeout(() => { minWaitDone = true; tryNavigate() }, minWaitMs)
  }

  // 硬兜底：任何情况下最迟 HARD_TIMEOUT_MS 跳转
  setTimeout(() => navigateOnce(link), HARD_TIMEOUT_MS)

  // 处理「无需等待任何回调 / 驻留」的情形（例如回调已同步触发）
  tryNavigate()
}

function jumpToKakao() {
  jump(typeof kakao_link !== 'undefined' ? kakao_link : null)
}

function jumpToBand() {
  jump(typeof band_link !== 'undefined' ? band_link : null)
}

function jumpToWhatsApp() {
  jump(typeof whatsapp_link !== 'undefined' ? whatsapp_link : null)
}

function mixinJump() {
  if (typeof link !== 'undefined') {
    jump(link)
  }
  else if (typeof whatsapp_link !== 'undefined') {
    jumpToWhatsApp()
  }
  else if (typeof kakao_link !== 'undefined') {
    jumpToKakao()
  }
  else if (typeof band_link !== 'undefined') {
    jumpToBand()
  }
}

export { jump, jumpToBand, jumpToKakao, jumpToWhatsApp, mixinJump }

// Expose to window for inline HTML handlers when included via <script type="module" src="/src/utils/jump.ts">
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.jump = jump
  // @ts-ignore
  window.jumpToBand = jumpToBand
  // @ts-ignore
  window.jumpToKakao = jumpToKakao
  // @ts-ignore
  window.jumpToWhatsApp = jumpToWhatsApp
  // @ts-ignore
  window.mixinJump = mixinJump
}
