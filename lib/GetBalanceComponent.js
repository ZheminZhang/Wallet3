/* 查询余额 */
const lightwallet = require('eth-lightwallet');
const keystore = lightwallet.keystore;

import Realm from 'realm';
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

type Props = {};
export default class GetBalance extends Component<Props> {
  constructor(props){
  	super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title='查询余额'
          onPress={this.onButtonPress.bind(this, this.props.ws)}
          color="#841584">
        </Button> 
      </View>
    );
  }

  onButtonPress(ws) {
    //deploySmartContract(this.state.password, txOptions, global.ws)
    var WalletSchema = this.props.WalletSchema;
    var realm = new Realm({schema: [WalletSchema]});
    var wallets = realm.objects('Wallet')
    //var sendingAddr = wallets[0].address;
    var send = {};
    send.balance = [wallets[0].address, wallets[0].type];
    ws.send(JSON.stringify(send));
    ws.onmessage = (e) => {
      response = JSON.parse(e.data);
      if (response.err) {
        alert(response.err);
      }
      alert(response.balance + ' ' + wallets[0].type);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})