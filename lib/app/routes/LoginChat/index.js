"use strict";

import React from "react";
import ReactNative from "react-native";
import JMessage from "jmessage-react-plugin";

import { Button, Avatar, Text } from "react-native-elements";

const { ScrollView, View, StyleSheet, TextInput } = ReactNative;

// justifyContent: 'center',
// alignItems: 'center'

export default class LoginChat extends React.Component {
  constructor(props) {
    super(props);
  }
  onPress() {
    const { navigate } = this.props.navigation;

    JMessage.getMyInfo(myInfo => {
      if (myInfo.username) {
        navigate("ConversationList");
        // navigate('MainPage')
        // navigate('ConversationList')
      } else {
      }
    });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <Avatar
          size="xlarge"
          overlayContainerStyle={{
            backgroundColor: "transparent"
          }}
          containerStyle={{ marginLeft: 130 }}
          icon={{ name: "exclamation", type: "font-awesome", color: "red" }}
          activeOpacity={0.7}
        />
        <Text style={styles.Text}>您还未登录，请先登录</Text>
        <Button
          containerStyle={styles.Button}
          type="outline"
          title="刷新"
          onPress={this.onPress.bind(this)}
        />
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
    fontSize: 26,
    textAlign: "center",
    color: "black",
    fontFamily: "Heiti SC"
  },
  Button: {
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "italic",
    marginTop: 50
  }
});
