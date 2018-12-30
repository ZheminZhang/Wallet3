/* 查询价格 */

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
export default class GetCoinPrice extends Component<Props> {
  constructor(props){
  	super(props);
    this.state = {
      coinPrice:null,
    };
    //this.A();
  }

  render() {
    trade = this.state.trade;
    return (
        <View style = {styles.container}>
          <Button
              title="成交价"
              onPress={this.onButtonPress.bind(this)}
              color="#00BFFF">
            </Button> 
        </View>
    );
  }

  onButtonPress() {
    //deploySmartContract(this.state.password, txOptions, global.ws)
    var send = {};
    send.coinPrice = '';
    ws.send(JSON.stringify(send));
    ws.onmessage = (e) => {
      response = JSON.parse(e.data);
      if (response.err) {
        alert(response.err);
      }
      //this.state.balance = response.balance;
      this.setState({
        coinPrice: response.ETHPrice
      });
      alert(response.ETHPrice+' USDT'+'\n'+(response.ETHPrice*response.rate/100)+' CNY');
      //alert(response.ETHPrice+'\n'+response.rate);
    }
  }
}

const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:'#fff',
     justifyContent: 'center',
     alignItems: 'center',
   },
   tabText:{
     color:'grey',
     fontSize:12,
     paddingBottom: 20,
   },
   icon:{
     width:25,
     height:25,
     margin:3,
   },
   border:{
     borderColor:'blue',
     borderWidth: 2,
     margin: 20
   }
});