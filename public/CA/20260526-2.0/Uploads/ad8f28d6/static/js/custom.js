function empty(val) {
    if (val == undefined || val == NaN || val == null || val == '') {
        return true;
    } else {
        return false;
    }
}

$(function() {
    // FeedbackForm
    $('#FeedbackForm form').on('submit', function(e) {
        formResult = $('#feedback-result');
        e.preventDefault();
        var form = this;
        form['sessid'].value = '';
        form['WEB_FORM_TYPE'].value = 'N';
        $.getJSON('/ajax/feedback.php', $(form).serialize(), function(data) {
            if (data.result == 'success') {
                $('#feedback-name, #feedback-e-mail, #feedback-version, #feedback-message').val('');
            }
            formResult.html(data.message);
        });
        return false;
    });

    // DownloadForm
    $('#DownloadForm form').on('submit', function(e) {
        formResult = $('#download-result');
        e.preventDefault();
        var form = this;
        $('.submit-custom').find('input').attr('disabled', 'disabled');
        form['sessid'].value = '';
        form['WEB_FORM_TYPE'].value = 'N';
        $.getJSON('/ajax/download.php', $(form).serialize(), function(data) {
            $('.submit-custom').find('input').removeAttr('disabled');

            if (data.result == 'success') {
				if(window.location.pathname == "/download/" || window.location.pathname == "/net/download/"){
					window.location.href=window.location.pathname + "ok/";
				}else{
                	$('#DownloadFormWrapper').html(data.message);
				}
            } else {
                formResult.html(data.message);
            }
        });
        return false;
    });

    $('.validate-form input').on('change input', function() {
        let valid = false;
        let $btn = $('.validate-form').find('[type="submit"]');
        let name = $('.validate-form').find('.name-validator').val();
        let email = $('.validate-form').find('.email-validator').val();
        let checkbox = $('.validate-form').find('.checkbox-validator').prop('checked');
        if (!empty(name) && !empty(email) && checkbox) {
            valid = true;
        }

        $btn.attr('disabled', !valid);
    });


    //scrollto
    window.scrollTo = function(el) {
        event.preventDefault();

        var ths = $(el);
        var target;
        var shift = +ths.data('scroll-shift');

        target = ($(ths.attr('href') || ths.data('target')).offset().top) + (shift ? shift : 0) - $('header.main').outerHeight();
        $('html, body').stop().animate({ scrollTop: target }, 1000, "easeOutCubic");
    };
});