/* 部署智能合约 */

const deploySmartContract = require("./src/deploySmartContract");

import * as Animatable from "react-native-animatable";

import React, { Component } from "react";
import { Platform, StyleSheet, View, ScrollView } from "react-native";
import {
  Button,
  Icon,
  Avatar,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text
} from "react-native-elements";

// 将智能合约部署到服务器
type Props = {};
export default class DeploySmartContract extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      gasPrice: "",
      value: "",
      price: "",
      args: []
    };
  }
  setPassword(text) {
    this.state.password = text;
  }
  setPrice(text) {
    this.state.price = text;
  }
  setGasPrice(text) {
    this.state.gasPrice = text;
  }
  setValue(text) {
    this.state.value = text;
  }

  render() {
    // var pages = [];
    // //var args = JSON.parse(this.props.deployConfig);
    // for (var i = 0; i < JSON.parse(this.props.deployConfig).length; i++) {
    //   pages.push(i);
    // }
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
              icon={{ name: "library-books", color: "black" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Title}>{"New " + this.props.contractName}</Text>
          </Animatable.View>
          {/* {pages.map((elem, index) => {
            return (
              <Animatable.View animation="fadeInUp">
                <FormLabel>
                  {JSON.parse(this.props.deployConfig)[index].name}
                </FormLabel>
                <FormInput
                  key={index}
                  placeholder={
                    "请输入" + JSON.parse(this.props.deployConfig)[index].name
                  }
                  onChangeText={text => (this.state.args[index] = text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <FormValidationMessage>{""}</FormValidationMessage>
              </Animatable.View>
            );
          })} */}
          <Animatable.View animation="fadeInUp">
            <FormLabel>币价（元）</FormLabel>
            <FormInput
              placeholder="请输入币价（元）"
              onChangeText={text => this.setPrice(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormValidationMessage>{""}</FormValidationMessage>
            <FormLabel>转入合约金额</FormLabel>
            <FormInput
              placeholder="请输入转入合约金额"
              onChangeText={text => this.setValue(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormValidationMessage>{""}</FormValidationMessage>
            <FormLabel>手续费率</FormLabel>
            <FormInput
              placeholder="请输入手续费率"
              onChangeText={text => this.setGasPrice(text)}
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
            <Button
              icon={{ name: "done" }}
              raised
              buttonStyle={styles.buttonContainer}
              title="部署合约"
              onPress={this.onButtonPress.bind(this)}
            />
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }

  onButtonPress() {
    //deploySmartContract(this.state.password, txOptions, global.ws)
    txOptions = {};
    txOptions.value = Number(this.state.value);
    txOptions.gasPrice = Number(this.state.gasPrice);
    for (var i = 0; i < this.state.args.length; i++) {
      if (JSON.parse(this.props.deployConfig)[i].type == "number") {
        this.state.args[i] = Number(this.state.args[i]);
      }
    }
    try {
      deploySmartContract(
        this.state.password,
        this.props.bin,
        this.props.abi,
        this.state.args,
        this.props.contractName,
        txOptions,
        this.props.WalletSchema,
        this.state.price
      );
    } catch (error) {
      alert(error);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 50
  },
  Title: {
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
