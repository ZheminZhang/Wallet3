/* 下载智能合约 */
import CallSmartContract from './CallSmartContractComponent'
import InquireSmartContract from './InquireSmartContractComponent'
import ContractList from "./ContractList"

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
class SellContractList extends Component<Props> {

    constructor(props){
        super(props);
        this.buttons = [];
        this.A(ws);
    }

    static navigationOptions = {
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
                    //this.buttons.push([addr, name]);
                    if (name == 'Sell'){
                        this.buttons.push([addr, name]);
                    }
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
            <View style={{justifyContent:'center',alignItems:'center'}}>
<Button title="Buy" onPress={() => navigate('BuyPage', {})} color="#341584">
        </Button>
            </View>
        <ContractList buttons={ this.buttons } navigation={this.props.navigation}>
            </ContractList>
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

class BuyContractList extends Component<Props> {

    constructor(props){
        super(props);
        //this.A(this.props.ws);
        this.buttons = [];
        this.A(ws);
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
                    //this.buttons.push([addr, name]);
                    if (name == 'Buy'){
                        this.buttons.push([addr, name]);
                    }
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
            <View style={{justifyContent:'center',alignItems:'center'}}>
<Button title="Sell" onPress={() => navigate('SellPage', {})} color="#341584">
        </Button>
        </View>
            <ContractList buttons={ this.buttons } navigation={this.props.navigation}></ContractList>
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

class ShowContractList extends Component<Props>{
    constructor(props){
        super(props);
        //this.A(this.props.ws);
        this.sell_buttons = [];
        this.buy_buttons = [];
        //this.state_ = 1;//0表示Sell 1表示buy
        this.A(ws);
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
        this.A(ws);
    }

    toSell() {
        //this.state_=0;
        this.Refresh();

    }

    toBuy() {
        //this.state_=1;
        this.Refresh();
    }

    render() {
        list1 = <ContractList buttons={ this.sell_buttons } navigation={this.props.navigation}></ContractList>
        list2 = <ContractList buttons={ this.buy_buttons } navigation={this.props.navigation}></ContractList>
    return(
        <View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Button title="Sell" onPress={() => this.toSell()} color="#341584"> </Button>
                <Button title="Buy" onPress={() => this.toBuy()} color="#341584"> </Button>
            </View>
            <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row',flex:1}}>
                <ScrollView>{list1}</ScrollView>
                <ScrollView>{list2}</ScrollView> 
            </View>
        </View>
    )
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
          <InquireSmartContract ws={ws}
            abi = {SmartContractList[params.contractName].abi}
            inquireConfig = {SmartContractList[params.contractName].inquireConfig}
            contractAddr = {params.contractAddr}
            WalletSchema = {WalletSchema}>
          </InquireSmartContract>
      </View>
    );
  }
}

const MyContract = StackNavigator({
    Main: {screen: ShowContractList},
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
        <MyContract/>
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