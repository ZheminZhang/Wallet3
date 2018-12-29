/* 查询余额 */
const lightwallet = require("eth-lightwallet");

import Realm from "realm";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

type Props = {};
export default class GetBalance extends Component<Props> {
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

  constructor(props) {
    super(props);
    this.state = {
      balance: null
    };
    //this.A();
  }

  render() {
    balance = this.state.balance;
    return (
      <View
        style={{
          height: 50,
          backgroundColor: "white",
          flex: 1,
          marginLeft: 10,
          marginRight: 10
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontStyle: "normal",
            fontWeight: "900",
            marginLeft: 10
          }}
        >
          余额
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontStyle: "normal",
              fontWeight: "900",
              marginLeft: 10
            }}
          >
            {balance}
          </Text>
          <View style={{ width: 30, height: 30 }}>
            <Button title="刷新" onPress={this.A.bind(this)} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
