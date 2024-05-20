from flask import Flask, render_template, flash, redirect, url_for, make_response, request, session
from pybit.unified_trading import HTTP
from keys import apiKey, secretKey, asd1

app = Flask(__name__)

# # # # # # # # # # # #

app.secret_key = 'secret'

@app.route('/login', methods = ["GET", "POST"])
def login():
    if request.method == 'POST':
        session['pass'] = request.form['pass']
        print(session['pass'])
        return redirect(url_for('dashboard'))
    else:
        return render_template("login.html")

@app.route('/logout', methods = ["GET", "POST"])
def unset_session():
    session.pop('pass', None)
    return redirect(url_for('login'))

@app.route('/')
def dashboard():
    if 'pass' in session:
        if session['pass'] == asd1:
            return render_template("dashboard.html")
    return redirect(url_for('login'))

@app.route('/crypto.html')
def crypto():
    if 'pass' in session:
        if session['pass'] == asd1:
            return render_template("crypto.html")
    return redirect(url_for('login'))

@app.route('/case.html')
def case():
    if 'pass' in session:
        if session['pass'] == asd1:
            return render_template("case.html")
    return redirect(url_for('login'))

@app.route('/money.html')
def money():
    if 'pass' in session:
        if session['pass'] == asd1:
            return render_template("money.html")
    return redirect(url_for('login'))

@app.route('/wallet_info', methods=["GET"])
def get_wallet_info():
    wallet_info = [[]]

    session = HTTP(
        testnet=False,
        api_key=apiKey,
        api_secret=secretKey,
    )
    result = session.get_wallet_balance(
        accountType="UNIFIED",
    )
    transfer_records_result = session.get_internal_transfer_records(
        coin="USDT",
        limit=20,
    )
    fund_deposit_info = []

    for i in transfer_records_result['result']['list']:
        if i['fromAccountType'] == 'FUND':
            fund_deposit_info.append(i)
    
    for i in range(len(result['result']['list'][0]['coin'])):
        coin_name = result['result']['list'][0]['coin'][i]['coin']
        coin_quanity = result['result']['list'][0]['coin'][i]['equity']
        usd_value = result['result']['list'][0]['coin'][i]['usdValue']
        wallet_info[0].append({'coinName': coin_name, 'coinQuanity': coin_quanity, 'usdValue': usd_value})
        
    wallet_info[0].insert(0, {'walletBalance': result['result']['list'][0]['totalEquity']})

    wallet_info.insert(-1, fund_deposit_info)
    
    return wallet_info

if __name__ == "__main__":
    app.run(debug = True)


