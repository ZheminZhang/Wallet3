/* 根据keystore导入钱包，并生成私钥 */

const generateKeystore = require("./src/generateKeystore.js");
const lightwallet = require("eth-lightwallet");
const keystore = lightwallet.keystore;
import keythereum from "keythereum";

import React, { Component } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";

// 导入12个助记词并输入密码
type Props = {};
export default class ImportSeedPhrase extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      keystore: "",
      password: ""
    };
  }

  static navigationOptions = {
    //标题
    title: "通过keystore导入钱包"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  setKeystore(text) {
    this.setState({ keystore: text });
  }
  setPassword(text) {
    this.setState({ password: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="keystore"
          style={styles.Phrase}
          multiline={true}
          onChangeText={text => this.setKeystore(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="请输入密码"
          style={styles.Password}
          onChangeText={text => this.setPassword(text)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Button
          title="导入钱包"
          onPress={this.onButtonPress.bind(this)}
          color="#841584"
        />
      </View>
    );
  }

  async onButtonPress() {
    //var keystore={"address":"2e56921ab73eb29c8d75bdd5e25efe920b0ac08c","crypto":{"cipher":"aes-128-ctr","ciphertext":"0b0ed130a83f1b21702bbde57101f9dfa878c37c20cce7eaaa5b9ffba408a9a2","cipherparams":{"iv":"4dfd3314ac71f8280b1fd5128148e9ae"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"6582fa5fc420cf481713ba74fcd23852ab2a8d21122227cfedf2f68409c4c1e9"},"mac":"f17244c41d989c3bac3e237f140bb9c7dce3cc1450b79a3ffe549d0d60e8689f"},"id":"2a2f1acd-2c86-4ffd-b67f-4e59812418f0","version":3}
    //keystore = JSON.parse(keystore);
    var privateKey = keythereum.recover(
      this.state.password,
      JSON.parse(this.state.keystore)
    );
    var randomSeed = keystore.generateRandomSeed();
    await generateKeystore(this.state.password, randomSeed, privateKey);
    alert("导入钱包成功！");
  }
}

const styles = StyleSheet.create({
  Phrase: {
    textAlign: "center",
    height: 200,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    margin: 3
  },
  Password: {
    textAlign: "center",
    height: 40,
    width: 200,
    borderColor: "red",
    borderWidth: 2,
    margin: 3
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
