/**
 * 跳转脚本 V2
 *
 * 与 V1 (XoONOW.js) 的差异：
 *   1. 唯一入口 onLinkBtnClick()，不再对 .link-btn 做 DOMContentLoaded 自动绑定
 *      （V1 里 XoONOW.js 与 main.js 各绑一遍，同时加载的页面事件会发两次）
 *   2. 跳转链接来自 SSI 注入的全局 const link，生产环境 SSI 有保证，不做失败容错
 *   3. 用 fetch keepalive 保证像素请求在导航后仍能送达，取代 V1 的固定延时
 *
 * V1 文件仍在线上被大量存量页面引用，本文件是独立的新实现，两者互不影响。
 */

/* global link, kakao_link, band_link */

// 仅在 keepalive 不可用时（Firefox < 133）才走驻留降级
const FB_FLUSH_MS = 350
const TT_FLUSH_MS = 500
const HARD_TIMEOUT_MS = 600

const FB_DEFAULT_VALUE = 50
const FB_DEFAULT_CURRENCY = 'USD'

// 只对这些域名改写传输方式。限定白名单有两个原因：
//   - 给页面自身的 fetch 无差别加 keepalive 会踩 64KB body 上限
//   - 避免 beaconMode 期间的懒加载图片被误拦
const TRACKER_HOST_RE = /(?:^|\.)(?:facebook\.com|facebook\.net|fbcdn\.net|tiktok\.com|ttwstatic\.com|google-analytics\.com|analytics\.google\.com|googletagmanager\.com|googleadservices\.com|doubleclick\.net|google\.com)$/i

const KEEPALIVE_OK = (function () {
  try {
    return 'keepalive' in new Request('/', { keepalive: true })
  }
  catch {
    return false
  }
})()

let navigated = false
function navigateOnce(url) {
  if (navigated || !url)
    return
  navigated = true
  window.location.href = url
}

function isTracker(url) {
  try {
    return TRACKER_HOST_RE.test(new URL(String(url), window.location.href).hostname)
  }
  catch {
    return false
  }
}

/**
 * keepalive 请求由浏览器保证在页面导航之后继续完成 —— 这是本脚本不需要延时的依据。
 * credentials 必须是 include：facebook.com/tr 依赖 _fbp / _fbc cookie 归因。
 */
function sendKeepalive(url, method, body) {
  if (!url)
    return
  try {
    fetch(url, {
      method: method || 'GET',
      body: body || undefined,
      keepalive: true,
      mode: 'no-cors',
      credentials: 'include',
    }).catch(() => {})
  }
  catch {}
}

// ───────────────────────── Transport Shim ─────────────────────────
// 点击时才安装：已实测 fbq 是调用时才查 window.Image、不缓存原生引用，
// 所以后装同样能拦到（fbevents 已加载并发过 PageView 的条件下验证通过）。
let beaconMode = false
let shimInstalled = false

function shadowImgSrc(img, nativeDesc) {
  try {
    Object.defineProperty(img, 'src', {
      configurable: true,
      get() {
        return nativeDesc && nativeDesc.get ? nativeDesc.get.call(this) : ''
      },
      set(u) {
        const url = String(u)
        // 只截跟踪像素，其余图片走原生路径，行为完全不变
        if (beaconMode && isTracker(url)) {
          sendKeepalive(url)
          return
        }
        if (nativeDesc && nativeDesc.set)
          nativeDesc.set.call(this, u)
      },
    })
  }
  catch {}
}

function installShim() {
  if (shimInstalled || !KEEPALIVE_OK)
    return
  shimInstalled = true

  let imgDesc = null
  try {
    imgDesc = Object.getOwnPropertyDescriptor(window.HTMLImageElement.prototype, 'src')
  }
  catch {}

  // 1. new Image() —— Meta Pixel 走这条（fbevents.js v2.9.384 实测）
  try {
    const NativeImage = window.Image
    const PatchedImage = function (w, h) {
      const img = new NativeImage(w, h)
      shadowImgSrc(img, imgDesc)
      return img
    }
    PatchedImage.prototype = NativeImage.prototype
    window.Image = PatchedImage
  }
  catch {}

  // 2. document.createElement('img') —— 防止像素库不走 new Image()
  try {
    const nativeCreate = document.createElement
    document.createElement = function (tag, ...rest) {
      const el = nativeCreate.call(document, tag, ...rest)
      try {
        if (String(tag).toLowerCase() === 'img')
          shadowImgSrc(el, imgDesc)
      }
      catch {}
      return el
    }
  }
  catch {}

  // 3. XMLHttpRequest
  try {
    const nativeOpen = XMLHttpRequest.prototype.open
    const nativeSend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
      this.__jumpMethod = method
      this.__jumpUrl = url
      return nativeOpen.call(this, method, url, ...rest)
    }
    XMLHttpRequest.prototype.send = function (body) {
      if (beaconMode && this.__jumpUrl && isTracker(this.__jumpUrl)) {
        sendKeepalive(this.__jumpUrl, this.__jumpMethod, body)
        return
      }
      return nativeSend.call(this, body)
    }
  }
  catch {}

  // 4. fetch —— 给跟踪请求补 keepalive
  try {
    const nativeFetch = window.fetch
    window.fetch = function (input, init) {
      try {
        const url = (input && input.url) || input
        if (beaconMode && isTracker(url)) {
          init = init || {}
          init.keepalive = true
        }
      }
      catch {}
      return nativeFetch.call(window, input, init)
    }
  }
  catch {}

  // 5. navigator.sendBeacon 本身就能在卸载后送达，原样透传，不做改写
}

/** TikTok 内部有批量队列（这正是它没有送达回调的原因），逼它走自己的卸载 flush 路径 */
function forceFlush() {
  try {
    document.dispatchEvent(new Event('visibilitychange'))
  }
  catch {}
  try {
    window.dispatchEvent(new Event('pagehide'))
  }
  catch {}
}

// ───────────────────────── 事件参数 ─────────────────────────
function getPurchaseValue() {
  // 必须是干净的数字（不能带货币符号/字母/逗号），否则 TikTok 报 "value is invalid"
  const v = Number(window.__fbPurchaseValue)
  return (Number.isFinite(v) && v > 0) ? v : FB_DEFAULT_VALUE
}

function getPurchaseCurrency() {
  const c = window.__fbPurchaseCurrency
  return (typeof c === 'string' && c.trim()) ? c : FB_DEFAULT_CURRENCY
}

// TikTok 电商事件要求非空的 content_id；可用 window.__ttContentId 覆盖，否则回退到页面路径
function getContentId() {
  const c = window.__ttContentId
  if (typeof c === 'string' && c.trim())
    return c
  try {
    return (window.location.pathname || 'lp_default').replace(/^\/+|\/+$/g, '') || 'lp_default'
  }
  catch {
    return 'lp_default'
  }
}

// ───────────────────────── 主流程 ─────────────────────────
function jump(url) {
  if (!url)
    return

  const hasGtag = typeof window.gtag === 'function'
  const hasConv = typeof window.gtag_report_conversion === 'function'
  const hasFb = typeof window.fbq === 'function'
  const hasTt = !!(window.ttq && typeof window.ttq.track === 'function')

  // 没有任何跟踪器：直接跳，不浪费时间
  if (!hasGtag && !hasConv && !hasFb && !hasTt) {
    navigateOnce(url)
    return
  }

  installShim()
  beaconMode = true

  const value = getPurchaseValue()
  const currency = getPurchaseCurrency()

  // 以下三个状态只在 keepalive 不可用的降级路径里起作用
  let pending = 0
  let minWaitDone = true
  let firing = true

  function tryNavigate() {
    if (!firing && pending <= 0 && minWaitDone)
      navigateOnce(url)
  }

  try {
    // Google Ads 转化脚本（fire-and-forget，内部通常走 sendBeacon）
    if (hasConv) {
      try { window.gtag_report_conversion(undefined) }
      catch {}
    }

    // GA4：唯一有可靠送达回调的平台
    if (hasGtag) {
      if (KEEPALIVE_OK) {
        try { window.gtag('event', 'contact', { transport_type: 'beacon' }) }
        catch {}
      }
      else {
        pending += 1
        let done = false
        const onSent = () => {
          if (done)
            return
          done = true
          pending -= 1
          tryNavigate()
        }
        try { window.gtag('event', 'contact', { transport_type: 'beacon', event_callback: onSent }) }
        catch { onSent() }
      }
    }

    // Meta Pixel：不传 eventCallback —— 官方第 4 参数只有 {eventID}，
    // V1 传的 eventCallback 不是 API，永远不会回调，白等满 800ms。
    if (hasFb) {
      try { window.fbq('track', 'Contact') }
      catch {}
      try { window.fbq('track', 'AddToCart') }
      catch {}
      try { window.fbq('track', 'Purchase', { value, currency, content_name: url }) }
      catch {}
    }

    // TikTok Pixel：无送达回调，靠 shim + forceFlush
    if (hasTt) {
      const contentId = getContentId()
      const contents = [{ content_id: contentId, content_type: 'product', content_name: url }]
      try { window.ttq.track('ClickButton', { content_id: contentId, content_type: 'product', content_name: url }) }
      catch {}
      try { window.ttq.track('AddToCart', { content_id: contentId, content_type: 'product', content_name: url, contents }) }
      catch {}
      try {
        window.ttq.track('CompletePayment', {
          value,
          currency,
          content_id: contentId,
          content_type: 'product',
          content_name: url,
          contents: [{ content_id: contentId, content_type: 'product', content_name: url, quantity: 1, price: value }],
        })
      }
      catch {}
      forceFlush()
    }
  }
  catch (error) {
    console.error(error)
  }

  // 主路径：请求已全部 keepalive 化，浏览器保证导航后完成，0ms 等待
  if (KEEPALIVE_OK) {
    navigateOnce(url)
    return
  }

  // 降级路径（Firefox < 133）：唯一需要驻留的分支
  let minWaitMs = 0
  if (hasTt)
    minWaitMs = TT_FLUSH_MS
  else if (hasFb || hasConv)
    minWaitMs = FB_FLUSH_MS

  if (minWaitMs > 0) {
    minWaitDone = false
    setTimeout(() => {
      minWaitDone = true
      tryNavigate()
    }, minWaitMs)
  }

  setTimeout(() => { navigateOnce(url) }, HARD_TIMEOUT_MS)

  // firing 哨兵：触发期间任何同步回调都不许跳。
  // V1 缺这一步，GA4 回调同步触发时会当场跳走，TikTok 事件必丢。
  firing = false
  tryNavigate()
}

// 棒群渠道的页面路径由路由参数 [t] 生成，形如 /KR/<人物>/20260321-3.0.棒群/。
// 这类页面里有些 CTA 是共用模板渲染的、没法在源码里区分渠道，按路径兜底。
function isBandRoute() {
  try {
    return /\.棒群\/?$/.test(decodeURIComponent(window.location.pathname))
  }
  catch {
    return false
  }
}

// 页面内由 SSI 注入声明：const link = '<!--#include file="link.txt" -->'
// typeof 判断只为防止未声明时的 ReferenceError，不是 SSI 失败容错
function currentLink() {
  if (isBandRoute() && typeof band_link !== 'undefined' && band_link)
    return band_link
  return typeof link !== 'undefined' ? link : ''
}

// BAND 群与 Kakao 群是两个不同的群，混合渠道的模态框和「提高质量_」渠道的
// 选项分流都要求二者可区分，所以 band 走独立的 band.txt。
// 未声明 band_link 的页面（非 KR）回退到主链接。
function currentBandLink() {
  return typeof band_link !== 'undefined' && band_link ? band_link : currentLink()
}

function currentKakaoLink() {
  return typeof kakao_link !== 'undefined' && kakao_link ? kakao_link : currentLink()
}

/**
 * 唯一入口。渠道语义由参数表达，不再用多个函数名：
 *   onLinkBtnClick()        → 主链接
 *   onLinkBtnClick('band')  → BAND 群
 *   onLinkBtnClick('kakao') → Kakao 群
 */
function onLinkBtnClick(channel) {
  if (channel === 'band')
    return jump(currentBandLink())
  if (channel === 'kakao')
    return jump(currentKakaoLink())
  return jump(currentLink())
}

if (typeof window !== 'undefined') {
  window.onLinkBtnClick = onLinkBtnClick
  window.jump = jump
  // 别名：保留渠道语义，供存量调用点与 React 组件使用
  window.mixinJump = function () { return onLinkBtnClick() }
  window.jumpToKakao = function () { return onLinkBtnClick('kakao') }
  window.jumpToBand = function () { return onLinkBtnClick('band') }
}
