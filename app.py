from flask import Flask, render_template
from pybit.unified_trading import HTTP
from keys import apiKey, secretKey

app = Flask(__name__)

@app.route('/')
def dashboard():
    return render_template("dashboard.html")
@app.route('/crypto.html')
def crypto():
    return render_template("crypto.html")
@app.route('/case.html')
def case():
    return render_template("case.html")
@app.route('/money.html')
def money():
    return render_template("money.html")

@app.route('/wallet_info', methods=["GET"])
def get_wallet_info():
    session = HTTP(
        testnet=False,
        api_key=apiKey,
        api_secret=secretKey,
    )
    result = session.get_wallet_balance(
        accountType="UNIFIED",
    )

    wallet_info = []
    for i in range(len(result['result']['list'][0]['coin'])):
        coin_name = result['result']['list'][0]['coin'][i]['coin']
        coin_quanity = result['result']['list'][0]['coin'][i]['equity']
        usd_value = result['result']['list'][0]['coin'][i]['usdValue']
        wallet_info.append({'coinName': coin_name, 'coinQuanity': coin_quanity, 'usdValue': usd_value})
        
    wallet_info.insert(0, {'walletBalance': result['result']['list'][0]['totalEquity']})
    return wallet_info

if __name__ == "__main__":
    # app.run(debug = True)
    app.run(debug = True)
