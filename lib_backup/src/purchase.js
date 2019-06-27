/* 购买数字货币 */
import Realm from "realm";
const lightwallet = require("eth-lightwallet");
import httpRequest from "./httpRequest";
const keystore = lightwallet.keystore;

function purchase(WalletSchema) {
  var realm = new Realm({ schema: [WalletSchema] });
  var wallets = realm.objects("Wallet");
  var send = {};
  send.purchase = [wallets[0].address, wallets[0].type];
  httpRequest(send, response => {
    alert(response.message);
  });
}

module.exports = purchase;
