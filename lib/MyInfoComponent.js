"use strict";
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import LaunchPage from "./app/routes/Launch/index.js";
import LoginPage from "./app/routes/Login/index.js";
import UpdateMyInfoPage from "./app/routes/UpdateMyInfo/index.js";
import RegisterPage from "./app/routes/Register/index.js";
import MyInfoPage from "./app/routes/MyInfo/index.js";

const ReactJMyInfo = StackNavigator({
  Launch: {
    screen: LaunchPage,
    navigationOptions: {
      headerStyle: { backgroundColor: "pink" }
    }
  },
  MyInfo: {
    screen: MyInfoPage,
    navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false,
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
  UpdataMyInfo: {
    type: "Reset",
    screen: UpdateMyInfoPage,
    navigationOptions: {
      headerStyle: { backgroundColor: "pink" },
      headerBackTitleStyle: { display: "none" }
    }
  },
  Register: {
    type: "Reset",
    screen: RegisterPage,
    navigationOptions: {
      headerStyle: { backgroundColor: "pink" },
      headerBackTitleStyle: { display: "none" }
    }
  }
});

module.exports = ReactJMyInfo;
