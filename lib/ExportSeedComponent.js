/* 用户之间转账 */

const exportSeed = require('./src/exportSeed');

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
        password: ''
    }
  }
  setPassword(text) {
    this.setState({password: text})
  }

  render() {
    return (
        <View style={styles.container}>
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
	            title="导出助记词"
	            onPress={this.onButtonPress.bind(this)}
	            color="#841584">
	          </Button> 
        </View>
      );
  }

  onButtonPress() {
    var args = []
    args.push(this.state.password)
    args.push(this.props.WalletSchema)
    exportSeed(args).then((seed) => alert(seed)).catch((error) => alert(error));
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