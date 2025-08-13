// @ts-nocheck
function jump(link: string | undefined) {
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

function mixinJump() {
  if (typeof link !== 'undefined') {
    jump(link)
  }
  else if (typeof kakao_link !== 'undefined') {
    jumpToKakao()
  }
  else if (typeof band_link !== 'undefined') {
    jumpToBand()
  }
}

export { jump, jumpToBand, jumpToKakao, mixinJump }
