/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import './shim.js';
import 'crypto'
import BottomTabBar from './BottomTabBar'
import JPushModule from 'jpush-react-native';
import JMessage from 'jmessage-react-plugin';
import Chat from './lib/ChatComponent'

//var ws = new WebSocket('ws://120.78.72.237:3000');
//var ws = new WebSocket('ws://192.168.71.42:3000');
//import { PropTypes } from 'react';
//import PropTypes from 'prop-types'
var ws = new WebSocket("ws://192.168.1.4:3000");

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AlertIOS,
  TextInput,
  Alert,
  ScrollView
} from "react-native";
import Realm from "realm";

const WalletSchema = {
  name: "Wallet",
  primaryKey: "address",
  properties: {
    address: "string",
    name: "string",
    type: "string",
    keystore: "string" //添加默认值的写法
  }
};
JMessage.init({
  appkey: "1f1558cafbf2dd3946981f0b",
  isOpenMessageRoaming: false, // 是否开启消息漫游，默认不开启
  isProduction: true // 是否为生产模式
});
JMessage.setDebugMode({ enable: true });
JMessage.setBadge(5, success => {});

let realm = new Realm({ schema: [WalletSchema] });
//alert(PropTypes.string)
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <BottomTabBar ws={ws} WalletSchema={WalletSchema} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
