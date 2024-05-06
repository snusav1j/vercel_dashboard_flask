// скрипты для страницы money (/money.html) */

/* подсветить кнопку навигации */
$('.navbar a.money').addClass('active-page')

jQuery.ajax({
    url: "/",
    success: function(result) {
        var html = jQuery('<div>').html(result);

        $('#money').prepend(html.find("div#dashboard .card-info.money"))

    }
});
