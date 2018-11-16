/* 下载智能合约 */
import CallSmartContract from './CallSmartContractComponent'

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
    //this.A(this.props.ws);
    this.buttons = [];
    this.A(ws)
  }

  static navigationOptions = {
   //标题
    title: '在线商城',
     //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  A(ws){
    ws.send(JSON.stringify({loadContract: 'all'}));
    ws.onmessage = e => {
      // 接收到了一个消息
      if (JSON.parse(e.data).err) {
        alert(JSON.parse(e.data).err);
      }
      var contract = JSON.parse(e.data);
      for (var addr in contract) {
        if (addr === 'SmartContractList') {
          SmartContractList = contract[addr];
        } else {
          name = contract[addr];
          this.buttons.push([addr, name]);
        }
      }
      this.forceUpdate();
    }
  }

  Refresh() {
    this.buttons = [];
    this.A(ws);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        {this.buttons.map((elem, index) => {
          return(
            <View key={index}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text>{elem[0]}</Text>
              </View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Button
                  title={elem[1]}
                  onPress={() => navigate('Contract', {contractAddr: elem[0], contractName: elem[1]})}
                  color="#841584">
                </Button>
              </View>
            </View>
          );
        })}
        <View>
          <Button
            title='刷新'
            onPress={this.Refresh.bind(this)}
            >
          </Button>
        </View>
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
      <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.Caption}>合约地址</Text>
            <Text style={styles.Address}>{params.contractAddr}</Text>
          </View>
          <CallSmartContract ws={ws}
            abi = {SmartContractList[params.contractName].abi}
            callConfig = {SmartContractList[params.contractName].callConfig}
            contractAddr = {params.contractAddr}
            WalletSchema = {WalletSchema}>
          </CallSmartContract>
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
  Address: {
    color: '#2D9900',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: '#C0C0C0',
    textShadowRadius: 2,
    textShadowOffset: {width:2,height:2},
    margin:5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})