/* 下载智能合约 */
import DeploySmartContract from "./DeploySmartContractComponent";
import CallSmartContract from "./CallSmartContractComponent";
import ContractList from "./ContractList";
import checkAddress from "./src/checkAddress";
import httpRequest from "./src/httpRequest";

import ScrollableTabView from "react-native-scrollable-tab-view";
import React, { Component } from "react";
import {
  ScrollView,
  Platform,
  StyleSheet,
  View,
  Dimensions
} from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { StackNavigator } from "react-navigation";
import Realm from "realm";

var SmartContractList;
var { width, height } = Dimensions.get("window");
// 将智能合约部署到服务器
type Props = {};
class ContractHomeList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
      sellButtons: [],
      buyButtons: []
    };
  }

  componentWillMount() {
    this.Refresh();
  }

  static navigationOptions = {
    //标题
    headerTitle: "交易"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  Refresh() {
    this.setState({ buttons: [], sellButtons: [], buyButtons: [] });
    timestamp = new Date().getTime();
    //alert(timestamp);
    httpRequest(
      { loadContract: [state, timestamp, wallets[0].address] },
      response => {
        this.setState({ buttons: [], sellButtons: [], buyButtons: [] });
        if (response.err) {
          alert(response.err);
        }
        var contract = response;
        if (response.timestamp === timestamp) {
          SmartContractList = contract.SmartContractList;
          for (var addr in contract) {
            if (checkAddress(addr) == "ETH") {
              //alert(contract[addr]);
              name = contract[addr][0];
              value = contract[addr][1];
              price = contract[addr][2];
              //this.buttons.push([addr, name]);
              if (name == "Buy") {
                this.state.buyButtons.push([addr, name, value, price]);
              } else if (name == "Sell") {
                this.state.sellButtons.push([addr, name, value, price]);
              }
            }
          }
          this.setState({});
        }
      }
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollableTabView
        onChangeTab={obj => {
          state = obj.i;
          this.Refresh();
        }}
      >
        <View tabLabel="所有交易" style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 22,
                fontWeight: "bold"
              }}
            >
              卖单
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 22,
                fontWeight: "bold"
              }}
            >
              买单
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <ScrollView style={{ height: 0.55 * height, width: 0.5 * width }}>
              <ContractList
                buttons={this.state.sellButtons}
                navigation={this.props.navigation}
              />
            </ScrollView>
            <Text style={styles.Divider} />
            <ScrollView style={{ height: 0.55 * height, width: 0.5 * width }}>
              <ContractList
                buttons={this.state.buyButtons}
                navigation={this.props.navigation}
              />
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 2 }}>
              <Button
                buttonStyle={styles.BuySell}
                raised
                rounded
                title="创建卖单"
                outline="black"
                color="black"
                onPress={() =>
                  navigate("Contract", {
                    contractName: "Sell",
                    contractTitle: "创建卖单"
                  })
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Icon
                containerStyle={styles.Refresh}
                size={34}
                iconStyle={{ color: "black" }}
                reverse
                name="refresh"
                onPress={this.Refresh.bind(this)}
              />
            </View>
            <View style={{ flex: 2 }}>
              <Button
                buttonStyle={styles.BuySell}
                raised
                rounded
                title="创建买单"
                outline="black"
                color="black"
                onPress={() =>
                  navigate("Contract", {
                    contractName: "Buy",
                    contractTitle: "创建买单"
                  })
                }
              />
            </View>
          </View>
        </View>
        <View tabLabel="我的交易" style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 22,
                fontWeight: "bold"
              }}
            >
              卖单
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 22,
                fontWeight: "bold"
              }}
            >
              买单
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <ScrollView style={{ height: 0.55 * height, width: 0.5 * width }}>
              <ContractList
                buttons={this.state.sellButtons}
                navigation={this.props.navigation}
              />
            </ScrollView>
            <Text style={styles.Divider} />
            <ScrollView style={{ height: 0.55 * height, width: 0.5 * width }}>
              <ContractList
                buttons={this.state.buyButtons}
                navigation={this.props.navigation}
              />
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 2 }}>
              <Button
                buttonStyle={styles.BuySell}
                raised
                rounded
                title="创建卖单"
                outline="black"
                color="black"
                onPress={() =>
                  navigate("Contract", {
                    contractName: "Sell",
                    contractTitle: "创建卖单"
                  })
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Icon
                containerStyle={styles.Refresh}
                size={34}
                iconStyle={{ color: "black" }}
                reverse
                name="refresh"
                onPress={() => this.Refresh}
              />
            </View>
            <View style={{ flex: 2 }}>
              <Button
                buttonStyle={styles.BuySell}
                raised
                rounded
                title="创建买单"
                outline="black"
                color="black"
                onPress={() =>
                  navigate("Contract", {
                    contractName: "Buy",
                    contractTitle: "创建买单"
                  })
                }
              />
            </View>
          </View>
        </View>
        <View tabLabel="已确认交易" style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 22,
                fontWeight: "bold"
              }}
            >
              卖单
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 22,
                fontWeight: "bold"
              }}
            >
              买单
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <ScrollView style={{ height: 0.55 * height, width: 0.5 * width }}>
              <ContractList
                buttons={this.state.sellButtons}
                navigation={this.props.navigation}
              />
            </ScrollView>
            <Text style={styles.Divider} />
            <ScrollView style={{ height: 0.55 * height, width: 0.5 * width }}>
              <ContractList
                buttons={this.state.buyButtons}
                navigation={this.props.navigation}
              />
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 2 }}>
              <Button
                buttonStyle={styles.BuySell}
                raised
                rounded
                title="创建卖单"
                outline="black"
                color="black"
                onPress={() =>
                  navigate("Contract", {
                    contractName: "Sell",
                    contractTitle: "创建卖单"
                  })
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Icon
                containerStyle={styles.Refresh}
                size={34}
                iconStyle={{ color: "black" }}
                reverse
                name="refresh"
                onPress={() => this.Refresh}
              />
            </View>
            <View style={{ flex: 2 }}>
              <Button
                buttonStyle={styles.BuySell}
                raised
                rounded
                title="创建买单"
                outline="black"
                color="black"
                onPress={() =>
                  navigate("Contract", {
                    contractName: "Buy",
                    contractTitle: "创建买单"
                  })
                }
              />
            </View>
          </View>
        </View>
      </ScrollableTabView>
    );
  }
}

class ContractInterface extends Component<Props> {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    // 展示数据 "`" 不是单引号
    title: `${navigation.state.params.contractTitle}`
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <DeploySmartContract
        bin={SmartContractList[params.contractName].bin}
        abi={SmartContractList[params.contractName].abi}
        deployConfig={SmartContractList[params.contractName].deployConfig}
        contractName={params.contractName}
        WalletSchema={WalletSchema}
      />
    );
  }
}

class ContractInterface2 extends Component<Props> {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    // 展示数据 "`" 不是单引号
    title: `${navigation.state.params.contractTitle}`
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <CallSmartContract
        abi={SmartContractList[params.contractName].abi}
        callConfig={SmartContractList[params.contractName].callConfig}
        contractAddr={params.contractAddr}
        WalletSchema={WalletSchema}
        contractState={state}
      />
    );
  }
}

const MyContract = StackNavigator({
  Main: { screen: ContractHomeList },
  Contract: { screen: ContractInterface },
  Contract2: { screen: ContractInterface2 }
});

export default class LoadSmartContract extends React.Component {
  constructor(props) {
    super(props);
    WalletSchema = this.props.WalletSchema;
    realm = new Realm({ schema: [WalletSchema] });
    wallets = realm.objects("Wallet");
    state = this.props.contractState;
    timestamp = new Date().getTime();
  }
  render() {
    return <MyContract />;
  }
}

const styles = StyleSheet.create({
  Divider: {
    backgroundColor: "red",
    width: 2,
    height: 0.55 * height,
    marginTop: 20
  },
  container: {
    backgroundColor: "white",
    height: height
  },
  Refresh: {
    backgroundColor: "transparent"
  },
  BuySell: {
    marginTop: 20,
    backgroundColor: "#A6FFFF",
    fontFamily: "Times"
  }
});
