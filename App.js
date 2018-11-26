/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import './shim.js';
import 'crypto'
import QRScanner from './lib/QRScannerComponent'
import BottomTabBar from './BottomTabBar'
//var ws = new WebSocket('ws://120.78.72.237:3000');
//var ws = new WebSocket('ws://192.168.71.42:3000');
//import { PropTypes } from 'react';
//import PropTypes from 'prop-types'
var ws = new WebSocket('ws://192.168.1.4:3000');

import React, { Component } from 'react';
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
} from 'react-native';
import Realm from 'realm';

const WalletSchema = {
  name: 'Wallet',
  primaryKey: 'address',
  properties: {
    address: 'string',
    name: 'string',
    type: 'string',
    keystore: 'string',//添加默认值的写法
  }
};

let realm = new Realm({schema: [WalletSchema]});
//alert(PropTypes.string)
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'flex-end'}}>
        {/*<BottomTabBar ws={ws} WalletSchema={WalletSchema}></BottomTabBar>*/}
        <QRScanner></QRScanner>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
