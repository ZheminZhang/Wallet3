"use strict";

import React from "react";
import ReactNative from "react-native";
import JMessage from "jmessage-react-plugin";
import { Button, Icon, Avatar, Input, Text } from "react-native-elements";
import * as Animatable from "react-native-animatable";

const { ScrollView, View, StyleSheet, TextInput } = ReactNative;

export default class Login extends React.Component {
  static navigationOptions = {
    title: "登录"
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onPress() {
    const { navigate } = this.props.navigation;

    JMessage.login(
      { username: this.state.username, password: this.state.password },
      () => {
        alert("login success");
        navigate("MyInfo", { username: this.state.username });
      },
      error => {
        alert("login fail", JSON.stringify(error));
      }
    );
  }

  jumpToRegisterPage = () => {
    const { navigate } = this.props.navigation;
    navigate("Register");
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
              size="xlarge"
              overlayContainerStyle={{ backgroundColor: "transparent" }}
              rounded
              icon={{ name: "account-circle", color: "black" }}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Text}>User Login</Text>
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
              buttonStyle={styles.buttonLogin}
              title="登录"
              titleStyle={{ color: "green" }}
              onPress={this.onPress.bind(this)}
            />
            <Button
              type="outline"
              buttonStyle={styles.buttonRegister}
              titleStyle={{ color: "red" }}
              title="注册"
              onPress={this.jumpToRegisterPage}
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
    fontFamily: "italic",
    borderColor: "green",
    marginTop: 50
  },
  buttonRegister: {
    flex: 1,
    fontFamily: "italic",
    borderColor: "red",
    marginTop: 50
  },
  Icon: {
    flex: 1
  }
});
