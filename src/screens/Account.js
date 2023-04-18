//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { ScaledSheet } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Urls from '../utils/Urls';
import axios from 'axios';
import Url from '../utils/Urls';

const Account = (props) => {

    const { navigation } = props;
    const [imageProfile, setImageProfile] = useState()
    const [state, setState] = useState({
        email: null,
        fullName: null,
    })
    const [isVisibleModalAccount, setIsVisibleModalAccount] = useState(false)

    const save = () => { 
        // axios.post(Url.saveUser + )
    }
    const deleteAccount = () => { }

    useEffect(() => {
        axios.get(Urls.fetchUser + "/1")
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
                console.log(e)
            })
    }, []);

    return (

        <View style={styles.container}>
            <>
                <View style={styles.head}>
                    <View style={styles.profileImageView}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Foto', { image: imageProfile })}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: imageProfile ? imageProfile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}

                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.contentContainerStyle}>
                    {/* <View style={styles.viewEditImage}>
                        <TouchableOpacity
                            style={styles.buttonAddEditImage}
                            onPress={pickImage}>
                            <Text style={styles.pictText}>Edit Foto</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.body}>
                        <Text style={styles.label}>FULL NAME</Text>
                        <TextInput
                            style={styles.input}
                            value={state.name}
                            autoCapitalize="none"
                            placeholderTextColor='black'
                            onChangeText={(val) => setState({ ...state, name: val })}
                        />
                        <Text style={styles.label}>EMAIL</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            value={state.email}
                            autoCapitalize="none"
                            placeholderTextColor='black'
                            onChangeText={(val) => setState({ ...state, name: val })}
                        />
                        <Text style={styles.label}>ADDRESS</Text>
                        <TextInput
                            style={styles.input}
                            value={state.name}
                            autoCapitalize="none"
                            placeholderTextColor='black'
                            onChangeText={(val) => setState({ ...state, name: val })}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                removeTokenAuth()
                                navigation.navigate('Home', { logout: true })
                            }}>
                            <Text style={styles.text} >Change Password</Text>
                            <AntDesign name="right" style={styles.icon} size={30} color={'gray'} />
                        </TouchableOpacity>
                        <View style={{
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
                                onPress={save}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 22
                                }} >Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
        height: 50,
        fontSize: 18,
        borderBottomWidth: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    label: {
        marginTop: 20,
        fontWeight: '500',
        letterSpacing: 2,
    },
    button: {
        flexDirection: 'row',
        height: '60@s',
        borderWidth: 1,
        borderColor: 'gray',
        borderColor: 'rgba(0, 0, 0, 0.1)',
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


});

export default Account;
