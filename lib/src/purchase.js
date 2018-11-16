/* 购买数字货币 */
import Realm from 'realm';
const lightwallet = require('eth-lightwallet');
const keystore = lightwallet.keystore;

function purchase(ws, WalletSchema) {
  var realm = new Realm({schema: [WalletSchema]});
  var wallets = realm.objects('Wallet')
  var send = {}
  send.purchase = [wallets[0].address, wallets[0].type];
  ws.send(JSON.stringify(send));
}

module.exports = purchase;