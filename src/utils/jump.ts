// @ts-nocheck
function jump(link: string | undefined) {
  try {
    gtag_report_conversion()
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
