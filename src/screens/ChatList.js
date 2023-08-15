import React, {useState,useEffect} from "react";
import {
    View,
    Text,
    AsyncStorage,
    Image,
} from 'react-native';
import Url from "../utils/Urls";
import axios from "../http/axios";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';

const ChatList = () => {


    const [chatList,setChatlist] = useState(null);
    const navigation = useNavigation();

    const getChats = async () => {
        const token = await AsyncStorage.getItem("logged");
        const principalStored =  await AsyncStorage.getItem("principal");
        const principal = JSON.parse(principalStored);
        axios.get(Url.chat + "/users/"+principal.userId,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
           
            const chat = response.data.reduce((accumulator, currrentChat)=>{
                const latestMessage = currrentChat.messageList.reduce((accumulatorMessage,currentMessage)=>{
                    if(!accumulatorMessage || currentMessage.timestamp > accumulatorMessage.timestamp) {
                        return currentMessage;
                    }
                    return accumulatorMessage;
                },null)
                if(latestMessage) {
                    accumulator.push({
                        chatId:currrentChat.id,
                        latestMessage:latestMessage,
                        otherUser: currrentChat.user1.userId === principal.userId ? currrentChat.user2 : currrentChat.user1,
                    });
                }
                return accumulator;
            },[])
            setChatlist(chat);
        });
    }

    useEffect(()=>{
       getChats();
    },[]);

    return (
        <>
            <View style={styles.container}>
                {chatList && chatList !== null &&
                    chatList.map(res=>(
                        <View style={styles.messageContainer}
                            onTouchStart={()=>navigation.navigate("Chat",{otherUser:res.otherUser.userId,fcmToken:res.otherUser.fcmToken})}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                            />
                            <View style={styles.labelMessageContainer}>
                                <Text style={styles.labelUsername}>{res.otherUser.fullName}</Text>
                                <Text style={styles.labelMessage}>{res.latestMessage.text}</Text>
                            </View>
                            <Text style={{marginRight: 10}}>{moment(res.latestMessage.timestamp).fromNow()}</Text>
                        </View>
                    ))
                }
            </View>
        </>
    )
}


const styles = ScaledSheet.create({
    container: {
        width: "100%",
        alignItems: 'center',
    },
    messageContainer: {
        width: "90%",
        height: '70@s',
        backgroundColor: 'azure',
        marginTop: '10@s',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',

    },
    profileImage: {
        height: '100%',
        width: '70@s',
        borderRadius: '35@s'
    },
    labelMessageContainer: {
        marginLeft: '-40@s'
    },
    labelMessage: {
        color: 'gray'
    },
    labelUsername: {
        fontSize: 17,
        color: 'black',
    },
})

export default ChatList;