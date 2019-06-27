"use strict";

import React from "react";
import ReactNative from "react-native";
import JMessage from "jmessage-react-plugin";
import { Button, Icon, Avatar, Input, Text } from "react-native-elements";
import * as Animatable from "react-native-animatable";

const { ScrollView, View, StyleSheet, TextInput } = ReactNative;

export default class Register extends React.Component {
  static navigationOptions = {
    title: "注册"
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onPress() {
    JMessage.register(
      { username: this.state.username, password: this.state.password },
      () => {
        alert("register succeed");
      },
      error => {
        alert("register failed", JSON.stringify(error));
      }
    );
  }

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
              size="xlarge"
              overlayContainerStyle={{ backgroundColor: "transparent" }}
              rounded
              icon={{ name: "account-circle", color: "black" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Text}>Register</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp">
            <Input
              label="用户名"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              placeholder="请输入用户名"
              onChangeText={e => this.setState({ username: e })}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="密码"
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              placeholder="请输入密码"
              onChangeText={e => this.setState({ password: e })}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <Button
              type="outline"
              buttonStyle={styles.buttonRegister}
              title="注册"
              titleStyle={{ color: "red" }}
              onPress={this.onPress.bind(this)}
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
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50
  },
  Text: {
    flex: 3,
    fontSize: 30,
    paddingLeft: 5,
    color: "black",
    fontFamily: "Apple Color Emoji"
  },
  buttonLogin: {
    flex: 1,
    backgroundColor: "green",
    fontFamily: "italic",
    marginTop: 50
  },
  buttonRegister: {
    flex: 1,
    borderColor: "red",
    fontFamily: "italic",
    marginTop: 50
  },
  Icon: {
    flex: 1
  }
});
