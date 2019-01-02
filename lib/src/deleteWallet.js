/* 创建交易并发送到服务器 */

import Realm from "realm";
const bitcoin = require("bitcoinjs-lib");

const lightwallet = require("eth-lightwallet");
const keystore = lightwallet.keystore;

function deleteWallet(args) {
  var WalletSchema = args.pop();
  var password = args.pop();

  var realm = new Realm({ schema: [WalletSchema] });
  var wallets = realm.objects("Wallet");
  ks = keystore.deserialize(wallets[0].keystore);
  return new Promise(function(resolve, reject) {
    keystore.deriveKeyFromPasswordAndSalt(password, ks.salt, function(
      err,
      pwDerivedKey
    ) {
      try {
        ks.exportPrivateKey(ks.addresses[0], pwDerivedKey);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}

module.exports = deleteWallet;
