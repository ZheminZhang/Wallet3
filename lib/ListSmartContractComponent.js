/* 下载智能合约 */
import DeploySmartContract from "./DeploySmartContractComponent";
import CallSmartContract from "./CallSmartContractComponent";
import ContractList from "./ContractList";
import checkAddress from "./src/checkAddress";
import inquireSmartContract from "./src/inquireSmartContract";

import React, { Component } from "react";
import {
  ScrollView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { Button } from "react-native-elements";
import { StackNavigator } from "react-navigation";

var SmartContractList;
var { width, height } = Dimensions.get("window");
// 将智能合约部署到服务器
type Props = {};
class ContractHomeList extends Component<Props> {
  constructor(props) {
    super(props);
    //this.A(this.props.ws);
    this.state = {
      buttons: [],
      sellButtons: [],
      buyButtons: []
    };
  }

  componentWillMount() {
    this.A(ws);
  }

  static navigationOptions = {
    //标题
    title: "合约商店"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  A(ws) {
    // ws.send(JSON.stringify({ listContract: "all" }));
    // ws.onmessage = e => {
    //   //alert(this)
    //   // 接收到了一个消息
    //   if (JSON.parse(e.data).err) {
    //     alert(JSON.parse(e.data).err);
    //   }
    //   //contractPath = fs.DocumentDirectoryPath + '/contract';
    //   SmartContractList = JSON.parse(e.data).ContractTemplateList;
    //   for (var key in SmartContractList) {
    //     this.state.buttons.push(key);
    //   }
    //   this.forceUpdate();
    // };

    ws.send(JSON.stringify({ loadContract: "all" }));
    ws.onmessage = e => {
      // 接收到了一个消息
      if (JSON.parse(e.data).err) {
        alert(JSON.parse(e.data).err);
      }
      var contract = JSON.parse(e.data);
      for (var addr in contract) {
        if (addr === "SmartContractList") {
          SmartContractList = contract[addr];
        } else if (checkAddress(addr) == "ETH") {
          contractInfo = contract[addr][0].split(",");
          name = contractInfo[0];
          value = contractInfo[1];
          price = contractInfo[2];
          //this.buttons.push([addr, name]);
          if (name == "Buy") {
            this.state.buyButtons.push([addr, name, value, price]);
          } else if (name == "Sell") {
            this.state.sellButtons.push([addr, name, value, price]);
          }
        }
      }
      this.forceUpdate();
    };
  }

  Refresh() {
    this.setState({ buttons: [], sellButtons: [], buyButtons: [] });
    this.A(ws);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <Button
            buttonStyle={styles.Refresh}
            raised
            rounded
            title="刷新"
            outline="black"
            color="black"
            onPress={this.Refresh.bind(this)}
          />
        </View>
        <View
          style={{
            flexDirection: "row"
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
            购买
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 22,
              fontWeight: "bold"
            }}
          >
            出售
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <ScrollView style={{ height: 0.6 * height, width: 0.5 * width }}>
            <ContractList
              buttons={this.state.sellButtons}
              navigation={this.props.navigation}
            />
          </ScrollView>
          <Text style={styles.Divider} />
          <ScrollView style={{ height: 0.6 * height, width: 0.5 * width }}>
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
          <View style={{ flex: 1 }}>
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <DeploySmartContract
            ws={ws}
            bin={SmartContractList[params.contractName].bin}
            abi={SmartContractList[params.contractName].abi}
            deployConfig={SmartContractList[params.contractName].deployConfig}
            contractName={params.contractName}
            WalletSchema={WalletSchema}
          />
        </View>
      </View>
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
      <View style={styles.container}>
        <View>
          <Text style={styles.Caption}>合约地址</Text>
          <Text style={styles.Address}>{params.contractAddr}</Text>
        </View>
        <CallSmartContract
          ws={ws}
          abi={SmartContractList[params.contractName].abi}
          callConfig={SmartContractList[params.contractName].callConfig}
          contractAddr={params.contractAddr}
          WalletSchema={WalletSchema}
        />
      </View>
    );
  }
}

const MyContract = StackNavigator({
  Main: { screen: ContractHomeList },
  Contract: { screen: ContractInterface },
  Contract2: { screen: ContractInterface2 }
});

export default class ListSmartContract extends React.Component {
  constructor(props) {
    super(props);
    ws = this.props.ws;
    WalletSchema = this.props.WalletSchema;
  }
  render() {
    return <MyContract />;
  }
}

const styles = StyleSheet.create({
  Divider: {
    backgroundColor: "red",
    width: 2,
    height: 0.6 * height,
    marginTop: 20
  },
  container: {
    backgroundColor: "white",
    height: height
  },
  Refresh: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "pink",
    fontFamily: "Times"
  },
  BuySell: {
    marginTop: 10,
    backgroundColor: "#A6FFFF",
    fontFamily: "Times"
  }
});
