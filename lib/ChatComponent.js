
'use strict';
import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation';

import LaunchPage from './app/routes/Launch/index.js';
import HomePage from './app/routes/Home/index.js';
import LoginPage from './app/routes/Login/index.js';
import ChatPage from './app/routes/Chat/index.js';
import UpdateMyInfoPage from './app/routes/UpdateMyInfo/index.js';
import GroupsPage from './app/routes/Groups/index.js';
import FriendInfoPage from './app/routes/FriendInfo/index.js';
import RegisterPage from './app/routes/Register/index.js';

const ReactJChat = StackNavigator({
  Launch: { screen: LaunchPage },
  Home: {
     screen: HomePage ,
     navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false,
    },
  },
  Login: {
    screen: LoginPage,
    navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false,
    },
  },
  Chat: {
    type: 'Reset',
    screen: ChatPage,
    path: 'people/:conversation'
  },
  UpdataMyInfo: {
    type: 'Reset',
    screen: UpdateMyInfoPage,
  },
  Groups: {
    type: 'Reset',
    screen: GroupsPage,
  },
  FriendInfo: {
    type: 'Reset',
    screen: FriendInfoPage,
    path: 'people/:user'
  },
  Register: {
    type: 'Reset',
    screen: RegisterPage,
  }
});

module.exports = ReactJChat