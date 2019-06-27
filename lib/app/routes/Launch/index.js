"use strict";

import React from "react";
import ReactNative from "react-native";
import JMessage from "jmessage-react-plugin";

const { View } = ReactNative;

export default class Launch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { navigate } = this.props.navigation;
    JMessage.getMyInfo(myInfo => {
      if (myInfo.username) {
        navigate("MyInfo");
      } else {
        navigate("Login");
      }
    });
  }

  render() {
    return <View />;
  }
}
