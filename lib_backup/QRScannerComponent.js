import { QRScannerView } from 'ac-qrcode';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AlertIOS,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
 
export default class DefaultScreen extends Component {
    render() {
        return (
            < QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()}
            />
        )
    }
 
    _renderTitleBar(){
        return(
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            >这里添加标题</Text>
        );
    }
 
    _renderMenu() {
        return (
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            >这里添加底部菜单</Text>
        )
    }
 
    barcodeReceived(e) {
        alert('Type: ' + e.type + '\nData: ' + e.data);
        return;
        //console.log(e)
    }
}