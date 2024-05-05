setInterval(function() {
    $.ajax({
        url: "/wallet_info",
        type: "get",
        success: function(res) {
            get_wallet_info(res);
        }
    });
}, 2000)

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
            coins_list += `<span>${String(coin_quanity)} ${coin_name}: <span class="balance-value">${String((usd_value * usd).toFixed(2))} RUB</span> </span>`
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
    if ($('.curr-convert > input').is(':checked') == false){
        $('.case .balance-value').text(`$${Number(total_case_balance).toFixed(2)}`) 
        $('.crypto .balance-value').text(`$${Number(total_crypto_balance).toFixed(2)}`)
        $('.money .balance-value').text(`$${Number(total_wallet_balance).toFixed(2)}`)
        $('.curr-convert > label').text('USD')
    }else{
        $('.case .balance-value').text(`${Number(total_case_balance * usd).toFixed(2)} RUB`)
        $('.crypto .balance-value').text(`${Number(total_crypto_balance * usd).toFixed(2)} RUB`)
        $('.money .balance-value').text(`${Number(total_wallet_balance * usd).toFixed(2)} RUB`)
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

