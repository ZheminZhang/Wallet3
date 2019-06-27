"use strict";
import { StackNavigator } from "react-navigation";

import LaunchPage from "./app/routes/LaunchChat/index.js";
import LoginPage from "./app/routes/LoginChat/index.js";
import ConversationListPage from "./app/routes/ConversationList/index.js";
import ChatPage from "./app/routes/Chat/index.js";

const ReactJChat = StackNavigator({
  Launch: {
    screen: LaunchPage,
    navigationOptions: {
      headerStyle: { backgroundColor: "pink" }
    }
  },
  Login: {
    screen: LoginPage,
    navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false,
      headerStyle: { backgroundColor: "pink" }
    }
  },
  ConversationList: {
    screen: ConversationListPage,
    navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false,
      headerStyle: { backgroundColor: "pink" }
    }
  },
  Chat: {
    type: "Reset",
    screen: ChatPage,
    navigationOptions: {
      headerStyle: { backgroundColor: "pink" },
      headerBackTitleStyle: { display: "none" }
    }
  }
});

module.exports = ReactJChat;
