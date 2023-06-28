import React, { useContext, useEffect, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    Text,
    TouchableOpacity,
    View,
    AsyncStorage,
    Card,
    Dimensions
} from 'react-native';
import AppContext from '../context/appContext';
import axios from '../http/axios';
import Url from '../utils/Urls';
import { useSelector } from 'react-redux';

const Profile = (props) => {

    const navigation = useNavigation();

    const [principal, setPrincipal] = useState();
    const { setAuth } = useContext(AppContext);
    const { user } = useSelector((state) => state);

    const removeTokenAuth = async () => {
        try {
            await AsyncStorage.removeItem('logged');
        } catch (error) {
            console.log(error);
        }
    };

    const getPrincipal = async () => {
        const principaStored = await AsyncStorage.getItem('principal');
        if (principaStored) {
            setPrincipal(JSON.parse(principaStored));
        } else {
            console.log("principal non esiste");
        }
    }

    const savePrincipal = async (user) => {
        try {
            await AsyncStorage.setItem('principal', JSON.stringify(user));
        } catch (error) {
            console.log('Errore nel savlare il principal ', error);
        }
    }

    useEffect(() => {
        getPrincipal();
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            setPrincipal(user)
        }
    }, [user]);


    const getUser = async () => {
        const token = await AsyncStorage.getItem('logged');
        axios.get(Url.fetchUser + "/" + token, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                savePrincipal(response.data);
                setPrincipal(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    const becomeWorker = async () => {
        const token = await AsyncStorage.getItem('logged');
        const payload = {
            userId: principal.userId
        }
        axios.post(Url.woMaterialCommunityIconsrker, payload, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.data) {
                    getUser();
                    navigation.navigate("JobProfile")
                }
            })
            .catch(error => {
                console.log("ce un errore ", error)
            })
    }


    return (
        <View style={styles.container}>
            <View style={styles.head}>
                {principal &&
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginTop: 4 }}>
                            <MaterialCommunityIcons name="account" style={styles.icon} size={30} color={'black'} />
                            <Text style={{ color: 'green' }}>{principal.fullName}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginTop: 4 }}>
                            <MaterialCommunityIcons name="email" style={styles.icon} size={30} color={'black'} />
                            <Text style={{ color: 'green' }}>{principal.email}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginTop: 4 }}>
                            <MaterialCommunityIcons name="map" style={styles.icon} size={30} color={'black'} />
                            <Text style={{ color: 'green' }}>{principal.address}</Text>
                        </View>
                        {principal.worker &&
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginTop: 4 }}>
                                <MaterialIcons name="work" style={styles.icon} size={30} color={'black'} />
                                <Text style={{ color: 'green' }}>{principal.worker.job}</Text>
                            </View>
                        }

                    </>
                }
            </View>
            <View style={styles.body}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Account")}
                >
                    <Text style={styles.text} >Account</Text>
                    <MaterialCommunityIcons name="account" style={styles.icon} size={30} color={'white'} />
                </TouchableOpacity>
                {principal && principal.isWorker ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("JobProfile")}
                    >
                        <Text style={styles.text} >Informazioni Lavorative</Text>
                        <MaterialCommunityIcons name="account" style={styles.icon} size={30} color={'white'} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.button}
                        onPress={becomeWorker}
                    >
                        <Text style={styles.text} >Diventa un Worker</Text>
                        <MaterialCommunityIcons name="account" style={styles.icon} size={30} color={'white'} />
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        removeTokenAuth()
                        setAuth(false);
                        navigation.navigate('Home');
                    }}>
                    <Text style={styles.text} >Logout</Text>
                    <MaterialCommunityIcons name="logout" style={styles.icon} size={30} color={'white'} />
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
        backgroundColor: 'white',
        alignItems: 'center',
    },
    head: {
        width: '90%',
        height: '30%',
        marginTop: '45@s',
        backgroundColor: 'rgb(240, 240, 240)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
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
        marginTop: '12@s',
    },
    button: {
        flexDirection: 'row',
        width: '90%',
        height: '60@s',
        backgroundColor: '#0088ff',
        borderRadius: 6,
        marginTop: '20@s',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    text: {
        fontFamily: 'RobotoLight',
        fontSize: '20@s',
        marginLeft: '10@s',
        color: 'white',
    },
    icon: {
        alignItems: 'flex-end',
        marginRight: '10@s',
    },
    pictText: {
        fontSize: '20@s',
        fontFamily: 'RobotoLight',
        color: 'white',
    }

});

export default Profile;