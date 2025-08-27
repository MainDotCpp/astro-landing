document.addEventListener('DOMContentLoaded', () => {
  const whatsappButtons = document.querySelectorAll('.cta-btn[href*=\'wa.me\']')
  whatsappButtons.forEach((btn) => {
    btn.setAttribute('href', link)
    btn.setAttribute('target', '_blank')
  })

  const resultBtn = document.querySelector('#resultModal .cta-btn')
  if (resultBtn) {
    resultBtn.setAttribute('href', link)
    resultBtn.setAttribute('target', '_blank')
  }

  const modalBtn = document.querySelector('#whatsappModal .cta-btn')
  if (modalBtn) {
    modalBtn.setAttribute('href', link)
    modalBtn.setAttribute('target', '_blank')
  }
})
document.addEventListener('DOMContentLoaded', () => {
  const countEl = document.getElementById('online-count')
  let onlineCount = 143

  function updateCount() {
    const change = Math.floor(Math.random() * 11) - 5 // -5 ~ +5
    onlineCount = Math.max(130, Math.min(170, onlineCount + change))
    countEl.textContent = onlineCount
  }

  setInterval(updateCount, 5000)
})
