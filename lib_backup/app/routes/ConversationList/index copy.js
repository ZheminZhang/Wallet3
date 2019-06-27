'use strict';

import React from 'react';
import ReactNative, { ScrollView } from 'react-native';
import JMessage from 'jmessage-react-plugin';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

import FormButton from '../../views/FormButton';
import ConversationListStore from './ConversationListStore';

const {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Button,
    Alert,
    TextInput,
    FlatList,
    Image,
    Modal,
} = ReactNative;


const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
    conversationContent: {
        borderBottomWidth: 1,
        borderColor: "#cccccc",
        height: 60,
    },
    conversationItem: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },
    conversationAvatar: {
        width: 45,
        height: 45,
        marginRight: 10,
    },

    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        height: 300,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    modalButton: {
        margin: 10,
    },
    inputStyle: {
        width: 200
    }
});

var count = 0

@observer
export default class ConversationList extends React.Component {
    static navigationOptions = ({
        navigation
    }) => {
        const {
            params = {}
        } = navigation.state;
        return {
            headerRight: <Button title="创建会话" onPress={() => { params.createConversation() }} />,
            headerTitle: '会话'
        }
    };

    _onCreateConversation() {
        this.setState({
            isShowModal: true
        })
    }

    constructor(props) {
        super(props);
        this.ConversationListStore = ConversationListStore
        this.state = {
            //update: false,
            modalText: "",
            isShowModal: false,
            refresh: (new Map(): Map<string, boolean>)
        }
        this._onCreateConversation = this._onCreateConversation.bind(this)
    }

    componentDidMount() {
        this.props.navigation.setParams({
            createConversation: this._onCreateConversation
        });
        JMessage.setDebugMode({
            enable: true
        });
        JMessage.addReceiveMessageListener((message) => {
            //alert(message.text)
            var test = this.ConversationListStore.updateConversation(message);
            //alert(test)
            this.setState({})
        })
        JMessage.addSyncRoamingMessageListener((result) => {
            var conv = result.conversation;
            console.log("Receive roaming conversation: " + JSON.stringify(conv))
            ConversationListStore.insertConversation(conv)
        })
    }

    componentWillMount() {
        this.reloadConversationList()
    }

    reloadConversationList() {
        JMessage.getConversations((result) => {
            this.ConversationListStore.convertToConvList(result)
        }, (error) => {
            Alert.alert(JSON.stringify(error))
        })
    }

    enterConversation(item) {
        JMessage.enterConversation(item, (status) => { }, (error) => { })
        this.props.navigation.navigate('Chat', {
            conversation: { type: item.type, username: item.username, groupId: item.groupId, appKey: item.appKey }
        })
    }

    createConversation(params) {
        JMessage.createConversation(params, (conv) => {
            this.enterConversation(this.ConversationListStore.getListItem(conv))
        }, (error) => {
            Alert.alert('create conversation error !', JSON.stringify(error))
        })
    }

    enterChatRoom(item) {
        JMessage.enterChatRoom(item, (conversation) => {
            this.props.navigation.navigate('Chat', {
                conversation: { type: conversation.conversationType, roomId: conversation.target.roomId }
            })
        }, (error) => {
            console.alert("error, code: " + error.code + ", description: " + error.description)
        })
    }

    onItemLongPress = (key) => {
        console.log("long press conversation, item key: " + key)
        // this.ConversationListStore.deleteConversation(key)
    }

    keyExtractor = (item, index) => index;


    render() {
        var data=[];
        data=this.ConversationListStore.convList
        if (data.length>count){
            count++;
            this.setState({})
        }
        return (
            <View style={{marginTop:50}}>
                <Button title="创建会话" onPress={() => { this.setState({}) }} />
                <FlatList
                    data={data}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={
                        ({
                            item
                        }) => (
                            <View>
                                    <TouchableHighlight
                                        style={[styles.conversationContent]}
                                        underlayColor='#dddddd'
                                        onPress={() => {
                                            if (item.type === "chatroom") {
                                                this.enterChatRoom(item)
                                            } else {
                                                this.enterConversation(item)
                                            }
                                        }}
                                        onLongPress={this.onItemLongPress(item.key)}>
                                        <View style={[styles.conversationItem]}>
                                            <Image
                                                source={{uri: item.avatarThumbPath}}
                                                style={[styles.conversationAvatar]}>
                                            </Image>
                                            <View>
                                                <Text>{item.displayName}</Text>
                                                <Text>{item.latestMessageString}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            )
                    }>
                </FlatList>
            </View>)
    }
}