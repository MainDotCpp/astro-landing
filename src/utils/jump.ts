// @ts-nocheck
const NAV_TIMEOUT_MS = 300
const FB_DEFAULT_VALUE = 0
const FB_DEFAULT_CURRENCY = 'CAD'

let __navigated = false
function navigateOnce(link) {
  if (__navigated || !link) return
  __navigated = true
  window.location.href = link
}

function getPurchaseValue() {
  return (typeof window.__fbPurchaseValue === 'number') ? window.__fbPurchaseValue : FB_DEFAULT_VALUE
}

function getPurchaseCurrency() {
  return (typeof window.__fbPurchaseCurrency === 'string') ? window.__fbPurchaseCurrency : FB_DEFAULT_CURRENCY
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
  try { window.ttq.track('ClickButton', { content_name: link }) } catch (e) {}
  try { window.ttq.track('AddToCart', { content_name: link }) } catch (e) {}
  try {
    window.ttq.track('CompletePayment', {
      value,
      currency,
      content_name: link,
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
