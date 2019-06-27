/* 通过密码和助记词生成keystore */

import Realm from "realm";
const bitcoin = require("bitcoinjs-lib");
const lightwallet = require("eth-lightwallet");
const keystore = lightwallet.keystore;
const txutils = lightwallet.txutils;
const signing = lightwallet.signing;

// 生成12个助记词并输入密码
function generateKeystore(args) {
  var privKey = args.pop();
  var seedPhrase = args.pop();
  var password = args.pop();
  var walletType = args.pop();
  var walletName = args.pop();
  var WalletSchema = args.pop();
  let realm = new Realm({ schema: [WalletSchema] });
  return new Promise(function(resolve, reject) {
    var salt = keystore.generateSalt();
    keystore.deriveKeyFromPasswordAndSalt(password, salt, async function(
      err,
      pwDerivedKey
    ) {
      var ks = new keystore();
      if (walletType == "BTC") {
        try {
          await ks.initAsync(seedPhrase, pwDerivedKey, "m/44'/0'/0'/0", salt);
        } catch (error) {
          alert(error);
          resolve("error");
        }
      }
      if (walletType == "ETH") {
        try {
          await ks.initAsync(seedPhrase, pwDerivedKey, "m/44'/60'/0'/0", salt);
        } catch (error) {
          alert(error);
          resolve("error");
        }
      }
      if (!privKey) {
        generateAddress(ks, pwDerivedKey, walletType);
        var ks_string = ks.serialize();
        realm.write(() => {
          realm.create("Wallet", {
            address: ks.addresses[0],
            name: walletName,
            type: walletType,
            keystore: ks_string,
            isSeed: "true"
          });
        });
      } else {
        importPrivKey(ks, privKey, pwDerivedKey, walletType);
        var ks_string = ks.serialize();
        realm.write(() => {
          realm.create("Wallet", {
            address: ks.addresses[0],
            name: walletName,
            type: walletType,
            keystore: ks_string,
            isSeed: "false"
          });
        });
      }
      resolve();
    });
  });
}

function generateAddress(ks, pwDerivedKey, walletType) {
  if (walletType == "BTC") {
    ks.generateNewAddress(pwDerivedKey);
    var privKey = Buffer.from(
      ks.exportPrivateKey(ks.addresses[0], pwDerivedKey),
      "hex"
    );
    delete ks.encPrivKeys[ks.addresses[0]];
    ks.addresses.pop();
    const keyPair = bitcoin.ECPair.fromPrivateKey(privKey);
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    ks.addresses.push(address);
    ks.encPrivKeys[address] = keystore._encryptKey(privKey, pwDerivedKey);
  }
  if (walletType == "ETH") {
    ks.generateNewAddress(pwDerivedKey);
  }
}

function importPrivKey(ks, privKey, pwDerivedKey, walletType) {
  if (walletType == "BTC") {
    try {
      const keyPair = bitcoin.ECPair.fromPrivateKey(privKey);
      const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    } catch (error) {
      alert(error);
      return;
    }
    ks.addresses.push(address);
    ks.encPrivKeys[address] = keystore._encryptKey(privKey, pwDerivedKey);
  }
  if (walletType == "ETH") {
    try {
      var address = keystore._computeAddressFromPrivKey(privKey);
    } catch (error) {
      alert(error);
      return;
    }
    ks.addresses.push(address);
    ks.encPrivKeys[address] = keystore._encryptKey(privKey, pwDerivedKey);
  }
}

module.exports = generateKeystore;
