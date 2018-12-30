/* 智能钱包管理 */

import Realm from "realm";
import { Icon, Avatar, Text, Button, Card } from "react-native-elements";


import GenerateKeystoreInterface from "./GenerateKeystoreComponent";
import ImportSeedPhraseInterface from "./ImportSeedPhraseComponent";
import ImportPrivateKeyInterface from "./ImportPrivateKeyComponent";
import GetBalance from "./GetBalanceComponent";
import * as Animatable from "react-native-animatable";

import TransferInterface from "./TransferComponent";
import PurchaseInterface from "./PurchaseComponent";

import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { StackNavigator } from "react-navigation";

//const WalletSchema = this.props.WalletSchema;

// 将智能合约部署到服务器
type Props = {};
class ManagementList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      walletLength: 0,
      wallet: {}
    };
  }

  static navigationOptions = {
    //标题
    title: "钱包管理"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  componentWillMount(){
    this.A();
  }

  A() {
    var realm = new Realm({ schema: [WalletSchema] });
    var wallets = realm.objects("Wallet");
    this.setState({ wallet: wallets[0] });
    //this.forceUpdate();
    this.setState({ walletLength: wallets.length });
  }

  Refresh() {
    this.setState({ wallet: {} });
    this.A();
  }

  render() {
    const { navigate } = this.props.navigation;
    //this.buttons = []
    //this.A()
    return this.state.walletLength ? (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.Background}>
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Text style={{color: "#272727", fontSize: 26, textAlign: "center", fontFamily: "Chalkduster"}}>1{" "}ETH{" "}={" "}1000{" "}RMB</Text>
          </View>
          <Card title={this.state.wallet.name}
                containerStyle={styles.Card}
                titleStyle={styles.Title}
                dividerStyle={{display: "none"}}
                >
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.walletAddress}>
                    {"0x" +
                      this.state.wallet.address.substr(0, 4) +
                      "..." +
                      this.state.wallet.address.substr(
                        this.state.wallet.address.length - 4,
                        4
                      )}
                  </Text>
                  <GetBalance ws={ws} WalletSchema={WalletSchema} />
                </View>
          </Card>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <PurchaseInterface ws={ws} WalletSchema={WalletSchema} />
            <View style={{flexDirection: "column", marginLeft: 20, marginRight: 20}}>
              <Icon
                containerStyle={styles.Icon}
                size={34}
                reverse
                name="payment"
                onPress={() =>
                    navigate("Transfer", {
                      WalletSchema: WalletSchema,
                      ws: ws
                    })}
              />
              <Text style={styles.Text}>转{'  '}账</Text>
            </View>
            <View style={{flexDirection: "column", marginLeft:20, marginRight: 20}}>
              <Icon
                containerStyle={styles.Icon}
                size={34}
                reverse
                name="view-week"
              />
              <Text style={styles.Text}>收{'  '}款</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    ) : (
      <View style={styles.Background}>
        <Animatable.Text animation="fadeInDown" style={styles.Welcome}>
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
            title="通过助记词导入钱包"
            outline="black"
            color="black"
            onPress={() =>
              navigate("ImportSeedPhrase", { WalletSchema: WalletSchema })
            }
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp">
          <Button
            buttonStyle={styles.CreateButton}
            raised
            rounded
            title="通过私钥导入钱包"
            outline="black"
            color="black"
            onPress={() =>
              navigate("ImportPrivateKey", { WalletSchema: WalletSchema })
            }
          />
        </Animatable.View>
      </View>
    );
  }
}

const MyWallet = StackNavigator({
  Main: { screen: ManagementList },
  GenerateKeystore: { screen: GenerateKeystoreInterface },
  ImportSeedPhrase: { screen: ImportSeedPhraseInterface },
  //ImportKeystore: {screen: ImportKeystoreInterface},
  ImportPrivateKey: { screen: ImportPrivateKeyInterface },
  Transfer: { screen: TransferInterface },
  Purchase: { screen: PurchaseInterface }
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
    backgroundColor: "pink",
    fontFamily: "Times"
  },
  Card: {
    flex: 1,
    backgroundColor: "#272727",
    paddingLeft: 30,
    height: 200,
    margin: 10,
    borderRadius: 20,
    shadowColor: "darkgrey",
    shadowOffset: {width: 4, height: 4}
  },
  Title: {
    color: "white",
    fontSize: 40,
    textAlign: "left",
    marginTop: 20,
    marginBottom: 50,
    fontFamily: "Chalkduster"
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
    backgroundColor: "blue",
    color: "white",
    height: 120,
    margin: 10
  },
  walletAddress: {
    flex: 3,
    color: "white",
    fontSize: 22,
    //marginTop: 10,
    fontFamily: "Times"
  },
  Icon: {
    flex: 3,
    backgroundColor:"#272727",
    marginTop: 30,
    marginBottom: 14,
    fontFamily: "Times"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0
  },
  Text: {
    flex: 1,
    color: "#272727",
    fontSize: 18,
    textAlign: "center"
  }
});
