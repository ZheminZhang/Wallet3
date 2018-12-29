/* 智能钱包管理 */

import Realm from "realm";
import ActionButton from "react-native-action-button";
import { Icon, Avatar, Text, Button } from "react-native-elements";

import GenerateKeystoreInterface from "./GenerateKeystoreComponent";
import ImportSeedPhraseInterface from "./ImportSeedPhraseComponent";
import ImportPrivateKeyInterface from "./ImportPrivateKeyComponent";

<<<<<<< HEAD
import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
=======
import TransferInterface from './TransferComponent'
import PurchaseInterface from './PurchaseComponent'
import GetBalanceInterface from './GetBalanceComponent'

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  Alert,
  ScrollView
} from "react-native";
>>>>>>> master
import { StackNavigator } from "react-navigation";

//const WalletSchema = this.props.WalletSchema;

// 将智能合约部署到服务器
type Props = {};
class ManagementList extends Component<Props> {
  constructor(props) {
    super(props);
    this.buttons = [];
    setTimeout(() => this.A(), 1000);
    this.state = {
      walletLength: 0
    };
  }

  static navigationOptions = {
    //标题
    title: "钱包管理"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  A() {
    var realm = new Realm({ schema: [WalletSchema] });
    var wallets = realm.objects("Wallet");
    for (var i = 0; i < wallets.length; i++) {
      this.buttons.push(wallets[i]);
    }
    //this.forceUpdate();
    this.setState({ walletLength: wallets.length });
  }

  Refresh() {
    this.buttons = [];
    this.A();
  }

  render() {
    const { navigate } = this.props.navigation;
    //this.buttons = []
    //this.A()
    return this.state.walletLength ? (
      <View style={styles.Background}>
        <View style={{height:150}}>
          <ScrollView style={{zIndex:2, position:'absolute', height:150}}>
          {this.buttons.map((elem, index) => {
            return (
              <View key={index} style={styles.Item}>
                <View style={{ flexDirection: "row" }}>
                  <Avatar
                    overlayContainerStyle={{ backgroundColor: "transparent" }}
                    large
                    rounded
                    icon={{ name: "gesture", color: "blue", size: 50 }}
                    activeOpacity={0.7}
                    containerStyle={{
                      marginLeft: 10,
                      marginTop: 25,
                      width: 70
                    }}
                  />
                  <View style={{ flexDirection: "column", width: 300 }}>
                    <Text style={styles.walletName}>{elem.name}</Text>
                    <Text style={styles.walletAddress}>
                      {'0x'+elem.address.substr(0,10)+'...'+elem.address.substr(elem.address.length-10,10)}
                    </Text>
                  </View>
        	  			  <View style={{width: 28, right: 30}}>
        					  <Button
        						title = "发送交易"
        						onPress={() => navigate('Transfer', {WalletSchema:WalletSchema, ws:ws})}>
        					  </Button>
        				  </View>
        				  <View style={{width: 28, right: 100}}>
        				  </View>
        				  <View style={{width: 28, right: 170}}>
                  <PurchaseInterface ws={ws} WalletSchema={WalletSchema}/>
        				  </View>
                </View>
              </View>
            );
          })}
          </ScrollView>
        </View>
          <GetBalance ws={ws} WalletSchema={WalletSchema}/>
        <View style={styles.container}>
          <ActionButton 
            buttonColor="lightblue" 
            position='left'
            size={55}
            offsetY={50}
            verticalOrientation="up"
            renderIcon={() => (
              <Text style={styles.actionButtonText}>导出{"\n"}钱包</Text>
            )}
          >
            <ActionButton.Item
              buttonColor="yellow"
              title="通过助记词导入"
              onPress={() =>
                navigate("ImportSeedPhrase", { WalletSchema: WalletSchema })
              }
            >
              <Icon name="font-download" />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="lightgreen"
              title="通过私钥导入"
              onPress={() =>
                navigate("ImportPrivateKey", { WalletSchema: WalletSchema })
              }
            >
              <Icon name="vpn-key" />
            </ActionButton.Item>
          </ActionButton>
          <ActionButton
            buttonColor="lightblue"
            position="right"
            size={55}
            offsetY={50}
            onPress={() =>
              navigate("GenerateKeystore", { WalletSchema: WalletSchema })
            }
            renderIcon={() => (
              <Text style={styles.actionButtonText}>创建{"\n"}钱包</Text>
            )}
          />
          <ActionButton
            buttonColor="lightblue"
            position="center"
            size={55}
            offsetY={50}
            onPress={this.Refresh.bind(this)}
            renderIcon={() => <Text style={styles.actionButtonText}>刷新</Text>}
          />
        </View>
      </View>
    ) : (
      <View style={styles.Background}>
        <Animatable.Text animation="fadeInUp" style={styles.Welcome}>
          Welcome!
        </Animatable.Text>
        <Animatable.View animation="fadeInLeft">
          <Button
            buttonStyle={styles.CreateButton}
            raised
            rounded
            title="创建钱包"
            outline="black"
            color="black"
            onPress={() =>
              navigate("GenerateKeystore", { WalletSchema: WalletSchema })
            }
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight">
          <Button
            buttonStyle={styles.CreateButton}
            raised
            rounded
            title="导入钱包"
            outline="black"
            color="black"
          />
        </Animatable.View>
      </View>
    ) 
  }
}

const MyWallet = StackNavigator({
  Main: { screen: ManagementList },
  GenerateKeystore: { screen: GenerateKeystoreInterface },
  ImportSeedPhrase: { screen: ImportSeedPhraseInterface },
  //ImportKeystore: {screen: ImportKeystoreInterface},
  ImportPrivateKey: {screen: ImportPrivateKeyInterface},
  Transfer: {screen: TransferInterface},
  Purchase: {screen: PurchaseInterface},
  //GetBalance: {screen: GetBalanceInterface},
});

export default class WalletManagement extends React.Component {
  constructor(props) {
    super(props);
    ws = this.props.ws;
    WalletSchema = this.props.WalletSchema;
  }
  render() {
    return <MyWallet />;
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  },
  CreateButton: {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 80,
    marginRight: 80,
    backgroundColor: "pink"
  },
  Welcome: {
    marginBottom: 60,
    marginLeft: 80,
    marginRight: 80,
    textAlign: "center",
    fontSize: 40,
    color: "red",
    fontFamily: "Apple Color Emoji"
  },
  Item: {
    flex: 1,
    backgroundColor: "white",
    height: 120,
    margin: 10
  },
  walletName: {
    color: "black",
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 20,
    marginLeft: 10
  },
  walletAddress: {
    color: "grey",
    fontSize: 16,
    marginTop: 20,
    marginLeft: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:0
  },
  actionButtonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "500"
  }
});
