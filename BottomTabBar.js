import WalletManagement from "./lib/WalletManagementComponent";
import LoadSmartContract from "./lib/LoadSmartContractComponent";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/Ionicons";
import QRScanner from "./lib/QRScannerComponent";
import Chat from "./lib/ChatComponent";
import JMessageTest from "./JMessageTestComponent";
import ExportPrivateKey from "./lib/ExportPrivateKeyComponent";
import ExportSeed from "./lib/ExportSeedComponent";
import GetCoinPrice from "./lib/GetCoinPriceComponent";

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";
import Realm from "realm";

//底部导航栏
export default class BottomTabBar extends Component {
  static defaultProps = {
    selectedColor: "rgb(22,131,251)",
    normalColor: "#a9a9a9"
  };

  constructor(props) {
    super(props);
    this.state = {
      selectIndex: 0
    };
  }

  render() {
    return (
      <TabNavigator tabBarStyle={{ height: 78 }}>
        <TabNavigator.Item
          title="钱包管理"
          titleStyle={styles.tabText}
          selected={0 == this.state.selectIndex}
          renderIcon={() => (
            <Image source={this.state.walletNormal} style={styles.icon} />
          )}
          renderSelectedIcon={() => (
            <Image source={this.state.walletSelected} style={styles.icon} />
          )}
          onPress={() => this.setState({ selectIndex: 0 })}
        >
          <View style={{ flex: 1 }}>
            <WalletManagement
              ws={this.props.ws}
              WalletSchema={this.props.WalletSchema}
            />
          </View>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="交易"
          titleStyle={styles.tabText}
          selected={2 == this.state.selectIndex}
          renderIcon={() => (
            <Image source={this.state.transferNormal} style={styles.icon} />
          )}
          renderSelectedIcon={() => (
            <Image source={this.state.transferSelected} style={styles.icon} />
          )}
          onPress={() => this.setState({ selectIndex: 2 })}
        >
          <View style={{ flex: 1 }}>
            <LoadSmartContract
              ws={this.props.ws}
              WalletSchema={this.props.WalletSchema}
              contractState={0}
            />
          </View>
        </TabNavigator.Item>
        {/* <TabNavigator.Item
          title="已确认订单"
          titleStyle={styles.tabText}
          selected={3 == this.state.selectIndex}
          renderIcon={() => (
            <Image source={this.state.contractNormal} style={styles.icon} />
          )}
          renderSelectedIcon={() => (
            <Image source={this.state.contractSelected} style={styles.icon} />
          )}
          onPress={() => this.setState({ selectIndex: 3 })}
        >
          <View style={{ flex: 1 }}>
            <LoadSmartContract1
              ws={this.props.ws}
              WalletSchema={this.props.WalletSchema}
              contractState1={1}
            />
          </View>
        </TabNavigator.Item> */}
        <TabNavigator.Item
          title="聊天"
          titleStyle={styles.tabText}
          selected={5 == this.state.selectIndex}
          renderIcon={() => (
            <Image source={this.state.shoppingNormal} style={styles.icon} />
          )}
          renderSelectedIcon={() => (
            <Image source={this.state.shoppingSelected} style={styles.icon} />
          )}
          onPress={() => this.setState({ selectIndex: 5 })}
        >
          <View style={{ flex: 1 }}>
            <Chat />
          </View>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
  componentWillMount() {
    const { selectedColor, normalColor } = this.props;
    Icon.getImageSource("md-basket", 50, normalColor).then(source =>
      this.setState({ walletNormal: source })
    );
    Icon.getImageSource("md-basket", 50, selectedColor).then(source =>
      this.setState({ walletSelected: source })
    );
    Icon.getImageSource("md-swap", 50, normalColor).then(source =>
      this.setState({ transferNormal: source })
    );
    Icon.getImageSource("md-swap", 50, selectedColor).then(source =>
      this.setState({ transferSelected: source })
    );
    Icon.getImageSource("md-filing", 50, normalColor).then(source =>
      this.setState({ contractNormal: source })
    );
    Icon.getImageSource("md-filing", 50, selectedColor).then(source =>
      this.setState({ contractSelected: source })
    );
    Icon.getImageSource("md-planet", 50, normalColor).then(source =>
      this.setState({ shoppingNormal: source })
    );
    Icon.getImageSource("md-planet", 50, selectedColor).then(source =>
      this.setState({ shoppingSelected: source })
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tabText: {
    color: "grey",
    fontSize: 12,
    paddingBottom: 20
  },
  icon: {
    width: 25,
    height: 25,
    margin: 3
  },
  border: {
    borderColor: "blue",
    borderWidth: 2,
    margin: 20
  }
});
