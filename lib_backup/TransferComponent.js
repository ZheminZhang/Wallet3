/* 用户之间转账 */

const transfer = require("./src/transfer");

import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { Platform, StyleSheet, View, ScrollView } from "react-native";
import { Button, Icon, Avatar, Input, Text } from "react-native-elements";

// 将交易信息发送到服务器
type Props = {};
export default class Transfer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      to: "",
      value: "",
      ratio: ""
    };
  }
  setPassword(text) {
    this.setState({ password: text });
  }
  setTo(text) {
    this.setState({ to: text });
  }
  setValue(text) {
    this.setState({ value: text });
  }
  setRatio(text) {
    this.setState({ ratio: text });
  }
  static navigationOptions = {
    //标题
    headerTitle: "转账"
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
              size="xlarge"
              overlayContainerStyle={{ backgroundColor: "transparent" }}
              rounded
              icon={{ name: "local-atm", color: "grey" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Text}>Transfer</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp">
            <Input
              label="对方账户"
              placeholder="请输入对方账户"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              onChangeText={text => this.setTo(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="转账金额"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              placeholder="请输入转账金额"
              onChangeText={text => this.setValue(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="手续费"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              placeholder="请输入手续费"
              onChangeText={text => this.setRatio(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="密码"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              placeholder="请输入密码"
              onChangeText={text => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <Button
              icon={{ name: "send" }}
              type="outline"
              buttonStyle={styles.buttonContainer}
              title="发送交易"
              onPress={this.onButtonPress.bind(this)}
            />
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }

  onButtonPress() {
    var args = [];
    args.push(this.state.password);
    args.push(this.props.navigation.state.params.ws);
    args.push(this.props.navigation.state.params.WalletSchema);
    args.push(this.state.to);
    args.push(Number(this.state.value));
    args.push(Number(this.state.ratio));
    transfer(args);
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
    flex: 2,
    fontSize: 34,
    paddingLeft: 5,
    color: "grey",
    fontFamily: "Apple Color Emoji"
  },
  buttonContainer: {
    flex: 1,
    fontFamily: "italic",
    marginTop: 50
  },
  Icon: {
    flex: 1
  }
});
