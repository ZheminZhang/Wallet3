/* 下载智能合约 */

const fs = require('react-native-fs');
//import DeploySmartContract from './DeploySmartContractComponent'

import Realm from 'realm'
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
import {
  StackNavigator,
} from 'react-navigation';

var SmartContractList;
// 将智能合约部署到服务器
type Props = {};
class ContractHomeList extends Component<Props> {

  constructor(props){
    super(props);
    //this.buttons = [];
    this.A(ws);
  }

  static navigationOptions = {
   //标题
    headerTitle: '合约商店',
     //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  A(ws){
    var realm = new Realm({schema: [WalletSchema]});
    var wallets = realm.objects('Wallet')
    var address = wallets[0].address
    var send = {}
    send.from = address
    ws.send(JSON.stringify({hello: 'all'}));
    ws.onmessage = e => {
      //alert(this)
      // 接收到了一个消息
      if (JSON.parse(e.data).err) {
        alert(JSON.parse(e.data).err);
      }
      //contractPath = fs.DocumentDirectoryPath + '/contract';
      SmartContractList = JSON.parse(e.data);
      for (var key in SmartContractList) {
        this.buttons.push(key);
      }
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    var 
    return (
      <View>
        <Button
          title='打招呼'
          onPress={this.A.bind(this)}
          >
        </Button>
      </View>
    );
  }
}

class ContractInterface extends Component<Props> {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => ({
    // 展示数据 "`" 不是单引号 
    title: `${navigation.state.params.contractName}`,
    
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <DeploySmartContract ws={ws}
              bin = {SmartContractList[params.contractName].bin}
              abi = {SmartContractList[params.contractName].abi}
              deployConfig = {SmartContractList[params.contractName].deployConfig}
              contractName = {params.contractName}
              WalletSchema = {WalletSchema}>
            </DeploySmartContract>
          </View>
      </View>
    );
  }
}

const MyContract = StackNavigator({
  Main: {screen: ContractHomeList},
  Contract: {screen: ContractInterface},
});

export default class LoadSmartContract extends React.Component {
  constructor(props){
    super(props);
    ws = this.props.ws;
    WalletSchema = this.props.WalletSchema;
  }
  render() {
    return (
        <MyContract />
    );
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
    width: 200,
    borderColor: 'red',
    borderWidth: 2,
    margin: 3
  },
  Caption: {
    color: '#FF7700',
    fontSize: 30,
    fontWeight: 'bold',
    margin:5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})