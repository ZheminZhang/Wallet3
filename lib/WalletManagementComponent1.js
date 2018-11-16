/* 智能钱包管理 */

import GenerateKeystoreInterface from './GenerateKeystoreComponent';
import ImportSeedPhraseInterface from './ImportSeedPhraseComponent';
import ImportKeystoreInterface from './ImportKeystoreComponent';
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
  Alert
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

// 将智能合约部署到服务器
type Props = {};
class ManagementList extends Component<Props> {

  constructor(props){
    super(props);
    //this.A(this.props.ws);
  }

  static navigationOptions = {
   //标题
    title: '钱包管理',
     //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button
            title="生成钱包"
            onPress={() => navigate('GenerateKeystore')}
            color="#841584">
          </Button>
        </View>
        <View style={styles.container}>
          <Button
            title="通过助记词导入钱包"
            onPress={() => navigate('ImportSeedPhrase')}
            color="#841584">
          </Button>
        </View>
        {/*
        <View style={styles.container}>
          <Button
            title="通过keystore导入钱包"
            onPress={() => navigate('ImportKeystore')}
            color="#841584">
          </Button>
        </View>
        */}
        <View style={styles.container}>
          <Button
            title="通过私钥导入钱包"
            onPress={() => navigate('ImportPrivateKey')}
            color="#841584">
          </Button>
        </View>
        <GetBalance ws={ws} />
      </View>
    );
  }
}

const MyWallet = StackNavigator({
  Main: {screen: ManagementList},
  GenerateKeystore: {screen: GenerateKeystoreInterface},
  ImportSeedPhrase: {screen: ImportSeedPhraseInterface},
  ImportKeystore: {screen: ImportKeystoreInterface},
  ImportPrivateKey: {screen: ImportPrivateKeyInterface},
});

export default class WalletManagement extends React.Component {
  constructor(props){
    super(props);
    ws = this.props.ws;
  }
  render() {
    return (
        <MyWallet />
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
