document.addEventListener('DOMContentLoaded', () => {
  const linkBtn = document.querySelectorAll('.link-btn')
  linkBtn.forEach((btn) => {
    btn.addEventListener('click', mixinJump)
  })
})
