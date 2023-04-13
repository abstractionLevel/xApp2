import React, {useState,useEffect,useContext} from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { Button, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    AsyncStorage,
} from 'react-native';
import {useGlobalContext} from '../../context';

const Profile = (props) => {

    const navigation = useNavigation();
    const {removeTokenAuth} = useGlobalContext()



    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.profileImageView}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: false ? true: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate("Account")}
                >
                    <Text style={styles.text} >Account</Text>
                    <MaterialCommunityIcons name="account" style={styles.icon} size={30} color={'gray'} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate("Profile Worker")}
                >
                    <Text style={styles.text} >Profilo Lavoratore</Text>
                    <MaterialCommunityIcons name="account" style={styles.icon} size={30} color={'gray'} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        removeTokenAuth()
                        navigation.navigate('Home', {logout:true })
                    }}>
                    <Text style={styles.text} >Logout</Text>
                    <MaterialCommunityIcons name="logout" style={styles.icon} size={30} color={'gray'} />
                </TouchableOpacity>
              
            </View>
        </View>
    )

}

const width = Dimensions.get('screen').width;
const imageSizePercentage = (width * 30) / 100;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',

    },
    head: {
        width: '100%',
        height: '20%',
    },
    profileImageView: {
        marginTop: '30@s',
        width: '100%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    username: {
        fontFamily: "RobotoLight",
        fontSize: '18@s',
    },
    job: {
        fontFamily: "RobotoItalic",
        fontSize: '14@s',
        color: 'gray',
    },
    profileImage: {
        height: imageSizePercentage,
        width: imageSizePercentage,
        borderRadius: imageSizePercentage / 2,
    },
    body: {
        width: '100%',
        alignItems: 'center',
        marginTop: '20@s',
    },
    button: {
        flexDirection: 'row',
        width: '90%',
        height: '60@s',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 6,
        marginTop: '20@s',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    text: {
        fontFamily: 'RobotoLight',
        fontSize: '20@s',
        marginLeft: '4@s',
    },
    icon: {
        alignItems: 'flex-end',
        marginRight: '10@s',
    },
    pictText: {
        fontSize: '20@s',
        fontFamily: 'RobotoLight',
    }

});

export default Profile;