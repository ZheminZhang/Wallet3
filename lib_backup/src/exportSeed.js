/* 创建交易并发送到服务器 */

import Realm from "realm";
const bitcoin = require("bitcoinjs-lib");

const lightwallet = require("eth-lightwallet");
const keystore = lightwallet.keystore;

function exportSeed(args) {
  var WalletSchema = args.pop();
  var password = args.pop();

  var realm = new Realm({ schema: [WalletSchema] });
  var wallets = realm.objects("Wallet");
  ks = keystore.deserialize(wallets[0].keystore);
  return new Promise(function(resolve, reject) {
    if (wallets[0].isSeed === "true") {
      keystore.deriveKeyFromPasswordAndSalt(password, ks.salt, function(
        err,
        pwDerivedKey
      ) {
        try {
          var seed = ks.getSeed(pwDerivedKey);
          resolve(seed);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      reject("钱包由私钥导入，没有对应的助记词！");
    }
  });
}

module.exports = exportSeed;
