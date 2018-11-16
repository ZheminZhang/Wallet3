/* 创建交易并发送到服务器 */

import Realm from 'realm';
const bitcoin = require('bitcoinjs-lib')

const lightwallet = require('eth-lightwallet');
const keystore = lightwallet.keystore;
const txutils = lightwallet.txutils;
const signing = lightwallet.signing;
const Web3 = require('web3');
var web3 = new Web3();

var prepareTx = function (UTXOs, from, to, value, feePerByte, keyPair){
  var sum = 0
  var fee = 0
  for (var i = 0; i<UTXOs.length; i++){
    sum += UTXOs[i].amount * 100000000
    if (sum > value){
      var txb = new bitcoin.TransactionBuilder()
      txb.addOutput(to, value)
      for (var j=0; j<=i; j++){
        txb.addInput(UTXOs[j].txid, UTXOs[j].vout, null, Buffer.from(UTXOs[j].scriptPubKey, 'hex'))
      }
      fee = txSize(txb, from, sum - value, keyPair) * feePerByte
      if (sum >= value + fee){
        var txNum = i+1
        return [txNum, sum, fee]
      }
    }
  }
  return []
}

var txSize = function (txb, from, change, keyPair){ //Byte
    txb.addOutput(from, change)
    console.log(txb)
    for (var i = 0; i<txb.__inputs.length; i++){
      txb.sign(i, keyPair)
    }
    return Buffer.from(txb.build().toHex(), 'hex').length
}

function transfer(args) {
  var ratio = args.pop()
  var value = args.pop()
  var to = args.pop()
  var WalletSchema = args.pop()
  var ws = args.pop()
  var password = args.pop()

  var realm = new Realm({schema: [WalletSchema]});
  var wallets = realm.objects('Wallet')
  ks = keystore.deserialize(wallets[0].keystore);
  keystore.deriveKeyFromPasswordAndSalt(password, ks.salt, function(err, pwDerivedKey) {
    var send = {}
    var from = ks.addresses[0]
    var coinType = wallets[0].type
    if (coinType == 'BTC'){
      value = parseInt(value * 100000000)
    }
    if (coinType == 'ETH'){
      value = parseInt(web3.toWei(value, 'Ether'))
    } 
    send.transfer = [from, to, value, ratio, coinType]
    ws.send(JSON.stringify(send));
    var count = 1;
    ws.onmessage = (e) => {
      // 接收到了一个消息
      if (coinType == 'BTC'){
        if (JSON.parse(e.data).err) {
          alert(JSON.parse(e.data).err);
        }
        if (JSON.parse(e.data).transactionHash) {
          alert(JSON.parse(e.data).transactionHash)
        }
        if (count > 0) {
          var response = JSON.parse(e.data);
          var UTXOs = response.UTXOs
          var rate = response.rate
          var encPrivKey = ks.encPrivKeys[from];
          var privKey = Buffer.from(keystore._decryptKey(encPrivKey, pwDerivedKey), 'hex')
          const keyPair = bitcoin.ECPair.fromPrivateKey(privKey)
          //const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
          
          var feedback = prepareTx(UTXOs, from, to, value, ratio * rate, keyPair)
          var txNum = feedback[0]
          var sum = feedback[1]
          var fee = feedback[2]
          var txb = new bitcoin.TransactionBuilder()
          txb.addOutput(to, value)
          for (var i=0; i<txNum; i++){
            txb.addInput(UTXOs[i].txid, UTXOs[i].vout, null, Buffer.from(UTXOs[i].scriptPubKey, 'hex'))
          }
          txb.addOutput(from, sum - value - fee)
          //console.log(txb)
          for (var i = 0; i<txNum; i++){
            txb.sign(i, keyPair)
          }
          //var signedValueTx = prepareTx(UTXOs, from, to, parseInt(value * 100000000), ratio * rate, keyPair)
          var signedValueTx = txb.build().toHex()
          var sendTx = {}
          sendTx.signedTx = [signedValueTx, coinType]
          count--;
          ws.send(JSON.stringify(sendTx))
          alert('Tx sent!')
        }
      }
      if (coinType == 'ETH'){
        if (JSON.parse(e.data).err) {
          alert(JSON.parse(e.data).err);
        }
        if (JSON.parse(e.data).transactionHash) {
          alert(JSON.parse(e.data).transactionHash)
        }
        if (count > 0) {
          var response = JSON.parse(e.data);
          var txOptions = {}
          txOptions.from = from
          txOptions.to = to
          txOptions.value = value;
          txOptions.gasPrice = parseInt(ratio * response.rate)
          txOptions.gasLimit = response.gasLimit
          txOptions.nonce = response.nonce
          var valueTx = txutils.valueTx(txOptions)
          var signedValueTx = signing.signTx(ks, pwDerivedKey, valueTx, from)
          var sendTx = {}
          sendTx.signedTx = [signedValueTx, coinType]
          count--;
          ws.send(JSON.stringify(sendTx))
          alert('Tx sent!')
        }
      }
    };
  })
}

module.exports = transfer;
