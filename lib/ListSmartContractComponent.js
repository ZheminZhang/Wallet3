/* 下载智能合约 */
import DeploySmartContract from './DeploySmartContractComponent'
import CallSmartContract from './CallSmartContractComponent'
import ContractList from "./ContractList"


import React, { Component } from 'react';
import {
  ScrollView,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  TouchableHighlight
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
    this.sell_buttons = [];
    this.buy_buttons = [];
    this.A(ws);
  }

  static navigationOptions = {
   //标题
    title: '合约商店',
     //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };
  
  A(ws){
    ws.send(JSON.stringify({listContract: 'all'}));
    ws.onmessage = e => {
      //alert(this)
      // 接收到了一个消息
      if (JSON.parse(e.data).err) {
        alert(JSON.parse(e.data).err);
      }
      //contractPath = fs.DocumentDirectoryPath + '/contract';
      SmartContractList = JSON.parse(e.data).ContractTemplateList;
      for (var key in SmartContractList) {
        this.buttons.push(key);
      }
      this.forceUpdate();
    };

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
                    //this.buttons.push([addr, name]);
                    if (name == 'Buy'){
                        this.buy_buttons.push([addr, name]);
                    }
                    else if (name == 'Sell'){
                        this.sell_buttons.push([addr, name])
                    }
                }
            }
            this.forceUpdate();
        }
  }

  Refresh() {
    this.sell_buttons = [];
    this.buy_buttons = [];
    this.buttons = [];
    this.A(ws);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{height:650, backgroundColor:'white'}}>
            <View>
              <Button
                title='刷新'
                onPress={this.Refresh.bind(this)}
                >
              </Button>
            </View>
        <View style={{justifyContent:'space-around',alignItems:'flex-start',flexDirection:'row',flex:1,height:200}}>
                <ScrollView style={{width:60,height:200}}>
                  <ContractList buttons={ this.sell_buttons } navigation={this.props.navigation}></ContractList>
                </ScrollView>
                <ScrollView style={{width:60,height:200}}>
                
                    <ContractList buttons={ this.buy_buttons } navigation={this.props.navigation}></ContractList>
      
                </ScrollView>
        </View>
        <View style={{justifyContent:'space-around',flex:1,flexDirection:'row',alignItems:'center'}}>
              <View style={{backgroundColor:'#00BFFF',borderRadius:10}}>
                <TouchableHighlight
                  style={{height:50,width:150,borderRadius:10}}
                  underlayColor="#6495ED"
                  onPress={() => navigate('Contract', {contractName: 'Sell'})}
                  ><Text style={{textAlign:'center', fontSize:30, color:'#E1FFFF'}}>SELL</Text>
                </TouchableHighlight>
              </View>
              <View style={{backgroundColor:"#00BFFF",borderRadius:10}}>
                <TouchableHighlight
                  style={{height:50,width:150,borderRadius:10}}
                  underlayColor="#6495ED"
                  onPress={() => navigate('Contract', {contractName: 'Buy'})}
                  ><Text style={{textAlign:'center', fontSize:30, color:'#E1FFFF'}}>BUY</Text>
                </TouchableHighlight>
              </View>
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

class ContractInterface2 extends Component<Props> {
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
  Contract2: {screen: ContractInterface2}
});

export default class ListSmartContract extends React.Component {
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