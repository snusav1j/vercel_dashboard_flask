
// скрипты для страницы dashboard (/dashboard.html) */

setInterval(function() {

    $.ajax({
        url: "/wallet_info",
        type: "get",
        success: function(res) {
            get_wallet_info(res);
        }
    });

    function get_wallet_info(res){
        // данные с байбита
        wallet_res = res[1]
        deposit_res = res[0]
        total_crypto_balance = Number(wallet_res[0].walletBalance).toFixed(2)

        wallet_res = wallet_res.splice(1) // удалить первое значение (баланс кошелька) для перебора ТОЛЬКО списка монет
        coins_list = ''
        deposit_list = ''
        total_deposit_value = - 4.2183 - 15 // переводы между счетами

        // список депозитов
        for (i in deposit_res){
            deposit_amount = deposit_res[i]['amount']
            deposit_date = deposit_res[i]['timestamp']
            formatted_date = new Date(Number(deposit_date)).toLocaleString()
            date_dd_mm_yy = formatted_date.split(', ')[0]
            date_time = formatted_date.split(', ')[1]
            
            if ($('.curr-convert > input').is(':checked') == false){
                deposit_list += `<div><span class="balance-value"> +${String(Number(deposit_amount).toFixed(2))} USD</span> <span class="deposit-date"> <span>${date_dd_mm_yy}</span> <span>${date_time}</span> </span> </div>`
                $('.curr-convert > label').text('USD')
                total_deposit_value += Number(deposit_amount) 
            }else{
                deposit_list += `<div><span class="balance-value"> +${String((Number(deposit_amount) * usd).toFixed(2))} RUB</span> <span class="deposit-date"> <span>${date_dd_mm_yy}</span> <span>${date_time}</span> </span> </div>`
                $('.curr-convert > label').text('RUB')
                total_deposit_value += Number(deposit_amount) 
            }
        }
        
        // список монет
        for (i in wallet_res){
            coin_name = wallet_res[i]['coinName']
            usd_value = Number(wallet_res[i]['usdValue'])
            coin_quanity = Number(wallet_res[i]['coinQuanity']).toFixed(2)
            
            if ($('.curr-convert > input').is(':checked') == false){
                coins_list += `<div>${String(coin_quanity)} ${coin_name}: <span class="balance-value">${String(usd_value.toFixed(2))}</span> USD</div>`
                $('.curr-convert > label').text('USD')
            }else{
                coins_list += `<div>${String(coin_quanity)} ${coin_name}: <span class="balance-value">${String((usd_value * usd).toFixed(2))} RUB</span> </div>`
                $('.curr-convert > label').text('RUB')
            }
        }
        
        // переменные
        usd = 91.66 
        
        income_start_date = 1713128400000 // 15 апреля 2024г.
        total_income_per_ms = 0.00001458333 
        total_income = (((Date.now() - income_start_date) * total_income_per_ms) / usd) - total_deposit_value 
        total_wallet_balance = Number(total_crypto_balance) + total_income
        //
        increase_balance_percent = (Number(total_crypto_balance) / total_deposit_value - 1)  * 100
        total_balance_pnl = Number(total_crypto_balance) - total_deposit_value
        total_crypto_percent = Number(total_crypto_balance) / total_wallet_balance * 100
        total_case_percent = total_income / total_wallet_balance * 100
        $('.pie-chart').css("background",`conic-gradient(var(--case) 0% ${String(total_case_percent)}%, var(--crypto) ${String(total_case_percent)}% 100%)`);
        
        // засунуть полученные данные в html
        setTimeout(function() {
            $('.crypto .balance-value').attr('data-last-val', Number(total_crypto_balance).toFixed(2));
            $('.case .balance-value').attr('data-last-val', total_income.toFixed(2));
            $('.money .balance-value').attr('data-last-val', Number(total_wallet_balance).toFixed(2));
        }, 100)

        // код изменения активов в сравнении с предыдущим (упростить код)
        last_crypto_val = Number($('.crypto .balance-value').attr('data-last-val'))
        now_crypto_val = total_crypto_balance
        last_case_val = Number($('.case .balance-value').attr('data-last-val'))
        now_case_val = total_income.toFixed(2)
        last_money_val = Number($('.money .balance-value').attr('data-last-val'))
        now_money_val = total_wallet_balance

        if (last_crypto_val < now_crypto_val){
            $('.crypto .balance-info .curr-up').removeClass('hide')
            $('.crypto .balance-info .curr-down').addClass('hide')
        }else{
            $('.crypto .balance-info .curr-up').addClass('hide')
            $('.crypto .balance-info .curr-down').removeClass('hide')
        }
        if (last_money_val < now_money_val){
            $('.money .balance-info .curr-up').removeClass('hide')
            $('.money .balance-info .curr-down').addClass('hide')
        }else{
            $('.money .balance-info .curr-up').addClass('hide')
            $('.money .balance-info .curr-down').removeClass('hide')
        }
        // if (last_case_val <= now_case_val && last_case_val != now_case_val){
        //     $('.case .balance-info .curr-up').removeClass('hide')
        //     $('.case .balance-info .curr-down').addClass('hide')
        // }
        // if (last_case_val > now_case_val && last_case_val != now_case_val){
        //     $('.case .balance-info .curr-up').addClass('hide')
        //     $('.case .balance-info .curr-down').removeClass('hide')
        // }

        //  конвертировать валюту в html doc
        if ($('.curr-convert > input').is(':checked') == false){
            $('.crypto .balance-value').text(`${Number(total_crypto_balance).toFixed(2)} USD`)
            $('.case .balance-value').text(`${(total_income).toFixed(2)} USD`)
            $('.money .balance-value').text(`${Number(total_wallet_balance).toFixed(2)} USD`)
            $('.crypto-pnl').text(`${Number(total_balance_pnl).toFixed(2)} USD`)
            $('.curr-convert > label').text('USD')
        }else{
            $('.crypto .balance-value').text(`${Number(total_crypto_balance * usd).toFixed(2)} RUB`)
            $('.case .balance-value').text(`${(total_income * usd).toFixed(2)} RUB`)
            $('.money .balance-value').text(`${Number(total_wallet_balance * usd).toFixed(2)} RUB`)
            $('.crypto-pnl').text(`${Number(total_balance_pnl * usd).toFixed(2)} RUB`)
            $('.curr-convert > label').text('RUB')
        }

        if (total_balance_pnl > 0){
            $('.crypto-pnl').addClass('up')
        }else{
            $('.crypto-pnl').addClass('down')
        }

        // $('.coins-list').html(coins_list)
        $('.coins-list').html('HIDDEN')
        
        if (isFinite(increase_balance_percent) == true){
            if (increase_balance_percent > 0){
                $('.crypto-balance-increase').addClass('up')
            }else{
                $('.crypto-balance-increase').addClass('down')
            }
            $('.crypto-balance-increase').text(`${increase_balance_percent.toFixed(2)}%`)
        }else{
            $('.crypto-balance-increase').text('0.00%')
        }

        if ($('.curr-convert > input').is(':checked') == false){
            $('.total-dep').html(`(${total_deposit_value.toFixed(2)} USD)`)
            $('.case-expenses').html(`(-${total_deposit_value.toFixed(2)} USD)`)
            
        }else{
            $('.total-dep').html(`(${(total_deposit_value * usd).toFixed(2)} RUB)`)
            $('.case-expenses').html(`(-${(total_deposit_value * usd).toFixed(2)} RUB)`)
        }

        $('.deposit-list').html(deposit_list)

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
}, 3000)

