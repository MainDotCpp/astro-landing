function jump() {
  if (typeof gtag_report_conversion === 'function') {
    gtag_report_conversion(link)
  }
  else {
    window.location.href = link
  }
}

export { jump }
