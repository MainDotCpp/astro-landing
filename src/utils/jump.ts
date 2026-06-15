// @ts-nocheck
const NAV_TIMEOUT_MS = 300
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

function fireGoogle(onCallback) {
  const hasGtag = typeof gtag === 'function'
  const hasConv = typeof gtag_report_conversion === 'function'
  if (!hasGtag && !hasConv) return false

  try {
    if (hasConv) {
      try { gtag_report_conversion(undefined) } catch (e) {}
    }
    if (hasGtag) {
      let done = false
      gtag('event', 'contact', {
        event_callback() {
          if (done) return
          done = true
          onCallback()
        },
      })
    }
    return true
  }
  catch (error) {
    console.error(error)
    return false
  }
}

function fireFacebook(link) {
  if (typeof window.fbq !== 'function') return false
  const value = getPurchaseValue()
  const currency = getPurchaseCurrency()
  try { window.fbq('track', 'AddToCart') } catch (e) {}
  try {
    window.fbq('track', 'Purchase', {
      value,
      currency,
      content_name: link,
    })
  }
  catch (e) {}
  return true
}

function fireTiktok(link) {
  if (typeof window.ttq === 'undefined' || typeof window.ttq.track !== 'function') return false
  const value = getPurchaseValue()
  const currency = getPurchaseCurrency()
  const contentId = getContentId()
  const contents = [{ content_id: contentId, content_type: 'product', content_name: link }]
  try { window.ttq.track('ClickButton', { content_id: contentId, content_type: 'product', content_name: link }) } catch (e) {}
  try { window.ttq.track('AddToCart', { content_id: contentId, content_type: 'product', content_name: link, contents }) } catch (e) {}
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
  return true
}

function jump(link) {
  if (!link) return
  let trackerFired = false

  try {
    if (fireGoogle(() => navigateOnce(link))) trackerFired = true
    if (fireFacebook(link)) trackerFired = true
    if (fireTiktok(link)) trackerFired = true
  }
  catch (error) {
    console.error(error)
  }

  if (!trackerFired) {
    navigateOnce(link)
    return
  }
  setTimeout(() => navigateOnce(link), NAV_TIMEOUT_MS)
}

function jumpToKakao() {
  jump(kakao_link)
}

function jumpToBand() {
  jump(band_link)
}

function jumpToWhatsApp() {
  jump(whatsapp_link)
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
