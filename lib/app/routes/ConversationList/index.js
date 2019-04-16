"use strict";

import React from "react";
import ReactNative, { ScrollView } from "react-native";
import JMessage from "jmessage-react-plugin";
import { observer } from "mobx-react/native";
import { observable } from "mobx";

import FormButton from "../../views/FormButton";
import ConversationListStore from "./ConversationListStore";

const {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  Modal
} = ReactNative;
import { Button, Input, ListItem, Icon } from "react-native-elements";

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  conversationContent: {
    borderBottomWidth: 1,
    borderColor: "#cccccc",
    height: 60
  },
  conversationItem: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center"
  },
  conversationAvatar: {
    width: 45,
    height: 45,
    marginRight: 10
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    width: 200,
    height: 140,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15
  },
  modalButton: {
    margin: 10,
    marginBottom: 20
  }
});

var count = 0;

@observer
export default class ConversationList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <Button
          title="创建会话"
          onPress={() => {
            params.createConversation();
          }}
          type="clear"
        />
      ),
      title: "会话"
    };
  };

  _onCreateConversation() {
    this.setState({
      isShowModal: true
    });
  }

  constructor(props) {
    super(props);
    this.ConversationListStore = ConversationListStore;
    this.state = {
      data: [
        {
          key: "a"
        },
        {
          key: "b"
        }
      ],
      modalText: "",
      isShowModal: false,
      refresh: (new Map(): Map<string, boolean>)
    };
    this._onCreateConversation = this._onCreateConversation.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      createConversation: this._onCreateConversation
    });
    JMessage.setDebugMode({
      enable: true
    });
    JMessage.addReceiveMessageListener(message => {
      this.reloadConversationList();
    });
    JMessage.addSyncRoamingMessageListener(result => {
      var conv = result.conversation;
      console.log("Receive roaming conversation: " + JSON.stringify(conv));
      ConversationListStore.insertConversation(conv);
    });
  }

  componentWillMount() {
    this.reloadConversationList();
  }

  reloadConversationList() {
    JMessage.getConversations(
      result => {
        //alert(JSON.stringify(result));
        this.ConversationListStore.convertToConvList(result);
      },
      error => {
        Alert.alert(JSON.stringify(error));
      }
    );
  }

  enterConversation(item) {
    this.reloadConversationList();
    JMessage.enterConversation(
      { type: item.type, username: item.username, appKey: item.appKey },
      status => {},
      error => {}
    );
    this.props.navigation.navigate("Chat", {
      conversation: {
        type: item.type,
        username: item.username,
        appKey: item.appKey
      },
      callBack: () => {
        //在此调接口或者改变state会让页面改变
        this.reloadConversationList();
      }
    });
  }

  createConversation(params) {
    JMessage.createConversation(
      params,
      conv => {
        this.enterConversation(this.ConversationListStore.getListItem(conv));
      },
      error => {
        Alert.alert("create conversation error !", JSON.stringify(error));
      }
    );
  }

  deleteConversation = key => {
    //console.log("long press conversation, item key: " + key)
    this.ConversationListStore.deleteConversation(key);
    this.reloadConversationList();
  };

  keyExtractor = (item, index) => index;

  render() {
    this.listView = (
      <FlatList
        data={this.ConversationListStore.convList}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={({ item }) => (
          <View>
            <ListItem
              bottomDivider="true"
              onPress={() => {
                this.enterConversation(item);
              }}
              leftAvatar={{
                source: {
                  uri:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                }
              }}
              rightElement={
                <Button
                  onPress={this.deleteConversation.bind(this, item.key)}
                  type="clear"
                  style={{ marginLeft: 10 }}
                  titleStyle={{ color: "red" }}
                  title="删除"
                />
              }
              title={item.username}
              subtitle={item.latestMessageString}
            />
          </View>
        )}
      />
    );
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isShowModal}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Input
                inputStyle={{ textAlign: "center" }}
                containerStyle={{ marginTop: 20 }}
                placeholder="用户名"
                onChangeText={e => {
                  this.setState({ modalText: e });
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <Button
                  onPress={() => {
                    var params = {};
                    params.type = "single";
                    params.username = this.state.modalText;
                    this.setState({ isShowModal: false });
                    this.createConversation(params);
                  }}
                  type="outline"
                  style={styles.modalButton}
                  title="创建聊天"
                />
                <Button
                  onPress={() => {
                    this.setState({ isShowModal: false });
                  }}
                  type="outline"
                  buttonStyle={{ borderColor: "red" }}
                  titleStyle={{ color: "red" }}
                  style={styles.modalButton}
                  title="离开"
                />
              </View>
            </View>
          </View>
        </Modal>
        {this.listView}
      </ScrollView>
    );
  }
}
