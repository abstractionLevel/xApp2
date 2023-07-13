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

    const userId = 3;
    const workerId = props.route.params.workerId
    const [messageInput, setMessageInput] = useState(null);
    const [isChatRoomExists, setIsChatRoomExists] = useState(null);
    const [chatRoomId , setChatRoomId] = useState(null);
    const {socket} = useSelector((state)=>state);

    //manda il messaggio al be della chat
    const sendMessage = () => {
        const pyaload = {
            message: messageInput,
            senderId: userId,
            recipientId: workerId
        }
        socket.emit('message', pyaload);
    }

    const saveReceivedMessage = async (response,id) => {
        const token = await AsyncStorage.getItem("logged");
        const pyload = {
            text: response.message,
            sender: {
                userId: response.senderId
            },
            recipient: {
                userId: response.recipientId
            },
            chat: {
                id: id
            }
        }
        axios.post(Url.message, pyload, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log("ce un problema nel salvare il messaggio ", error);
        })
    }

    const checkIfChatRoomExists = async () => {
        const token = await AsyncStorage.getItem("logged");
        axios.get(Url.chat + "/" + 3 + "/" + 7, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }).then(response => {
            setChatRoomId(response.data.id);
            setIsChatRoomExists(true);
        }).catch(error => {
            if (error.response.status === 404) {
                setIsChatRoomExists(false);
            } 
        })
    }
    const createChatRoom = async (payload) => {
        const token = await AsyncStorage.getItem("logged");
        const chatPayload = {
            user1: {
                userId:payload.senderId,
            },
            user2: {
                userId:payload.recipientId,
            }
        }
        axios.post(Url.chat, chatPayload, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response=>{
            console.log("chat creata " , response.data)
            saveReceivedMessage(payload,response.data.id);
        }).catch(error=>{
            console.log("ce un errore nel salvataggio della chat ", error);
        });
    }
    
    useEffect(() => {
        //ricevo messaggio da chat-be
        // socket.on('message', (response) => {
        //     console.log("messaggio in entrata ", response)
        //     if (response) {
        //         if(isChatRoomExists) {
        //             saveReceivedMessage(response,chatRoomId)
        //         }else {
        //             //passo il response in mododo da salvare il messaggio dopo
        //             //aver creato la chat
        //             createChatRoom(response);
        //         }
        //     }
        // });

    }, [socket]);

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