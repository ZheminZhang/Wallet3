"use strict";

import React from "react";
import ReactNative from "react-native";
import JMessage from "jmessage-react-plugin";

const { View } = ReactNative;

export default class LaunchChat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { navigate } = this.props.navigation;
    var params = {
      appkey: "4dc08da5773df4784e216e5c",
      isOpenMessageRoaming: false,
      isProduction: true,
      channel: ""
    };
    JMessage.init(params);
    JMessage.getMyInfo(myInfo => {
      if (myInfo.username) {
        navigate("ConversationList");
        // navigate('MainPage')
        // navigate('ConversationList')
      } else {
        navigate("Login");
        // navigate('Chat')
      }
    });
  }

  render() {
    return <View />;
  }
}
