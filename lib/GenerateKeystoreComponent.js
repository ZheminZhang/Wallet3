/* 创建钱包，生成keystore的组件 */

const generateKeystore = require("./src/generateKeystore.js");
const lightwallet = require("eth-lightwallet");
const keystore = lightwallet.keystore;

//import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  Avatar,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import React, { Component } from "react";
import { StyleSheet, View, DeviceEventEmitter, ScrollView } from "react-native";

// 生成12个助记词并输入密码
type Props = {};
export default class GenerateKeystoreComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      walletName: "",
      walletType: "",
      loading: false
    };
  }

  static navigationOptions = {
    //标题
    title: "创建钱包"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  setPassword(text) {
    this.setState({ password: text });
  }
  setPassword2(text) {
    this.setState({ password2: text });
  }
  setWalletName(text) {
    this.setState({ walletName: text });
  }
  setWalletType(text) {
    this.setState({ walletType: text });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <Avatar
            overlayContainerStyle={{ backgroundColor: "black" }}
            large
            rounded
            icon={{ name: "account-balance-wallet", color: "gold" }}
            activeOpacity={0.7}
            containerStyle={{ flex: 4, marginTop: 60, marginBottom: 30 }}
          />
          <FormLabel labelStyle={styles.label}>钱包名称</FormLabel>
          <FormInput
            containerStyle={styles.inputContainer}
            inputStyle={{ textAlign: "center" }}
            placeholder="请输入钱包名称"
            onChangeText={text => this.setWalletName(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInput
            containerStyle={styles.inputContainer}
            inputStyle={{ textAlign: "center" }}
            placeholder="请输入钱包类型（BTC或者ETH）"
            onChangeText={text => this.setWalletType(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormValidationMessage>{""}</FormValidationMessage>
          <FormLabel labelStyle={styles.label}>密码</FormLabel>
          <FormInput
            containerStyle={styles.inputContainer}
            inputStyle={{ textAlign: "center" }}
            placeholder="请输入密码"
            onChangeText={text => this.setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
          <FormValidationMessage>{""}</FormValidationMessage>
          <FormLabel labelStyle={styles.label}>重复密码</FormLabel>
          <FormInput
            containerStyle={styles.inputContainer}
            inputStyle={{ textAlign: "center" }}
            placeholder="请再次输入密码"
            onChangeText={text => this.setPassword2(text)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
          <FormValidationMessage>{""}</FormValidationMessage>
          <Button
            raised
            rounded
            containerViewStyle={styles.buttonContainer}
            backgroundColor="black"
            title="创建钱包"
            disabled={this.state.loading}
            disabledStyle={{ backgroundColor: "red" }}
            loading={this.state.loading}
            onPress={this.onButtonPress.bind(this)}
          />
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    this.deEmitter = DeviceEventEmitter.addListener("left", a => {
      this.setState({ loading: false });
      alert("您的助记词为：\n" + a + "\n请务必牢记！");
    });
  }

  sleep(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, time);
    });
  }

  async onButtonPress() {
    this.setState({ loading: true });
    await this.sleep(1);
    var randomSeed = keystore.generateRandomSeed();
    var WalletSchema = this.props.navigation.state.params.WalletSchema;
    var args = [];
    args.push(WalletSchema);
    args.push(this.state.walletName);
    args.push(this.state.walletType);
    args.push(this.state.password);
    args.push(randomSeed);
    args.push(null);
    await generateKeystore(args);
    DeviceEventEmitter.emit("left", randomSeed);
  }

  componentWillUnmount() {
    this.deEmitter.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 80,
    marginRight: 80
  },
  label: {
    color: "black",
    fontSize: 18,
    fontStyle: "italic"
  },
  inputContainer: {
    height: 30,
    marginLeft: 80,
    marginRight: 80
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 45
  }
});
