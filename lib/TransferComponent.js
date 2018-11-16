/* 用户之间转账 */

const transfer = require('./src/transfer');

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

// 将交易信息发送到服务器
type Props = {};
export default class Transfer extends Component<Props> {
  constructor(props){
	super(props);
	this.state = {
        password: '',
        to: '',
        value: '',
        ratio: ''
    }
  }
  setPassword(text) {
    this.setState({password: text})
  }
  setTo(text) {
    this.setState({to: text})
  }
  setValue(text) {
    this.setState({value: text})
  }
  setRatio(text) {
    this.setState({ratio: text})
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="对方账户"
              style={styles.Address}
              onChangeText={(text) => this.setTo(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="转账金额"
              style={styles.Phrase}
              onChangeText={(text) => this.setValue(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="手续费"
              style={styles.Phrase}
              onChangeText={(text) => this.setRatio(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View>
            <TextInput
              placeholder="请输入密码"
              style={styles.Password}
              onChangeText={(text) => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
          </View>
	          <Button
	            title="发送交易"
	            onPress={this.onButtonPress.bind(this)}
	            color="#841584">
	          </Button> 
        </View>
      );
  }

  onButtonPress() {
    var args = []
    args.push(this.state.password)
    args.push(this.props.ws)
    args.push(this.props.WalletSchema)
    args.push(this.state.to)
    args.push(Number(this.state.value))
    args.push(Number(this.state.ratio))
    transfer(args);
  }
}

const styles = StyleSheet.create({
  Address: {
    textAlign: 'center',
    height: 30,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 3
  },
  Phrase: {
    textAlign: 'center',
    height: 30,
    width: 90,
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