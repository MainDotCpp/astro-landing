jQuery(function ($) {
  $(document).ready(function () {
    // contact
    $(function () {
      // setTimeout(function () {
      //   $(function () {
      //     $('.step-1').addClass('is_active');
      //   });
      // }, 1000);

      $('.step__main ul li span').click(function () {
        $(this).closest('.step').next().addClass('--active');
        var element = $(this).closest('ul');
        var element2 = $(this).closest('.step').next();
        var txt = $(this).text();
        element.prev().find('span').text(txt);
        element.prev().addClass('is_active');
        element.hide();
        element.next().val(txt);
        setTimeout(function () {
          element2.addClass('is_active');
        }, 1000);
      });

      $('.step__main .custom li span').click(function () {
        var steps = ['.step-5', '.step-6', '.step-7'];
        var delay = 1000;
        steps.forEach((stepClass) => {
          setTimeout(() => {
            $(stepClass).addClass('--active');
            setTimeout(() => {
              $(stepClass).addClass('is_active');
            }, 1000);
          }, delay);
          delay += 1000;
        });
      });
    });
  });
});

window.addEventListener('DOMContentLoaded', function () {
  new Swiper('.hearing-list', {
    loop: false,
    // effect: 'fade',
    centeredSlides: false,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
    breakpoints: {
      768: {
        centeredSlides: true,
        loop: true,
      }
    }
  });
  new ScrollHint('.js-scrollable', {
    suggestiveShadow: false,
    i18n: {
      scrollable: 'スクロールできます',
    },
  });
});
