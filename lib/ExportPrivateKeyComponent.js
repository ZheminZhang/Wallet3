/* 导出私钥 */

const exportPrivateKey = require("./src/exportPrivateKey");

import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Button,
  Icon,
  Avatar,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text
} from "react-native-elements";
import * as Animatable from "react-native-animatable";

// 将交易信息发送到服务器
type Props = {};
export default class ExportPrivateKey extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }
  setPassword(text) {
    this.setState({ password: text });
  }
  static navigationOptions = {
    //标题
    headerTitle: "导出私钥"
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <Animatable.View
            animation="fadeInDown"
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Avatar
              xlarge
              overlayContainerStyle={{ backgroundColor: "transparent" }}
              rounded
              icon={{ name: "vpn-key", color: "gold" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Text}>Export Key</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp">
            <FormLabel>密码</FormLabel>
            <FormInput
              placeholder="请输入密码"
              onChangeText={text => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <FormValidationMessage>{""}</FormValidationMessage>
            <Button
              icon={{ name: "subdirectory-arrow-left" }}
              raised
              buttonStyle={styles.buttonContainer}
              title="导出私钥"
              onPress={this.onButtonPress.bind(this)}
            />
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }

  onButtonPress() {
    var args = [];
    args.push(this.state.password);
    args.push(this.props.navigation.state.params.WalletSchema);
    exportPrivateKey(args)
      .then(privateKey => alert(privateKey))
      .catch(error => alert(error));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50
  },
  Text: {
    flex: 3,
    fontSize: 34,
    paddingLeft: 5,
    color: "gold",
    fontFamily: "Apple Color Emoji"
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#009900",
    fontFamily: "italic",
    marginTop: 50
  },
  Icon: {
    flex: 1
  }
});
