import React, { useState, useEffect } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import io from 'socket.io-client';

const Chat = () => {

 

    useEffect(() => {
        const socket = io('http://192.168.1.7:3000');

        socket.on('connect', () => {
            console.log('Connesso al server');
        });
    })
    return (
        <Text>Chat</Text>
    )
}

export default Chat;