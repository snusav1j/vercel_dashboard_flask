// скрипты для страницы crypto (/crypto.html) */

/* подсветить кнопку навигации */
$('.navbar a.crypto').addClass('active-page')

jQuery.ajax({
    url: "/",
    success: function(result) {
        var html = jQuery('<div>').html(result);

        $('#crypto').prepend(html.find("div#dashboard .card-info.crypto"))

    }
});
