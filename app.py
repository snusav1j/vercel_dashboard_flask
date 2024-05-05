from flask import Flask, render_template
from pybit.unified_trading import HTTP
from keys import apiKey, secretKey

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

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
        wallet_info.append({'coinName': result['result']['list'][0]['coin'][i]['coin'], 'coinQuanity': result['result']['list'][0]['coin'][i]['equity'], 'usdValue': result['result']['list'][0]['coin'][i]['usdValue']})
        
    wallet_info.insert(0, {'walletBalance': result['result']['list'][0]['totalEquity']})
    return wallet_info

if __name__ == "__main__":
    # app.run(debug = True)
    app.run(debug = True)
