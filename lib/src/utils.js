var WalletSchema = {
  name: "Wallet",
  primaryKey: "address",
  properties: {
    address: "string",
    name: "string",
    type: "string",
    keystore: "string", //添加默认值的写法
    isSeed: "string"
  }
};

module.exports.WalletSchema = WalletSchema;
