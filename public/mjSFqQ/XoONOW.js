var NAV_TIMEOUT_MS = 300
var FB_DEFAULT_VALUE = 0
var FB_DEFAULT_CURRENCY = 'CAD'

var __navigated = false
function navigateOnce(link) {
  if (__navigated || !link) return
  __navigated = true
  window.location.href = link
}

function fireGoogle(onCallback) {
  var hasGtag = typeof gtag === 'function'
  var hasConv = typeof gtag_report_conversion === 'function'
  if (!hasGtag && !hasConv) return false

  try {
    if (hasConv) {
      try { gtag_report_conversion(undefined) } catch (e) {}
    }
    if (hasGtag) {
      var done = false
      gtag('event', 'contact', {
        event_callback: function () {
          if (done) return
          done = true
          onCallback()
        },
      })
    }
    return true
  }
  catch (e) {
    console.error(e)
    return false
  }
}

function fireFacebook(link) {
  if (typeof window.fbq !== 'function') return false
  var value = (typeof window.__fbPurchaseValue === 'number')
    ? window.__fbPurchaseValue
    : FB_DEFAULT_VALUE
  var currency = (typeof window.__fbPurchaseCurrency === 'string')
    ? window.__fbPurchaseCurrency
    : FB_DEFAULT_CURRENCY
  try { window.fbq('track', 'AddToCart') } catch (e) {}
  try {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency,
      content_name: link,
    })
  }
  catch (e) {}
  return true
}

function jump(link) {
  if (!link) return
  var trackerFired = false

  try {
    if (fireGoogle(function () { navigateOnce(link) })) trackerFired = true
    if (fireFacebook(link)) trackerFired = true
  }
  catch (e) {
    console.error(e)
  }

  if (!trackerFired) {
    navigateOnce(link)
    return
  }
  setTimeout(function () { navigateOnce(link) }, NAV_TIMEOUT_MS)
}

function jumpToKakao() {
  jump(typeof kakao_link !== 'undefined' ? kakao_link : null)
}

function jumpToBand() {
  jump(typeof band_link !== 'undefined' ? band_link : null)
}

function mixinJump() {
  if (typeof link !== 'undefined') jump(link)
  else if (typeof kakao_link !== 'undefined') jumpToKakao()
  else if (typeof band_link !== 'undefined') jumpToBand()
}

function onLinkBtnClick() {
  mixinJump()
}

document.addEventListener('DOMContentLoaded', function () {
  var linkBtn = document.querySelectorAll('.link-btn')
  linkBtn.forEach(function (btn) {
    btn.addEventListener('click', mixinJump)
  })
})
