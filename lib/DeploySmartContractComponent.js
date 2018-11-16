/* 部署智能合约 */

const deploySmartContract = require('./src/deploySmartContract');

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';

// 将智能合约部署到服务器
type Props = {};
export default class DeploySmartContract extends Component<Props> {
  constructor(props){
  	super(props);
  	this.state = {
          password: '',
          gasPrice: '',
          value: '',
          args: []
      }
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
    var pages = [];
      //var args = JSON.parse(this.props.deployConfig);
      for (var i = 0; i < JSON.parse(this.props.deployConfig).length; i++) {
        pages.push(i);
      }
      return (
        <View>
          <View style={styles.container}>
            {pages.map((elem, index) => {
              return(
                <TextInput
                  key={index}
                  placeholder={JSON.parse(this.props.deployConfig)[index].name}
                  style={styles.Phrase}
                  onChangeText={(text) => this.state.args[index] = text}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              );
            })}
            <TextInput
              placeholder="转入合约金额"
              style={styles.Phrase}
              onChangeText={(text) => this.setValue(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="手续费率"
              style={styles.Phrase}
              onChangeText={(text) => this.setGasPrice(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="请输入密码"
              style={styles.Password}
              onChangeText={(text) => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <Button
              title='部署合约'
              onPress={this.onButtonPress.bind(this)}
              color="#841584">
            </Button>
            </View> 
        </View>
      );
  }

  onButtonPress() {
    //deploySmartContract(this.state.password, txOptions, global.ws)
    txOptions = {};
    txOptions.value = Number(this.state.value);
    txOptions.gasPrice = Number(this.state.gasPrice);
    for (var i = 0; i < this.state.args.length; i++){
      if (JSON.parse(this.props.deployConfig)[i].type == "number"){
        this.state.args[i] = Number(this.state.args[i])
      }
    }
    deploySmartContract(this.state.password, this.props.ws, this.props.bin, this.props.abi, this.state.args, this.props.contractName, txOptions, this.props.WalletSchema);
  }
}

const styles = StyleSheet.create({
  Phrase: {
    textAlign: 'center',
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 3
  },
  Password: {
    textAlign: 'center',
    height: 30,
    width: 200,
    borderColor: 'red',
    borderWidth: 2,
    margin: 3
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})