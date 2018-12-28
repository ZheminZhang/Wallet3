/* 调用智能合约 */

const callSmartContract = require('./src/callSmartContract');
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
export default class CallSmartContract extends Component<Props> {
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
    var buttons = [];
      for (var i = 0; i < JSON.parse(this.props.callConfig).length; i++) {
        buttons[i] = [];
        this.state.args[i] = [];
        for (var j = 0; j < JSON.parse(this.props.callConfig)[i].args.length; j++) {
          buttons[i].push(j);
        }
      }
      return (
          <View style={{flex:3, justifyContent: 'center', alignItems: 'center',}}>
            <TextInput
              placeholder="发送金额"
              style={styles.Phrase}
              onChangeText={(text) => this.setValue(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="手续费"
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
            {buttons.map((elem, index1) => {
              return(
                <View key={index1}>
                  {buttons[index1].map((elem, index2) => {
                    return(
                      <TextInput
                        key={index2}
                        placeholder={JSON.parse(this.props.callConfig)[index1].args[index2].name}
                        style={styles.Phrase}
                        onChangeText={(text) => {
                          this.state.args[index1][index2] = text;
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    );
                  })}
                    <Button
                      title={JSON.parse(this.props.callConfig)[index1].Chinese}
                      onPress={this.onButtonPress.bind(this, index1)}
                      color="#841584">
                    </Button> 
                </View>
              )}
            )}
          </View>
       
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
    callSmartContract(this.state.password, this.props.ws, this.props.abi, JSON.parse(this.props.callConfig)[index].name, this.state.args[index], txOptions, this.props.contractAddr, this.props.WalletSchema);
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