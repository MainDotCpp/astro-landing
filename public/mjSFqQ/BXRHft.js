document.addEventListener('DOMContentLoaded', () => {
  $('.link-btn').on('click', () => {
    if (typeof gtag_report_conversion === 'function') {
      gtag_report_conversion(link)
    }
    else {
      window.location.href = link
    }
  })
})
