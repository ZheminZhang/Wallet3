/* 通过密码和助记词生成keystore */

import Realm from 'realm';
const bitcoin = require('bitcoinjs-lib')
const lightwallet = require('eth-lightwallet');
const keystore = lightwallet.keystore;
const txutils = lightwallet.txutils;
const signing = lightwallet.signing;

// 生成12个助记词并输入密码
function generateKeystore(args) {
  var privKey = args.pop()
  var seedPhrase = args.pop()
  var password = args.pop()
  var walletType = args.pop()
  var walletName = args.pop()
  var WalletSchema = args.pop()
  let realm = new Realm({schema: [WalletSchema]});
  return new Promise(function(resolve, reject) {
    var salt = keystore.generateSalt();
    keystore.deriveKeyFromPasswordAndSalt(password, salt, async function(err, pwDerivedKey) {
        var ks = new keystore();
        if (walletType == 'BTC'){
          await ks.initAsync(seedPhrase, pwDerivedKey, "m/44'/0'/0'/0", salt);
        }
        if (walletType == 'ETH'){
          await ks.initAsync(seedPhrase, pwDerivedKey, "m/44'/60'/0'/0", salt);
        }
        //ks.init(seedPhrase, pwDerivedKey, "m/0'/0'/0'", salt);
        if (!privKey) {
          generateAddress(ks, pwDerivedKey, walletType); 
        } else {
          importPrivKey(ks, privKey, pwDerivedKey, walletType);
        }
        var ks_string = ks.serialize();
        realm.write(()=> {
          realm.create('Wallet', {address: ks.addresses[0], name: walletName, type: walletType, keystore: ks_string});
        })
        resolve();
      }
    );
  })
}

function generateAddress(ks, pwDerivedKey, walletType){
  //alert("generateNewAddress start")
  if (walletType == 'BTC'){
    ks.generateNewAddress(pwDerivedKey)
    var privKey = Buffer.from(ks.exportPrivateKey(ks.addresses[0], pwDerivedKey), 'hex')
    delete ks.encPrivKeys[ks.addresses[0]]
    ks.addresses.pop()
    const keyPair = bitcoin.ECPair.fromPrivateKey(privKey)
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    ks.addresses.push(address)
    ks.encPrivKeys[address] = keystore._encryptKey(privKey, pwDerivedKey)
  }
  if (walletType == 'ETH'){
    ks.generateNewAddress(pwDerivedKey)
  }
  //alert("generateNewAddress finish")
}

function importPrivKey(ks, privKey, pwDerivedKey, walletType) {
  if (walletType =='BTC'){
    const keyPair = bitcoin.ECPair.fromPrivateKey(privKey)
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    ks.addresses.push(address)
    ks.encPrivKeys[address] = keystore._encryptKey(privKey, pwDerivedKey)
  }
  if (walletType == 'ETH'){
    var address = keystore._computeAddressFromPrivKey(privKey);
    ks.addresses.push(address);
    ks.encPrivKeys[address] = keystore._encryptKey(privKey, pwDerivedKey)
  }
}

module.exports = generateKeystore;
