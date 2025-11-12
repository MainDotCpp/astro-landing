


//モーダル
$(function(){
	
    $('.js-modal-open').each(function(){
        $(this).on('click',function(){
            var target = $(this).data('target');
            var modal = document.getElementById(target);
            $(modal).fadeIn();
			$('.video_area iframe').attr(
				'src',
				'https://www.youtube.com/embed/9S9SvnaJM60?autoplay=1&mute=1&playsinline=1&loop=1&playlist=9S9SvnaJM60'
			);
			$("body").addClass('noscroll');
            return false;
        });
    });
	
    $('.tpg .js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
		$("body").removeClass('noscroll');
		$('.video_area iframe').attr('src', '');
        return false;
    }); 

	
});