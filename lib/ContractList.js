import CallSmartContract from './CallSmartContractComponent'

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
import {
    StackNavigator,
} from 'react-navigation';

var SmartContractList;
// 将智能合约部署到服务器

type Props = {};
export default class ContractList extends Component<Props> {

    constructor(props){
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                {this.props.buttons.map((elem, index) => {
                    return(
                        <View key={index} style={{height:100,alignItems:'center',backgroundColor:'#FFFFE0',borderWidth:5,borderColor:'white'}}>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text>{elem[0]}</Text>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Button title={elem[1]} onPress={() => navigate('Contract', {contractAddr: elem[0], contractName: elem[1]})} color="#1E90FF"> </Button>
                            </View>
                        </View>
                );
                })}
            </View>
    );
    }
}

const styles = StyleSheet.create({
    Phrase: {
        textAlign: 'center',
        height: 30,
        width: 90,
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
    Caption: {
        color: '#FF7700',
        fontSize: 30,
        fontWeight: 'bold',
        margin:5
    },
    Address: {
        color: '#2D9900',
        fontSize: 32,
        fontWeight: 'bold',
        textShadowColor: '#C0C0C0',
        textShadowRadius: 2,
        textShadowOffset: {width:2,height:2},
        margin:5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})