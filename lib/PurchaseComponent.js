/* 购买数字货币 */

const purchase = require("./src/purchase");

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import * as Animatable from "react-native-animatable";

// 将交易信息发送到服务器
type Props = {};
export default class Purchase extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animatable.View
        animation="slideInLeft"
        style={{ flexDirection: "column", marginLeft: 20, marginRight: 20 }}
      >
        <Icon
          containerStyle={styles.Button}
          size={34}
          reverse
          name="attach-money"
          onPress={this.onButtonPress.bind(this)}
        />
        <Text style={styles.Text}>购{"  "}买</Text>
      </Animatable.View>
    );
  }

  onButtonPress() {
    //purchase(this.state.password, txOptions, global.ws)
    purchase(this.props.ws, this.props.WalletSchema);
  }
}

const styles = StyleSheet.create({
  Button: {
    flex: 3,
    backgroundColor: "#272727",
    marginTop: 30,
    marginBottom: 14,
    fontFamily: "Times"
  },
  Text: {
    flex: 1,
    color: "#272727",
    fontSize: 18,
    textAlign: "center"
  }
});
