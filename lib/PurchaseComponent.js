/* 购买数字货币 */

const purchase = require('./src/purchase');

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
export default class Purchase extends Component<Props> {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
          <Button
            title="购买数字货币"
            onPress={this.onButtonPress.bind(this)}
            color="#841584">
          </Button> 
        </View>
      );
  }

  onButtonPress() {
    //purchase(this.state.password, txOptions, global.ws)
    purchase(this.props.ws, this.props.WalletSchema);
  }
}

const styles = StyleSheet.create({
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

