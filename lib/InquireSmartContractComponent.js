/* 调用智能合约 */

const inquireSmartContract = require('./src/inquireSmartContract');
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';

// 将智能合约部署到服务器
type Props = {};
export default class InquireSmartContract extends Component<Props> {
  constructor(props){
  	super(props);
  	this.state = {
          args: []
      }
  }

  render() {
    var buttons = [];
      for (var i = 0; i < JSON.parse(this.props.inquireConfig).length; i++) {
        buttons[i] = [];
        this.state.args[i] = [];
        for (var j = 0; j < JSON.parse(this.props.inquireConfig)[i].args.length; j++) {
          buttons[i].push(j);
        }
      }
      return (
          <View style={{flex:3, justifyContent: 'center', alignItems: 'center',}}>
            {buttons.map((elem, index1) => {
              return(
                <View key={index1}>
                  {buttons[index1].map((elem, index2) => {
                    return(
                      <TextInput
                        key={index2}
                        placeholder={JSON.parse(this.props.inquireConfig)[index1].args[index2].name}
                        style={styles.Phrase}
                        onChangeText={(text) => {
                          this.state.args[index1][index2] = text;
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    );
                  })}
                    <Button
                      title={JSON.parse(this.props.inquireConfig)[index1].Chinese}
                      onPress={this.onButtonPress.bind(this, index1)}
                      color="#841584">
                    </Button> 
                </View>
              )}
            )}
          </View>
       
      );
  }

  onButtonPress(index) {
    for (var i = 0; i < this.state.args[index].length; i++) {
      if (JSON.parse(this.props.inquireConfig)[index].args[i].type == "number") {
        this.state.args[index][i] = Number(this.state.args[index][i]);
      }
    }
    inquireSmartContract(this.props.ws, this.props.abi, JSON.parse(this.props.inquireConfig)[index].name, this.state.args[index], this.props.contractAddr)
  }
}

const styles = StyleSheet.create({
  Phrase: {
    textAlign: 'center',
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 3
  },
  Password: {
    textAlign: 'center',
    height: 30,
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