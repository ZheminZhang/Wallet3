/* 调用智能合约 */

const callSmartContract = require("./src/callSmartContract");
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
export default class CallSmartContract extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      gasPrice: "",
      value: "",
      args: []
    };
  }
  setPassword(text) {
    this.state.password = text;
  }
  setGasPrice(text) {
    this.state.gasPrice = text;
  }
  setValue(text) {
    this.state.value = text;
  }

  render() {
    var buttons = [];
    for (var i = 0; i < JSON.parse(this.props.callConfig).length; i++) {
      buttons[i] = [];
      this.state.args[i] = [];
      for (
        var j = 0;
        j < JSON.parse(this.props.callConfig)[i].args.length;
        j++
      ) {
        buttons[i].push(j);
      }
    }
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <Animatable.View
            animation="fadeInDown"
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Avatar
              xlarge
              overlayContainerStyle={{ backgroundColor: "transparent" }}
              rounded
              icon={{ name: "border-color", color: "black" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Title}>Address</Text>
          </Animatable.View>
          <Animatable.Text animation="fadeInUp">
            <Text style={styles.Address}>
              {this.props.contractAddr.slice(0, 21)}
              {"\n"}
              {this.props.contractAddr.slice(21)}
            </Text>
          </Animatable.Text>
          <Animatable.View animation="fadeInUp" style={{ marginTop: 30 }}>
            {this.props.contractState ? (
              ""
            ) : (
              <View>
                <FormLabel>转入合约金额</FormLabel>
                <FormInput
                  placeholder="请输入转入合约金额"
                  onChangeText={text => this.setValue(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <FormValidationMessage>{""}</FormValidationMessage>
              </View>
            )}
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
          </Animatable.View>
          {buttons.map((elem, index1) => {
            return (
              <Animatable.View animation="fadeInUp" key={index1}>
                {buttons[index1].map((elem, index2) => {
                  return (
                    <View>
                      <FormLabel>
                        {
                          JSON.parse(this.props.callConfig)[index1].args[index2]
                            .name
                        }
                      </FormLabel>
                      <FormInput
                        key={index2}
                        placeholder={
                          "请输入" +
                          JSON.parse(this.props.callConfig)[index1].args[index2]
                            .name
                        }
                        onChangeText={text => {
                          this.state.args[index1][index2] = text;
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      <FormValidationMessage>{""}</FormValidationMessage>
                    </View>
                  );
                })}
                <Button
                  raised
                  buttonStyle={styles.buttonContainer}
                  title={JSON.parse(this.props.callConfig)[index1].Chinese}
                  onPress={this.onButtonPress.bind(this, index1)}
                />
              </Animatable.View>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  onButtonPress(index) {
    txOptions = {};
    txOptions.value = Number(this.state.value);
    txOptions.gasPrice = Number(this.state.gasPrice);
    for (var i = 0; i < this.state.args[index].length; i++) {
      if (JSON.parse(this.props.callConfig)[index].args[i].type == "number") {
        this.state.args[index][i] = Number(this.state.args[index][i]);
      }
    }
    callSmartContract(
      this.state.password,
      this.props.abi,
      JSON.parse(this.props.callConfig)[index].name,
      this.state.args[index],
      txOptions,
      this.props.contractAddr,
      this.props.WalletSchema
    );
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
  Address: {
    marginTop: 20,
    fontSize: 26,
    color: "black",
    textAlign: "center"
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#009900",
    fontFamily: "italic"
  }
});
