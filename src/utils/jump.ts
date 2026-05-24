// @ts-nocheck
function jump(link) {
  try {
    if (typeof gtag_report_conversion !== 'undefined') {
      gtag_report_conversion(link)
    }

    if (typeof gtag !== 'undefined') {
      gtag('event', 'contact', {})
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    setTimeout(() => {
      window.location.href = link
    }, 100)
  }
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
