/* 获得地址及二维码 */

import * as Animatable from "react-native-animatable";
import QRCode from "react-native-qrcode";
import Realm from "realm";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Text } from "react-native-elements";
import React, { Component } from "react";
import { StyleSheet, View, DeviceEventEmitter, ScrollView } from "react-native";

// 生成12个助记词并输入密码
type Props = {};
export default class GenerateKeystoreComponent extends Component<Props> {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    //标题
    title: "收款"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  render() {
    var WalletSchema = this.props.navigation.state.params.WalletSchema;
    var realm = new Realm({ schema: [WalletSchema] });
    var wallets = realm.objects("Wallet");
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <Animatable.View
            animation="fadeInDown"
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Avatar
              xlarge
              overlayContainerStyle={{ backgroundColor: "transparent" }}
              rounded
              icon={{ name: "account-box", color: "black" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Wallet}>My Address</Text>
          </Animatable.View>
          <Animatable.Text animation="fadeInUp">
            <Text style={styles.Address}>
              0x{wallets[0].address.slice(0, 19)}
              {"\n"}
              {wallets[0].address.slice(19)}
            </Text>
          </Animatable.Text>
          <Animatable.View
            animation="fadeInUp"
            style={{ alignItems: "center", marginTop: 60 }}
          >
            <QRCode
              value={"0x" + wallets[0].address}
              size={240}
              bgColor="black"
              fgColor="white"
            />
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 50
  },
  Wallet: {
    flex: 3,
    fontSize: 34,
    paddingLeft: 5,
    color: "black",
    fontFamily: "Apple Color Emoji"
  },
  Icon: {
    flex: 1
  },
  Address: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 26,
    color: "black",
    textAlign: "center"
  }
});
