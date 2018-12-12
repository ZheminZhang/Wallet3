'use strict';

import React from 'react';
import ReactNative from 'react-native';
import JMessage from 'jmessage-react-plugin';

import FormButton from '../../views/FormButton'

const {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Button,
    Alert,
    TextInput
} = ReactNative;

// justifyContent: 'center',
// alignItems: 'center',
const styles = StyleSheet.create({
    inputView: {
        margin: 10,
    },
    loginBtn: {
        color: "#ffffff",
        height: 30,
        backgroundColor: "#cccccc",
    }

})

export default class Login extends React.Component {
    static navigationOptions = {
        title: "登录"
    };

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        const { navigate } = this.props.navigation

        JMessage.login({username: this.state.username, password: this.state.password}, () => {
            Alert.alert('login success')
            navigate('Home')
        }, (error) => {
            Alert.alert('login fail', JSON.stringify(error))
        })
    }

    jumpToRegisterPage = () => {
        const  { navigate } = this.props.navigation
        navigate("Register")
    }

    render() {
        return (
        <View style={{flex: 1, }}>
            <TextInput
                style={styles.inputView}
                placeholder = "用户名"
                onChangeText = { (e) => { this.setState({username: e}) } }>
            </TextInput>
            <TextInput
                style={styles.inputView}
                placeholder = "密码"
                onChangeText = { (e) => { this.setState({password: e}) } }>
            </TextInput>
            <FormButton 
                style={styles.loginBtn}
                title="登录"
                onPress={this.onPress}
                >
            </FormButton>
            <Button
                style={{width: 100, height: 20, position: "absolute", left: 0, top: 1000}}
                onPress={this.jumpToRegisterPage}
                title="注册">
            </Button>
        </View>)
    }
}