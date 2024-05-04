setInterval(function() {

    $.ajax({
        url: "/wallet_info",
        type: "get",
        success: function(res) {
            getResponse(res);
        }
    });
    function getResponse(res){
        // данные с байбита
        total_crypto_balance = Number(res[0].walletBalance).toFixed(2)
        coins_list = ''
        res = res.splice(1)
        for (i in res){
            coin_name = res[i]['coinName']
            usd_value = res[i]['usdValue']
            coin_quanity = res[i]['coinQuanity']
            coins_list += `<span>${String(Number(coin_quanity).toFixed(2))} ${coin_name}: $<span class="balance-value">${String(Number(usd_value).toFixed(2))}</span> </span>`
        }
        // диашрама в дэше
        total_case_balance = Math.floor(Math.random() * 10) + 10
        total_wallet_balance = Number(total_crypto_balance) + total_case_balance
        //
        total_crypto_percent = Number(total_crypto_balance) / total_wallet_balance * 100
        total_case_percent = total_case_balance / total_wallet_balance * 100
        $('.pie-chart').css("background",`conic-gradient(var(--case) 0% ${String(total_crypto_percent)}%, var(--crypto) ${String(total_crypto_percent)}% 100%)`);
        
        

        // поместить в html
        $('.case .balance-value').text(`$${Number(total_case_balance).toFixed(2)}`) // test value 
        $('.crypto .balance-value').text(`$${Number(total_crypto_balance).toFixed(2)}`)
        $('.money .balance-value').text(`$${Number(total_wallet_balance).toFixed(2)}`)
        
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
}, 1000)
