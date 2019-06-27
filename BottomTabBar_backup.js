import WalletManagement from "./lib/WalletManagementComponent";
import LoadSmartContract from "./lib/LoadSmartContractComponent";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/Ionicons";
import MyInfo from "./lib/MyInfoComponent";
import Chat from "./lib/ChatComponent";
//import JMessageTest from "./ChatUIComponent";

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";

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
          title="钱包"
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
          selected={1 == this.state.selectIndex}
          renderIcon={() => (
            <Image source={this.state.transferNormal} style={styles.icon} />
          )}
          renderSelectedIcon={() => (
            <Image source={this.state.transferSelected} style={styles.icon} />
          )}
          onPress={() => this.setState({ selectIndex: 1 })}
        >
          <View style={{ flex: 1 }}>
            <LoadSmartContract
              ws={this.props.ws}
              WalletSchema={this.props.WalletSchema}
              contractState={0}
            />
          </View>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="聊天"
          titleStyle={styles.tabText}
          selected={2 == this.state.selectIndex}
          renderIcon={() => (
            <Image source={this.state.chatNormal} style={styles.icon} />
          )}
          renderSelectedIcon={() => (
            <Image source={this.state.chatSelected} style={styles.icon} />
          )}
          onPress={() => this.setState({ selectIndex: 2 })}
        >
          <View style={{ flex: 1 }}>
            <Chat />
          </View>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="我的"
          titleStyle={styles.tabText}
          selected={3 == this.state.selectIndex}
          renderIcon={() => (
            <Image source={this.state.userNormal} style={styles.icon} />
          )}
          renderSelectedIcon={() => (
            <Image source={this.state.userSelected} style={styles.icon} />
          )}
          onPress={() => this.setState({ selectIndex: 3 })}
        >
          <View style={{ flex: 1 }}>
            <MyInfo />
          </View>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
  componentWillMount() {
    const { selectedColor, normalColor } = this.props;
    Icon.getImageSource("md-wallet", 50, normalColor).then(source =>
      this.setState({ walletNormal: source })
    );
    Icon.getImageSource("md-wallet", 50, selectedColor).then(source =>
      this.setState({ walletSelected: source })
    );
    Icon.getImageSource("md-card", 50, normalColor).then(source =>
      this.setState({ transferNormal: source })
    );
    Icon.getImageSource("md-card", 50, selectedColor).then(source =>
      this.setState({ transferSelected: source })
    );
    Icon.getImageSource("md-chatboxes", 50, normalColor).then(source =>
      this.setState({ chatNormal: source })
    );
    Icon.getImageSource("md-chatboxes", 50, selectedColor).then(source =>
      this.setState({ chatSelected: source })
    );
    Icon.getImageSource("md-contact", 50, normalColor).then(source =>
      this.setState({ userNormal: source })
    );
    Icon.getImageSource("md-contact", 50, selectedColor).then(source =>
      this.setState({ userSelected: source })
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
