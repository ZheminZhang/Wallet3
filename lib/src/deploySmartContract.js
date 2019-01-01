/* 部署智能合约 */
import Realm from "realm";
const lightwallet = require("eth-lightwallet");
const keystore = lightwallet.keystore;
const txutils = lightwallet.txutils;
const signing = lightwallet.signing;
const coder = require("web3/lib/solidity/coder");
var Web3 = require("web3");
web3 = new Web3();
import httpRequest from "./httpRequest";

function deploySmartContract(
  password,
  bin,
  abi,
  args,
  contractName,
  txOptions,
  WalletSchema
) {
  var realm = new Realm({ schema: [WalletSchema] });
  var wallets = realm.objects("Wallet");
  txOptions.value = parseInt(web3.toWei(txOptions.value, "Ether"));
  txOptions.gasPrice = parseInt(web3.toWei(txOptions.gasPrice, "Gwei"));

  var ks = keystore.deserialize(wallets[0].keystore);
  var sendingAddr = ks.getAddresses()[0];
  txOptions.from = sendingAddr;
  txOptions.data = "0x" + bin;
  bytes = encodeConstructorParams(JSON.parse(abi), args);
  txOptions.data += bytes;
  keystore.deriveKeyFromPasswordAndSalt(password, ks.salt, function(
    err,
    pwDerivedKey
  ) {
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
        var contractData = txutils.createContractTx(sendingAddr, txOptions);
        //var deployContract = signing.signTx(ks, pwDerivedKey, contractData.tx, sendingAddr)
        try {
          var deployContract = signing.signTx(
            ks,
            pwDerivedKey,
            contractData.tx,
            sendingAddr
          );
        } catch (error) {
          alert(error);
          return;
        }
        sendContract = {
          deployContract: [
            deployContract,
            contractName,
            contractData.addr,
            txOptions.value,
            args
          ]
        };
        count--;
        httpRequest(sendContract, response => {
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

module.exports = deploySmartContract;
