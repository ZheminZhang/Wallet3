/* 根据助记词导入钱包，并生成keystore */

const generateKeystore = require('./src/generateKeystore.js')
import * as Animatable from "react-native-animatable";
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Alert,
  ScrollView
} from 'react-native';
import { Button, Icon, Avatar, FormLabel, FormInput, FormValidationMessage, Text } from 'react-native-elements'

// 导入12个助记词并输入密码
type Props = {};
export default class ImportSeedPhrase extends Component<Props> {
  constructor(props){
        super(props);
          this.state = {
              text1:'',
              text2:'',
              text3:'',
              text4:'',
              text5:'',
              text6:'',
              text7:'',
              text8:'',
              text9:'',
              text10:'',
              text11:'',
              text12:'',
              password:'',
              password2:'',
              walletName: ''
        }
  }

  static navigationOptions = {
   //标题
    title: '通过助记词导入钱包',
     //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
  };

  setText1(text) {
    this.setState({text1: text})
  }
  setText2(text) {
    this.setState({text2: text})
  }
  setText3(text) {
    this.setState({text3: text})
  }
  setText4(text) {
    this.setState({text4: text})
  }
  setText5(text) {
    this.setState({text5: text})
  }
  setText6(text) {
    this.setState({text6: text})
  }
  setText7(text) {
    this.setState({text7: text})
  }
  setText8(text) {
    this.setState({text8: text})
  }
  setText9(text) {
    this.setState({text9: text})
  }
  setText10(text) {
    this.setState({text10: text})
  }
  setText11(text) {
    this.setState({text11: text})
  }
  setText12(text) {
    this.setState({text12: text})
  }
  setPassword(text) {
    this.setState({password: text})
  }
  setPassword2(text) {
    this.setState({password2: text})
  }
  setWalletName(text) {
    this.setState({walletName: text})
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
      <Animatable.View animation="fadeInDown" style={{flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignItems:'center'}}>
            <Avatar
              xlarge
              overlayContainerStyle={{backgroundColor: 'transparent'}}
              rounded
              icon={{name: 'invert-colors', color: '#009900'}}
              activeOpacity={0.7}
              containerStyle={styles.Icon}
            />
            <Text style={styles.Text}>Seed Phrase</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp">
          <View style={{flexDirection: 'row'}}>
            <FormInput
              placeholder="助记词1"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText1(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              placeholder="助记词2"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText2(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              placeholder="助记词3"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText3(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
      </View>
      <View style={{flexDirection: 'row'}}>
            <FormInput
              placeholder="助记词4"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText4(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              placeholder="助记词5"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText5(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              placeholder="助记词6"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText6(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
      </View>
      <View style={{flexDirection: 'row'}}>
            <FormInput
              placeholder="助记词7"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText7(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              placeholder="助记词8"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText8(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              placeholder="助记词9"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText9(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
      </View>
      <View style={{flexDirection: 'row'}}>
            <FormInput
              placeholder="助记词10"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText10(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              placeholder="助记词11"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText11(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              placeholder="助记词12"
              containerStyle={styles.Phrase}
              onChangeText={(text) => this.setText12(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
      </View>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" delay={50}>
          <FormLabel>钱包名称</FormLabel>
          <FormInput
            placeholder="请输入钱包名称"
            onChangeText={(text) => this.setWalletName(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormValidationMessage>{''}</FormValidationMessage>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={100}>
            <FormLabel>密码</FormLabel>
            <FormInput
              placeholder="请输入密码"
              onChangeText={(text) => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <FormValidationMessage>{''}</FormValidationMessage>
            </Animatable.View>
            <Animatable.View animation="fadeInUp" delay={150}>
            <FormLabel>重复密码</FormLabel>
            <FormInput
              placeholder="请再次输入密码"
              onChangeText={(text) => this.setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <FormValidationMessage>{''}</FormValidationMessage>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" delay={200}>
        <Button
            icon={{name: 'subdirectory-arrow-left'}}
            raised
            buttonStyle={styles.buttonContainer}
            title="导入钱包"
            disabled={this.state.loading}
            disabledStyle={{backgroundColor:'grey'}}
            loading={this.state.loading}
            onPress={this.onButtonPress.bind(this)}
          />
      </Animatable.View>
      </View>
      </ScrollView>
    );
  }

  async onButtonPress() {
    var seedPhrase = this.state.text1 + ' ' + this.state.text2 + ' ' + this.state.text3 + ' ' + this.state.text4
    seedPhrase += ' ' + this.state.text5 + ' ' + this.state.text6 + ' ' + this.state.text7 + ' ' + this.state.text8
    seedPhrase += ' ' + this.state.text9 + ' ' + this.state.text10 + ' ' + this.state.text11 + ' ' + this.state.text12
    var WalletSchema = this.props.navigation.state.params.WalletSchema;
    var args = []
    args.push(WalletSchema)
    args.push(this.state.walletName)
    args.push("ETH")
    args.push(this.state.password)
    args.push(seedPhrase)
    args.push(null)
    await generateKeystore(args);
    DeviceEventEmitter.emit("left", '导入钱包成功！');
    //await generateKeystore(WalletSchema, this.state.walletName, "ETH", this.state.password, seedPhrase);
    //alert('导入钱包成功')
  }
}

const styles = StyleSheet.create({
  Phrase: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
    marginBottom: 20
  },
  Password: {
    textAlign: 'center',
    justifyContent: 'center',
    height: 40,
  },
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
  },
  Icon: {
    flex: 1,
  },
  Text: {
    flex: 3,
    fontSize: 34,
    //paddingTop: 14,
    paddingLeft: 5,
    color: "#009900",
    fontFamily: "Apple Color Emoji"
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#009900",
    fontFamily: 'italic',
    marginTop: 20
  },
});