//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import { ScaledSheet } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Urls from '../utils/Urls';
import axios from '../http/axios';
import Url from '../utils/Urls';
import { AsyncStorage } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';

const Account = (props) => {

    const { navigation } = props;
    const [imageProfile, setImageProfile] = useState()
    const [tokenAuth, setTokenAuth] = useState();
    const [state, setState] = useState({
        email: null,
        fullName: null,
    })
    const [isVisibleModalAccount, setIsVisibleModalAccount] = useState(false)


    const deleteAccount = () => { }

    const showRegistrationAlert = () => {
        showMessage({
            message: 'Profilo aggiornato',
            type: 'success',
            duration: 3000,
            autoHide: true,
        });
      };

    const getUserInfo = async () => {
        const token = await AsyncStorage.getItem('logged');
        setTokenAuth(token);
        axios.get(Url.fetchUser + "/" + token, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.data) {
                    setState(prevState => ({
                        ...prevState,
                        email: response.data.email,
                        fullName: response.data.fullName,
                        address: response.data.address,
                    }))
                }
            }).catch((e) => {
                console.log(e);
            })
    }

    const updateUser = async () => {
        const payload = {
            fullName: state.fullName,
            address: state.address,
            email: state.email
        }
        axios.put(Urls.saveUser, payload, {
            headers: {
                'Authorization': 'Bearer ' + tokenAuth
            }
        })
        .then(response => {
            setState(prevState => ({
                ...prevState,
                address:response.data.address,
                fullName:response.data.fullName
            }))
            showRegistrationAlert();

        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getUserInfo();
    }, []);


    const removeTokenAuth = async (token) => {
        try {
            await AsyncStorage.removeItem('logged', token);
        } catch (error) {
            console.log('Erro delete token:', error);
        }
    };
    return (

        <View style={styles.container}>
            <ScrollView>
                <> 
                    <View style={styles.head}>
                        <View style={styles.profileImageView}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Foto', { image: imageProfile })}>
                                <Image
                                    style={styles.profileImage}
                                    source={{ uri: imageProfile ? imageProfile : "https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png" }}

                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.contentContainerStyle}>
                        {/* <View style={styles.viewEditImage}>
                        <TouchableOpacity
                            style={styles.buttonAddEditImage}
                            onPress={pickImage}>
                            <Text style={styles.pictText}>Edit Foto</Text>
                        </TouchableOpacity>
                    </View> */}
                        <View style={styles.body}>
                            <Text style={styles.label}>Nome e Cognome</Text>
                            <TextInput
                                style={styles.input}
                                value={state.fullName}
                                autoCapitalize="none"
                                placeholderTextColor='black'
                                onChangeText={(val) => setState({ ...state, fullName: val })}
                            />
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                editable={false}
                                style={styles.input}
                                value={state.email}
                                autoCapitalize="none"
                                placeholderTextColor='black'
                                onChangeText={(val) => setState({ ...state, email: val })}
                            />
                            <Text style={styles.label}>Indirizzo completo</Text>
                            <TextInput
                                style={styles.input}
                                value={state.address}
                                autoCapitalize="none"
                                placeholderTextColor='black'
                                onChangeText={(val) => setState({ ...state, address: val })}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    navigation.navigate('ChangePassword');
                                }}>
                                <Text style={styles.text} >Cambia Password</Text>
                                <AntDesign name="right" style={{marginRight: 10}} size={30} color={'white'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button,{justifyContent:"center"}]}
                                onPress={updateUser}>
                                <Text style={styles.text} >Salva</Text>
                            </TouchableOpacity>
                            {/* <View style={{
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity
                                    style={{
                                        marginTop: 30,
                                        backgroundColor: 'orange',
                                        width: '80%',
                                        height: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20,

                                    }}
                                    onPress={updateUser}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 22
                                    }} >Save</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>
                    <Modal
                        style={{ margin: 0 }}
                        testID={'modal'}
                        isVisible={isVisibleModalAccount}
                        backdropOpacity={1}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={600}
                        animationOutTiming={600}
                        backdropTransitionInTiming={600}
                        backdropTransitionOutTiming={600}>
                        <View style={styles.modalView} >
                            <Text style={styles.labelDeleteAccount}>Vuoi cancellare  il tuo Account?</Text>
                            <View style={styles.buttonView}>
                                <TouchableOpacity
                                    style={styles.buttonSureDeleteAccountYes}
                                    onPress={deleteAccount}>
                                    <Text style={styles.buttonText} >Si </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.buttonSureDeleteAccountNo}
                                    onPress={() => setIsVisibleModalAccount(false)}>
                                    <Text style={styles.buttonText} >No</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                </>
            </ScrollView>
            <FlashMessage position="top" />
        </View>
    );
};

const width = Dimensions.get('screen').width;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    head: {
        marginTop: 10,
        width: '100%',
        height: '15%',
        alignItems: 'center',
    },
    viewEditImage: {
        alignItems: 'center',
    },
    buttonAddEditImage: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageView: {
        width: '30%',
        height: '30%',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    pictText: {
        fontFamily: "RobotoBold",
        color: 'gray',
        fontSize: '20@s',
    },
    body: {
        height: '100%',
    },
    contentContainerStyle: {
        padding: 24,
    },
    input: {
        width: '100%',
        height: '43@s',
        fontSize: 18,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 6,
        marginTop: '6@s',
    },
    label: {
        marginTop: '16@s',
        fontWeight: '600',
        color: 'black',
    },
    button: {
        flexDirection: 'row',
        height: '60@s',
        borderRadius: 6,
        marginTop: '20@s',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0088ff',
    },
    text: {
        fontFamily: 'RobotoLight',
        fontSize: '18@s',
        marginLeft: '4@s',
        color: 'white',
        marginLeft: '10@s',
    },


});

export default Account;
