import axios from '../http/axios';
import React, { useState, useEffect, useId } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AsyncStorage
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import io from 'socket.io-client';
import Url from '../utils/Urls';
import { useSelector } from 'react-redux';

const Chat = (props) => {

    const workerId = props.route.params.workerId
    const [messageInput, setMessageInput] = useState(null);
    const [isChatRoomExists, setIsChatRoomExists] = useState(null);
    const [chatRoomId , setChatRoomId] = useState(null);
    const {socket} = useSelector((state)=>state);
    const [principal,setPrincipal] = useState(null);
    const [messages,setMessages] = useState([]);

    //manda il messaggio al be della chat
    const sendMessage = () => {
        const pyaload = {
            message: messageInput,
            senderId: principal.userId,
            recipientId: workerId,
            chatRoomId: chatRoomId,
            isChatRoomExists:isChatRoomExists,
        }
        socket.emit('message', pyaload);
        if(chatRoomId===null) {
            checkIfChatRoomExists();
        }
    }

    const getMessages = async (chatRoomId) => {
        const token = await AsyncStorage.getItem("logged");
        axios.get(Url.chat + "/" + chatRoomId + "/messages" , {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response=>{
                console.log(response.data);
            }).catch(error=>{
                console.log("ce un errore nel prelevare i messaggi : ", error);
            })
    }

    const checkIfChatRoomExists = async () => {
        const token = await AsyncStorage.getItem("logged");
        const principalStored = await AsyncStorage.getItem("principal");
        const principaParse = JSON.parse(principalStored);
        setPrincipal(principaParse);
        axios.get(Url.chat + "/" + principaParse.userId + "/" + workerId, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }).then(response => {
            if(response.data) {
                setIsChatRoomExists(true);
                setChatRoomId(response.data.id);
                getMessages(response.data.id);
            }

        }).catch(error => {
            if (error.response.status === 404) {
                setIsChatRoomExists(false);
            } 
        })
    }

    useEffect(() => {
        checkIfChatRoomExists();
    },[])

    return (
        <View style={styles.conteiner}>
            <View style={styles.conteinerChat}>

            </View>
            <View style={styles.conteinerInput}>
                <TextInput
                    value={messageInput}
                    onChangeText={(text) => setMessageInput(text)}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.buttonSent}
                    onPress={sendMessage}
                >
                    <Text>Push</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = ScaledSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    conteinerChat: {

    },
    conteinerInput: {
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        height: '50@s',
        fontSize: 18,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.40,
        borderRadius: 3,
        width: '70%'
    },
    buttonSent: {
        backgroundColor: 'orange',
        width: '30%',
        height: '50@s',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Chat;