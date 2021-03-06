/* 根据私钥导入钱包，并生成私钥 */

const generateKeystore = require("./src/generateKeystore.js");
const lightwallet = require("eth-lightwallet");
const keystore = lightwallet.keystore;
const Buffer = require("safe-buffer").Buffer;
import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  DeviceEventEmitter
} from "react-native";
import { Button, Icon, Avatar, Input, Text } from "react-native-elements";

// 导入私钥并输入密码
type Props = {};
export default class ImportSeedPhrase extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      keystore: "",
      privateKey: "",
      password: "",
      password2: "",
      walletName: "",
      loading: false
    };
  }

  static navigationOptions = {
    //标题
    headerTitle: "通过私钥导入钱包"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  setPrivateKey(text) {
    this.setState({ privateKey: text });
  }
  setPassword(text) {
    this.setState({ password: text });
  }
  setPassword2(text) {
    this.setState({ password2: text });
  }
  setWalletName(text) {
    this.setState({ walletName: text });
  }
  setPassword2(text) {
    this.setState({ password2: text });
  }
  setWalletName(text) {
    this.setState({ walletName: text });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <Animatable.View
            animation="fadeInDown"
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Avatar
              size="xlarge"
              overlayContainerStyle={{ backgroundColor: "transparent" }}
              rounded
              icon={{ name: "vpn-key", color: "gold" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Text}>Private Key</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp">
            <Input
              label="私钥"
              multiline={true}
              placeholder="请输入私钥"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              inputStyle={{ paddingRight: 75 }}
              onChangeText={text => this.setPrivateKey(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="钱包名称"
              placeholder="请输入钱包名称"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              onChangeText={text => this.setWalletName(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="密码"
              placeholder="请输入密码"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              onChangeText={text => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <Input
              label="重复密码"
              placeholder="请再次输入密码"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              onChangeText={text => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <Button
              icon={{
                name: this.state.loading ? "" : "subdirectory-arrow-left"
              }}
              type="outline"
              buttonStyle={styles.buttonContainer}
              title="导入钱包"
              disabled={this.state.loading}
              disabledStyle={{ backgroundColor: "grey" }}
              loading={this.state.loading}
              onPress={this.onButtonPress.bind(this)}
            />
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    this.deEmitter = DeviceEventEmitter.addListener("left", a => {
      this.setState({ loading: false });
      alert(a);
      const { navigate, goBack, state } = this.props.navigation;
      state.params.callback("回调参数");
      goBack();
    });
  }

  async onButtonPress() {
    //var keystore={"address":"2e56921ab73eb29c8d75bdd5e25efe920b0ac08c","crypto":{"cipher":"aes-128-ctr","ciphertext":"0b0ed130a83f1b21702bbde57101f9dfa878c37c20cce7eaaa5b9ffba408a9a2","cipherparams":{"iv":"4dfd3314ac71f8280b1fd5128148e9ae"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"6582fa5fc420cf481713ba74fcd23852ab2a8d21122227cfedf2f68409c4c1e9"},"mac":"f17244c41d989c3bac3e237f140bb9c7dce3cc1450b79a3ffe549d0d60e8689f"},"id":"2a2f1acd-2c86-4ffd-b67f-4e59812418f0","version":3}
    //keystore = JSON.parse(keystore);
    //var privateKey = keythereum.recover(this.state.password, JSON.parse(this.state.keystore));
    var randomSeed = keystore.generateRandomSeed();
    var WalletSchema = this.props.navigation.state.params.WalletSchema;
    var args = [];
    args.push(WalletSchema);
    args.push(this.state.walletName);
    args.push("ETH");
    args.push(this.state.password);
    args.push(randomSeed);
    args.push(this.state.privateKey);
    if (
      this.state.privateKey.length !== 64 ||
      Buffer.from(this.state.privateKey, "hex").length !== 32
    ) {
      this.setState({ loading: false });
      alert("Invalid private key! ");
      return;
    }
    await generateKeystore(args);
    DeviceEventEmitter.emit("left", "导入钱包成功！");
    //await generateKeystore(WalletSchema, this.state.walletName, "ETH", this.state.password, randomSeed, this.state.privateKey);
    //alert('导入钱包成功！')
  }

  componentWillUnmount() {
    this.deEmitter.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 50
  },
  Text: {
    flex: 3,
    fontSize: 34,
    paddingLeft: 5,
    color: "gold",
    fontFamily: "Apple Color Emoji"
  },
  buttonContainer: {
    flex: 1,
    fontFamily: "italic",
    marginTop: 50
  }
});
