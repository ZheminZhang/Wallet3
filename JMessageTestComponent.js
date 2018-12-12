/* JMessage测试 */

import React, { Component } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';

import JPushModule from 'jpush-react-native';
import JMessage from 'jmessage-react-plugin';

var listener = (message) => {
  //alert(message.text)
  JMessage.createConversation({ type: 'single', username: 'user2', appKey: '1f1558cafbf2dd3946981f0b' },
  (conversation) => {
    // do something.

  }, (error) => {
    var code = error.code
    var desc = error.description
  })
}
JMessage.addReceiveMessageListener(listener) // 添加监听

var listener = (event) => { alert(event.type) }

JMessage.addLoginStateChangedListener(listener) // 添加监听

type Props = {};
export default class JMessageTest extends Component<Props> {
  constructor(props){
  super(props);
  this.state = {
        username: '',
        password: '',
        to: '',
        content: ''
    }
  }
  setPassword(text) {
    this.setState({password: text})
  }
  setUsername(text) {
    this.setState({username: text})
  }
  setTo(text) {
    this.setState({to: text})
  }
  setContent(text) {
    this.setState({content: text})
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="请输入用户名"
              style={styles.Address}
              onChangeText={(text) => this.setUsername(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View>
            <TextInput
              placeholder="请输入密码"
              style={styles.Password}
              onChangeText={(text) => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button
              title="注册"
              onPress={this.register.bind(this)}
              color="#841584">
            </Button> 
            <Button
              title="登录"
              onPress={this.login.bind(this)}
              color="#841584">
            </Button> 
            <Button
              title="注销"
              onPress={this.logout.bind(this)}
              color="#841584">
            </Button> 
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="聊友"
              style={styles.Address}
              onChangeText={(text) => this.setTo(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="聊天内容"
              style={styles.Address}
              onChangeText={(text) => this.setContent(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View>
            <Button
              title="发送"
              onPress={this.send.bind(this)}
              color="#841584">
            </Button>
          </View>
        </View>
      );
  }

  // 注册
  register() {
    //alert(this.state.username)
    JMessage.register({
     username: this.state.username,
     password: this.state.password
    }, () => {/*注册成功回调*/alert('注册成功')}, (error) => {/*注册失败回调*/alert(error.code)})
  }

  //登录
  login() {
    JMessage.login({
     username: this.state.username,
     password: this.state.password
    }, () => {/*登录成功回调*/alert('登录成功')}, (error) => {/*登录失败回调*/alert(error.code)})
  }

  //注销
  logout() {
    JMessage.getMyInfo((UserInf) => {
      if (UserInf.username === undefined) {
          alert("未登录")
      } else {
          JMessage.logout()
          alert(UserInf.username + "已注销")
      }
    })
  }

  //发送消息
  send() {
    JMessage.createSendMessage({type: 'single', username: this.state.to, appKey: '1f1558cafbf2dd3946981f0b', messageType: 'text',text:this.state.content}, (message) => {
    JMessage.sendMessage({id: message.id, type: 'single', username: this.state.to}, () => {
    // 成功回调
    alert('发送成功')
    }, () => {
      // 失败回调
      //alert('发送失败')
    })})
  }
}

const styles = StyleSheet.create({
  Address: {
    textAlign: 'center',
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 3
  },
  Phrase: {
    textAlign: 'center',
    height: 40,
    width: 90,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 3
  },
  Password: {
    textAlign: 'center',
    height: 40,
    width: 200,
    borderColor: 'red',
    borderWidth: 2,
    margin: 3
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})