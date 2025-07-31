function jump() {
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

export { jump }
