// скрипты для страницы case (/case.html) */

$('.navbar a.case').addClass('active-page')

jQuery.ajax({
    url: "/",
    success: function(result) {
        var html = jQuery('<div>').html(result);

        $('#case').html(html.find("div#dashboard .card-info.case"))

    },
});
