/* 根据助记词导入钱包，并生成keystore */

const generateKeystore = require('./src/generateKeystore.js')

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="助记词1"
              style={styles.Phrase}
              onChangeText={(text) => this.setText1(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="助记词2"
              style={styles.Phrase}
              onChangeText={(text) => this.setText2(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="助记词3"
              style={styles.Phrase}
              onChangeText={(text) => this.setText3(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="助记词4"
              style={styles.Phrase}
              onChangeText={(text) => this.setText4(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
      </View>
      <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="助记词5"
              style={styles.Phrase}
              onChangeText={(text) => this.setText5(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="助记词6"
              style={styles.Phrase}
              onChangeText={(text) => this.setText6(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="助记词7"
              style={styles.Phrase}
              onChangeText={(text) => this.setText7(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="助记词8"
              style={styles.Phrase}
              onChangeText={(text) => this.setText8(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
      </View>
      <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="助记词9"
              style={styles.Phrase}
              onChangeText={(text) => this.setText9(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="助记词10"
              style={styles.Phrase}
              onChangeText={(text) => this.setText10(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="助记词11"
              style={styles.Phrase}
              onChangeText={(text) => this.setText11(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="助记词12"
              style={styles.Phrase}
              onChangeText={(text) => this.setText12(text)}
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
      <View>
        <Button
          title="导入钱包"
          onPress={this.onButtonPress.bind(this)}
          color="#841584">
        </Button>
        </View>
      </View>
    );
  }

  async onButtonPress() {
    var seedPhrase = this.state.text1 + ' ' + this.state.text2 + ' ' + this.state.text3 + ' ' + this.state.text4
    seedPhrase += ' ' + this.state.text5 + ' ' + this.state.text6 + ' ' + this.state.text7 + ' ' + this.state.text8
    seedPhrase += ' ' + this.state.text9 + ' ' + this.state.text10 + ' ' + this.state.text11 + ' ' + this.state.text12
    var WalletSchema = this.props.navigation.state.params.WalletSchema;
    await generateKeystore(WalletSchema, this.state.walletName, this.state.walletType, this.state.password, seedPhrase);
    alert('导入钱包成功')
  }
}

const styles = StyleSheet.create({
  Phrase: {
    textAlign: 'center',
    height: 30,
    width: 80,
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
});