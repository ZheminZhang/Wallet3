/* 调用智能合约 */
import Realm from "realm";
const lightwallet = require("eth-lightwallet");
const keystore = lightwallet.keystore;
const txutils = lightwallet.txutils;
const signing = lightwallet.signing;
const encryption = lightwallet.encryption;
const coder = require("web3/lib/solidity/coder");
import httpRequest from "./httpRequest";
var Web3 = require("web3");
web3 = new Web3();

function callSmartContract(
  password,
  abi,
  functionName,
  args,
  txOptions,
  contractAddress,
  WalletSchema
) {
  var realm = new Realm({ schema: [WalletSchema] });
  var wallets = realm.objects("Wallet");
  txOptions.value = parseInt(web3.toWei(txOptions.value, "Ether"));
  txOptions.gasPrice = parseInt(web3.toWei(txOptions.gasPrice, "Gwei"));
  var types = txutils._getTypesFromAbi(JSON.parse(abi), functionName);
  var txData = txutils._encodeFunctionTxData(functionName, types, args);
  txOptions.data = txData;
  var ks = keystore.deserialize(wallets[0].keystore);
  var sendingAddr = ks.getAddresses()[0];
  txOptions.from = sendingAddr;
  keystore.deriveKeyFromPasswordAndSalt(password, ks.salt, function(
    err,
    pwDerivedKey
  ) {
    txOptions.to = contractAddress;
    send = { gasLimitAndNonce: [txOptions, sendingAddr] };
    httpRequest(send, response => {
      var count = 1;

      if (response.err) {
        alert(response.err);
      }
      if (response.transactionHash) {
        alert(response.transactionHash);
      }
      if (count > 0) {
        txOptions.gasLimit = 2 * response.gasLimit;
        txOptions.nonce = response.nonce;
        var functionTx = txutils.functionTx(
          JSON.parse(abi),
          functionName,
          args,
          txOptions
        );
        try {
          var signedTx = signing.signTx(
            ks,
            pwDerivedKey,
            functionTx,
            sendingAddr
          );
        } catch (error) {
          alert(error);
          return;
        }
        sendTx = { signedTx: [signedTx, wallets[0].type] };
        count--;
        httpRequest(sendTx, response => {
          alert(response.message);
        });
      }
    });
  });
}

var encodeConstructorParams = function(abi, params) {
  return (
    abi
      .filter(function(json) {
        return (
          json.type === "constructor" && json.inputs.length === params.length
        );
      })
      .map(function(json) {
        return json.inputs.map(function(input) {
          return input.type;
        });
      })
      .map(function(types) {
        return coder.encodeParams(types, params);
      })[0] || ""
  );
};

module.exports = callSmartContract;
