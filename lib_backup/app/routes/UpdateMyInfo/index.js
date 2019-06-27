"use strict";

import React from "react";

var { PropTypes, Component } = React;

import ReactNative from "react-native";
import JMessage from "jmessage-react-plugin";
import ListItem from "../../views/ListItem";
import Icon from "react-native-vector-icons/Ionicons";
import { Input, Avatar } from "react-native-elements";

const {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Button,
  Alert,
  Image,
  Modal,
  DatePickerIOS,
  Picker,
  ScrollView
} = ReactNative;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#cccccc"
  },
  avatar: {
    width: 60,
    height: 60
  },
  icon: {
    width: 26,
    height: 26
  },
  username: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    width: 200,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  modalButton: {}
});

export default class UpdataMyInfoScreen extends Component {
  static navigationOptions = {
    title: "个人信息"
  };
  constructor(props) {
    super(props);
    this.state = {
      myInfo: {},
      isShowModal: false,
      isShowPickModal: false,
      modalText: "",
      theDate: new Date(),
      pickGender: "male"
    };
    this.field = "";
    this.updateMyInfo = this.updateMyInfo.bind(this);
  }

  updateMyInfo() {
    JMessage.getMyInfo(user => {
      this.setState({ myInfo: user });
    });
  }

  componentWillMount() {
    const normalColor = "rgb(22,131,251)";
    Icon.getImageSource("md-contact", 50, normalColor).then(source =>
      this.setState({ nickName: source })
    );
    Icon.getImageSource("md-transgender", 50, normalColor).then(source =>
      this.setState({ gender: source })
    );
    Icon.getImageSource("md-flag", 50, normalColor).then(source =>
      this.setState({ region: source })
    );
    Icon.getImageSource("md-star-half", 50, normalColor).then(source =>
      this.setState({ signature: source })
    );
    Icon.getImageSource("md-calendar", 50, normalColor).then(source =>
      this.setState({ birthday: source })
    );
  }

  componentDidMount() {
    this.updateMyInfo();
  }

  render() {
    if (this.state.myInfo.avatarThumbPath === "") {
      this.avatar = (
        // <Image
        //   source={require("../../resource/group-icon.png")}
        //   style={styles.avatar}
        // />
        <Avatar
          size="large"
          overlayContainerStyle={{ backgroundColor: "black" }}
          rounded
          showEditButton
          icon={{ name: "drupal", type: "font-awesome", color: "white" }}
          activeOpacity={0.7}
        />
      );
    } else {
      this.avatar = (
        <Image
          source={{
            isStatic: true,
            uri: this.state.myInfo.avatarThumbPath,
            scale: 1
          }}
          style={styles.avatar}
        />
      );
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Modal transparent={true} visible={this.state.isShowModal}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Input
                placeholder="输入修改的内容"
                onChangeText={e => {
                  this.setState({ modalText: e });
                }}
              />
              <Button
                onPress={() => {
                  var params = {};
                  params[this.field] = this.state.modalText;

                  JMessage.updateMyInfo(
                    params,
                    user => {
                      JMessage.getMyInfo(myinfo => {
                        this.setState({ myInfo: myinfo, modalText: "" });
                      });
                    },
                    error => {}
                  );
                  this.setState({ isShowModal: false });
                }}
                style={styles.modalButton}
                title="修改"
              />

              <Button
                onPress={() => {
                  this.setState({ isShowModal: false });
                }}
                style={styles.modalButton}
                title="离开"
              />
            </View>
          </View>
        </Modal>

        <Modal transparent={false} visible={this.state.isShowPickModal}>
          <View>
            <DatePickerIOS
              date={this.state.theDate}
              mode="datetime"
              onDateChange={date => {
                this.setState({ theDate: date });
                this.birthday = date.getTime() / 1000;
              }}
            />
          </View>
          <Button
            title={"修改生日"}
            onPress={() => {
              this.setState({ isShowPickModal: false });
              JMessage.updateMyInfo(
                { birthday: this.birthday },
                () => {
                  JMessage.getMyInfo(myinfo => {
                    this.setState({ myInfo: myinfo });
                  });
                },
                error => {
                  Alert.alert("error", JSON.stringify(error));
                }
              );
            }}
          />

          <Picker
            selectedValue={this.state.pickGender}
            onValueChange={gender => {
              this.gender = gender;
              this.setState({ pickGender: gender });
            }}
          >
            <Picker.Item label="男" value="male" />
            <Picker.Item label="女" value="female" />
          </Picker>

          <Button
            title={"修改性别"}
            onPress={() => {
              this.setState({ isShowPickModal: false });
              JMessage.updateMyInfo(
                { gender: this.gender },
                () => {
                  JMessage.getMyInfo(myinfo => {
                    this.setState({ myInfo: myinfo });
                  });
                },
                error => {
                  Alert.alert("error", JSON.stringify(error));
                }
              );
            }}
          />

          <Button
            title={"离开"}
            onPress={() => {
              this.setState({ isShowPickModal: false });
            }}
          />
        </Modal>

        <View style={[styles.header]}>
          {this.avatar}
          <Text style={[styles.username]}>{this.state.myInfo.nickname}</Text>
        </View>

        <ListItem
          title="昵称"
          content={this.state.myInfo.nickname}
          source={this.state.nickName}
          onPress={() => {
            this.field = "nickname";
            this.setState({ isShowModal: true });
          }}
        />

        <ListItem
          title="性别"
          content={this.state.myInfo.gender}
          source={this.state.gender}
          onPress={() => {
            this.setState({ isShowPickModal: true });
          }}
        />
        <ListItem
          title="地区"
          content={this.state.myInfo.region}
          source={this.state.region}
          onPress={() => {
            this.field = "region";
            this.setState({ isShowModal: true });
          }}
        />
        <ListItem
          title="个性签名"
          content={this.state.myInfo.signature}
          source={this.state.signature}
          onPress={() => {
            this.field = "signature";
            this.setState({ isShowModal: true });
          }}
        />
        <ListItem
          title="生日"
          content={this.state.myInfo.birthday}
          source={this.state.birthday}
          onPress={() => {
            this.field = "birthday";
            this.setState({ isShowPickModal: true });
          }}
        />
      </ScrollView>
    );
  }
}
