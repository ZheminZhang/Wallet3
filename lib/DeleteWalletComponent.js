/* 删除钱包 */

const deleteWallet = require("./src/deleteWallet");

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, DeviceEventEmitter } from "react-native";
import {
  Button,
  Icon,
  Avatar,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text
} from "react-native-elements";
import * as Animatable from "react-native-animatable";

// 将交易信息发送到服务器
type Props = {};
export default class ExportPrivateKey extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }
  setPassword(text) {
    this.setState({ password: text });
  }
  static navigationOptions = {
    //标题
    headerTitle: "删除钱包"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <Animatable.View
            animation="fadeInDown"
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Avatar
              xlarge
              overlayContainerStyle={{ backgroundColor: "transparent" }}
              rounded
              icon={{ name: "delete-forever", color: "red" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Text}>Delete Wallet</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp">
            <FormLabel>密码</FormLabel>
            <FormInput
              placeholder="请输入密码"
              onChangeText={text => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <FormValidationMessage>{""}</FormValidationMessage>
            <Button
              icon={{ name: "delete" }}
              raised
              buttonStyle={styles.buttonContainer}
              title="删除钱包"
              onPress={this.onButtonPress.bind(this)}
            />
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    this.deEmitter = DeviceEventEmitter.addListener("left", a => {
      alert("删除成功！");
      const { navigate, goBack, state } = this.props.navigation;
      state.params.callback("回调参数");
      goBack();
    });
  }

  async onButtonPress() {
    var args = [];
    args.push(this.state.password);
    args.push(this.props.navigation.state.params.WalletSchema);
    await deleteWallet(args)
      .then(() => {
        var realm = new Realm({ schema: [WalletSchema] });
        realm.write(() => {
          var wallets = realm.objects("Wallet");
          realm.delete(wallets);
          DeviceEventEmitter.emit("left");
        });
      })
      .catch(error => alert(error));
  }

  componentWillUnmount() {
    this.deEmitter.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50
  },
  Text: {
    flex: 3,
    fontSize: 30,
    paddingLeft: 5,
    color: "red",
    fontFamily: "Apple Color Emoji"
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "red",
    fontFamily: "italic",
    marginTop: 50
  },
  Icon: {
    flex: 1
  }
});
