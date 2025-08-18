// sticky header js
window.addEventListener('scroll', function() {
    var header = document.querySelector('body');
    if (window.scrollY > 0) {
      header.classList.add('active-header');
    } else {
      header.classList.remove('active-header');
    }
  });





   jQuery(function() {

    jQuery('.countdown.callback').countdown({
      
                date: +(new Date) + 86400000+1500000+36000+14400000,
      
                render: function(data) {
      
                  jQuery(this.el).html("<div>" + this.leadingZeros(data.days, 2) + "<span>Days</span></div><p>:</p><div>" + this.leadingZeros(data.hours, 2) + "<span>Hours</span></div><p>:</p><div>" + this.leadingZeros(data.min, 2) + "<span>Minutes</span></div><p>:</p><div>" + this.leadingZeros(data.sec, 2) + " <span>Seconds</span></div>");},onEnd: function() {
      
                    jQuery(this.el).addClass('ended');
      
                }
      
              });
      
            });

    // timer 


   jQuery("#stock-search").submit(function(event) { 
        var phone = jQuery('#symbol').val();
        if(phone=='' || phone=='Enter Symbol'){ 
            alert('Please enter symbol');
            event.preventDefault();
            return false;
        }
    });





// counting
  var a = 0;
                jQuery(window).scroll(function() {

                  var oTop = jQuery('#counters-nm').offset().top - window.innerHeight;
                  if (a == 0 && jQuery(window).scrollTop() > oTop) {
                    jQuery('.counter-value').each(function() {
                      var $this = jQuery(this),
                        countTo = $this.attr('data-count');
                      jQuery({
                        countNum: $this.text()
                      }).animate({
                          countNum: countTo
                        },

                        {

                          duration: 2500,
                          easing: 'swing',
                          step: function() {
                            $this.text(Math.floor(this.countNum));
                          },
                          complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                          }

                        });
                    });
                    a = 1;
                  }

                });
                