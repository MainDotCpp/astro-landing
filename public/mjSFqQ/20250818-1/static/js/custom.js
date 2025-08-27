// sticky header js
window.addEventListener('scroll', () => {
  let header = document.querySelector('body')
  if (window.scrollY > 0) {
    header.classList.add('active-header')
  }
  else {
    header.classList.remove('active-header')
  }
})

jQuery(() => {
  jQuery('.countdown.callback').countdown({

    date: +(new Date()) + 86400000 + 1500000 + 36000 + 14400000,

    render(data) {
      jQuery(this.el).html(`<div>${this.leadingZeros(data.days, 2)}<span>Days</span></div><p>:</p><div>${this.leadingZeros(data.hours, 2)}<span>Hours</span></div><p>:</p><div>${this.leadingZeros(data.min, 2)}<span>Minutes</span></div><p>:</p><div>${this.leadingZeros(data.sec, 2)} <span>Seconds</span></div>`)
    },
    onEnd() {
      jQuery(this.el).addClass('ended')
    },

  })
})

// timer

jQuery('#stock-search').submit((event) => {
  let phone = jQuery('#symbol').val()
  if (phone == '' || phone == 'Enter Symbol') {
    alert('Please enter symbol')
    event.preventDefault()
    return false
  }
})

// counting
let a = 0
jQuery(window).scroll(() => {
  let oTop = jQuery('#counters-nm').offset().top - window.innerHeight
  if (a == 0 && jQuery(window).scrollTop() > oTop) {
    jQuery('.counter-value').each(function () {
      let $this = jQuery(this)
      let countTo = $this.attr('data-count')
      jQuery({
        countNum: $this.text(),
      }).animate({
        countNum: countTo,
      }, {

        duration: 2500,
        easing: 'swing',
        step() {
          $this.text(Math.floor(this.countNum))
        },
        complete() {
          $this.text(this.countNum)
          // alert('finished');
        },

      })
    })
    a = 1
  }
})
