/* 智能钱包管理 */

import Realm from 'realm'
import ActionButton from 'react-native-action-button'
import {Icon, Avatar} from 'react-native-elements'

import GenerateKeystoreInterface from './GenerateKeystoreComponent';
import ImportSeedPhraseInterface from './ImportSeedPhraseComponent';
import ImportPrivateKeyInterface from './ImportPrivateKeyComponent';
import GetBalance from './GetBalanceComponent';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
const lightwallet = require('eth-lightwallet')
const keystore = lightwallet.keystore

//const WalletSchema = this.props.WalletSchema;

// 将智能合约部署到服务器
type Props = {};
class ManagementList extends Component<Props> {

  constructor(props){
    super(props);
    this.buttons = [];
    setTimeout(()=>this.A(), 1000)
  }

  static navigationOptions = {
   //标题
    title: '钱包管理',
     //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  A(){
    var realm = new Realm({schema: [WalletSchema]});
    var wallets = realm.objects('Wallet')
    for (var i=0; i<wallets.length; i++) {
      this.buttons.push(wallets[i]);
    }
    this.forceUpdate()
  }

  Refresh() {
    this.buttons = [];
    this.A();
  }

  render() {
    const {navigate} = this.props.navigation;
    //this.buttons = []
    //this.A()
    return (
      <View style={styles.Background}>
        <ScrollView>
          {this.buttons.map((elem, index) => {
            return(
              <View key={index} style={styles.Item}>
                <View style={{flexDirection:'row'}}>
                  <Avatar
                    overlayContainerStyle={{backgroundColor: 'transparent'}}
                    large
                    rounded
                    icon={{name: 'gesture', color: 'blue', size: 50}}
                    activeOpacity={0.7}
                    containerStyle={{marginLeft: 10, marginTop: 25, width: 70}}
                  />
                  <View style={{flexDirection:'column', width: 300}}>
                    <Text style={styles.walletName}>{elem.name}</Text>
                    <Text style={styles.walletAddress}>
                      {'0x'+elem.address.substr(0,10)+'...'+elem.address.substr(elem.address.length-10,10)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.container}>
        <View>
        </View>
          <ActionButton 
            buttonColor="lightblue" 
            position='left'
            size={55}
            offsetY={50}
            verticalOrientation='up' 
            renderIcon={() => (
              <Text style={styles.actionButtonText}>导入{'\n'}钱包</Text>
          )}>
          <ActionButton.Item buttonColor='yellow' title="通过助记词导入" onPress={() => navigate('ImportSeedPhrase', {WalletSchema: WalletSchema})}>
            <Icon name="font-download" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='lightgreen' title="通过私钥导入" onPress={() => navigate('ImportPrivateKey', {WalletSchema: WalletSchema})}>
            <Icon name="vpn-key" />
          </ActionButton.Item>
        </ActionButton>
        <ActionButton
          buttonColor="lightblue"
          position='right'
          size={55}
          offsetY={50}
          onPress={() => navigate('GenerateKeystore', {WalletSchema: WalletSchema})}
          renderIcon={() => (
              <Text style={styles.actionButtonText}>创建{'\n'}钱包</Text>
          )}
        />
        <ActionButton
          buttonColor="lightblue"
          position='center'
          size={55}
          offsetY={50}
          onPress={this.Refresh.bind(this)}
          renderIcon={() => (
              <Text style={styles.actionButtonText}>刷新</Text>
          )}
        />
        </View>
    </View>
    );
  }
}

const MyWallet = StackNavigator({
  Main: {screen: ManagementList},
  GenerateKeystore: {screen: GenerateKeystoreInterface},
  ImportSeedPhrase: {screen: ImportSeedPhraseInterface},
  //ImportKeystore: {screen: ImportKeystoreInterface},
  ImportPrivateKey: {screen: ImportPrivateKeyInterface},
});

export default class WalletManagement extends React.Component {
  constructor(props){
    super(props);
    ws = this.props.ws;
    WalletSchema = this.props.WalletSchema
  }
  render() {
    return (
        <MyWallet />
    );
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor:'lightgrey',
    flexDirection: 'column',
  },
  Item: {
    flex: 1,
    backgroundColor: 'white',
    height: 120,
    margin: 10
  },
  walletName: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 20,
    marginLeft: 10,
  },
  walletAddress: {
    color: 'grey',
    fontSize: 16,
    marginTop: 20,
    marginLeft: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
})
