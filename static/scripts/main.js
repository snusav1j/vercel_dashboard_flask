// скрипты для страницы dashboard (/dashboard.html) */

setInterval(function() {
    $.ajax({
        url: "/wallet_info",
        type: "get",
        success: function(res) {
            get_wallet_info(res);
        }
    });
}, 3000)

function get_wallet_info(res){
    // данные с байбита
    usd = 91.5
    total_crypto_balance = Number(res[0].walletBalance).toFixed(2)
    res = res.splice(1) // удалить первое значение (баланс кошелька) для перебора ТОЛЬКО списка монет
    coins_list = ''

    // список монет
    for (i in res){
        coin_name = res[i]['coinName']
        usd_value = Number(res[i]['usdValue'])
        coin_quanity = Number(res[i]['coinQuanity']).toFixed(2)
        
        if ($('.curr-convert > input').is(':checked') == false){
            coins_list += `<span>${String(coin_quanity)} ${coin_name}: <span class="balance-value">$${String(usd_value.toFixed(2))}</span> </span>`
            $('.curr-convert > label').text('USD')
        }else{
            coins_list += `<span>${String(coin_quanity)} ${coin_name}: <span class="balance-value">RUB ${String((usd_value * usd).toFixed(2))}</span> </span>`
            $('.curr-convert > label').text('RUB')
        }
    }
    // диаграма в дэше
    total_case_balance = Math.floor(Math.random() * 10) + 10 // test value 
    total_wallet_balance = Number(total_crypto_balance) + total_case_balance
    //
    total_crypto_percent = Number(total_crypto_balance) / total_wallet_balance * 100
    total_case_percent = total_case_balance / total_wallet_balance * 100
    $('.pie-chart').css("background",`conic-gradient(var(--crypto) 0% ${String(total_crypto_percent)}%, var(--case) ${String(total_crypto_percent)}% 100%)`);
    
    // засунуть полученные данные в html
    setTimeout(function() {
        $('.crypto .balance-value').attr('data-last-val', Number(total_crypto_balance).toFixed(2));
        $('.case .balance-value').attr('data-last-val', Number(total_case_balance).toFixed(2));
        $('.money .balance-value').attr('data-last-val', Number(total_wallet_balance).toFixed(2));
    }, 100)

    // код изменения активов в сравнении с предыдущим (упростить код)
    last_crypto_val = Number($('.crypto .balance-value').attr('data-last-val'))
    now_crypto_val = total_crypto_balance
    last_case_val = Number($('.case .balance-value').attr('data-last-val'))
    now_case_val = total_case_balance
    last_money_val = Number($('.money .balance-value').attr('data-last-val'))
    now_money_val = total_wallet_balance

    if (last_crypto_val < now_crypto_val){
        $('.crypto .balance-info .curr-up').removeClass('hide')
        $('.crypto .balance-info .curr-down').addClass('hide')
    }else{
        $('.crypto .balance-info .curr-up').addClass('hide')
        $('.crypto .balance-info .curr-down').removeClass('hide')
    }
    if (last_case_val < now_case_val){
        $('.case .balance-info .curr-up').removeClass('hide')
        $('.case .balance-info .curr-down').addClass('hide')
    }else{
        $('.case .balance-info .curr-up').addClass('hide')
        $('.case .balance-info .curr-down').removeClass('hide')
    }
    if (last_money_val < now_money_val){
        $('.money .balance-info .curr-up').removeClass('hide')
        $('.money .balance-info .curr-down').addClass('hide')
    }else{
        $('.money .balance-info .curr-up').addClass('hide')
        $('.money .balance-info .curr-down').removeClass('hide')
    }

    //  конвертировать валюту
    if ($('.curr-convert > input').is(':checked') == false){
        $('.crypto .balance-value').text(`$${Number(total_crypto_balance).toFixed(2)}`)
        $('.case .balance-value').text(`$${Number(total_case_balance).toFixed(2)}`)
        $('.money .balance-value').text(`$${Number(total_wallet_balance).toFixed(2)}`)
        $('.curr-convert > label').text('USD')
    }else{
        $('.case .balance-value').text(`RUB ${Number(total_case_balance * usd).toFixed(2)}`)
        $('.crypto .balance-value').text(`RUB ${Number(total_crypto_balance * usd).toFixed(2)}`)
        $('.money .balance-value').text(`RUB ${Number(total_wallet_balance * usd).toFixed(2)}`)
        $('.curr-convert > label').text('RUB')
    }
    $('.coins-list').html(coins_list)
    
    // загрузочный экран чтобы прогрузился запрос
    $('.spinner').addClass('hide-loader')
    setInterval(function() {
        $('.loader').addClass('hide-loader')
        $('.container-fluid').removeClass('hide')
    }, 500)
    setInterval(function() {
        $('.loader').remove()
    }, 1000)
};
