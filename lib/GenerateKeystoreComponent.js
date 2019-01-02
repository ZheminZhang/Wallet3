/* 创建钱包，生成keystore的组件 */

const generateKeystore = require("./src/generateKeystore.js");
const lightwallet = require("eth-lightwallet");
const keystore = lightwallet.keystore;
import * as Animatable from "react-native-animatable";

//import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  Icon,
  Avatar,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text
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
      loading: false
    };
  }

  static navigationOptions = {
    //标题
    headerTitle: "创建钱包"
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
              xlarge
              overlayContainerStyle={{ backgroundColor: "transparent" }}
              rounded
              icon={{ name: "account-balance-wallet", color: "black" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Wallet}>New Wallet</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp">
            <FormLabel>钱包名称</FormLabel>
            <FormInput
              placeholder="请输入钱包名称"
              onChangeText={text => this.setWalletName(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormValidationMessage>{""}</FormValidationMessage>
            <FormLabel>密码</FormLabel>
            <FormInput
              placeholder="请输入密码"
              onChangeText={text => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <FormValidationMessage>{""}</FormValidationMessage>
            <FormLabel>重复密码</FormLabel>
            <FormInput
              placeholder="请再次输入密码"
              onChangeText={text => this.setPassword2(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <FormValidationMessage>{""}</FormValidationMessage>
            <Button
              icon={{ name: this.state.loading ? "" : "done" }}
              raised
              buttonStyle={styles.buttonContainer}
              title="创建钱包"
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
      alert("您的助记词为：\n" + a + "\n请务必牢记！");
      const { navigate, goBack, state } = this.props.navigation;
      state.params.callback("回调参数");
      goBack();
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
    args.push("ETH");
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
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 50
  },
  Wallet: {
    flex: 3,
    fontSize: 34,
    paddingLeft: 5,
    color: "black",
    fontFamily: "Apple Color Emoji"
  },
  Icon: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#009900",
    fontFamily: "italic"
  }
});
