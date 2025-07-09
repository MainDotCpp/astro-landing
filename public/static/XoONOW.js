document.addEventListener('DOMContentLoaded', () => {
  const linkBtn = document.querySelectorAll('.link-btn')
  linkBtn.forEach((btn) => {
    btn.addEventListener('click', onLinkBtnClick)
  })
})

function onLinkBtnClick() {
  if (typeof gtag_report_conversion === 'function') { gtag_report_conversion(link) }
  else { window.location.href = link }
}
