/* 查询余额 */
const lightwallet = require("eth-lightwallet");

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
import { Icon } from "react-native-elements";

type Props = {};
export default class GetBalance extends Component<Props> {
  constructor(props){
    super(props);
    setTimeout(()=>this.A(), 10)
    this.state = {
      balance: 0
    };
    //this.A();
  }

  A() {
    //deploySmartContract(this.state.password, txOptions, global.ws)
    var ws = this.props.ws;
    var WalletSchema = this.props.WalletSchema;
    var realm = new Realm({ schema: [WalletSchema] });
    var wallets = realm.objects("Wallet");
    //var sendingAddr = wallets[0].address;
    var send = {};
    send.balance = [wallets[0].address, wallets[0].type];
    ws.send(JSON.stringify(send));
    ws.onmessage = e => {
      response = JSON.parse(e.data);
      if (response.err) {
        alert(response.err);
      }
      //this.state.balance = response.balance;
      this.setState({
        balance: response.balance
      });
      //alert(response.balance + ' ' + wallets[0].type);
    };
  }

  render() {
    balance = this.state.balance;
    return (
      <View style={{flex: 2, flexDirection: "row"}}>
        <Text style={styles.Balance}>{Number(balance).toFixed(2)+" ETH"}</Text>
          <Icon
            size={22}
            name="refresh"
            color="white"
            backgroundColor="transparent"
            onPress={this.A.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Balance: {
    justifyContent: "center",
    marginRight: 2,
    fontSize: 22,
    color: "white",
    fontWeight: "bold"
  }
});
