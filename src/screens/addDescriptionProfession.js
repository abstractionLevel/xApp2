import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    ScrollView
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import axios from "../http/axios";
import Url from "../utils/Urls";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const AddDescriptionProfession = (props) => {

    const [heightContent, setHeightContent] = useState('70%');
    const [description, setDescription] = useState(null);
    const onPressClose = props.onPressClose;

    const saveDescription = async () => {
        const token = await AsyncStorage.getItem('logged');
        const principalStored = await AsyncStorage.getItem("principal")
        const principal = JSON.parse(principalStored)
        if (description !== null) {
            axios.put(Url.worker + "/" + principal.id + "/descriptionJob", { description: description }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {
                    onPressClose();
                }).catch(error => {
                    console.log("ce un errore nel salvare la descrizione ", error);
                })
        } else {
            console.log("description e' null");
        }
    }

    useEffect(() => {
        setDescription(props.descriptionJob ? props.descriptionJob : null);
    }, [])

    return (
        <View keyboardShouldPersistTaps={'always'} style={{
            height: heightContent,
            backgroundColor: 'white'
        }}>
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.head}>
                    <Text style={styles.headLabel}>Aggiungi info sulla tua professione</Text>
                    <EvilIcons name="close" size={30} color={'black'} onPress={onPressClose} />
                </View>
                <View style={styles.inner}>
                    <View style={{ width: '90%', marginTop: 20 }}>
                        <Text style={styles.label}>
                            Info Professione
                        </Text>
                    </View>
                    <TextInput style={styles.input}
                        multiline
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        onFocus={() => setHeightContent('100%')}

                    />
                    <TouchableOpacity
                        style={styles.buttonSave}
                        onPress={saveDescription}
                    >
                        <Text style={styles.buttonText} >Salva</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonClose}
                        onPress={onPressClose}
                    >
                        <Text style={styles.buttonText} >Anulla</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white'
    },
    label: {
        fontWeight: '600',
        color: 'black',
    },
    input: {
        // height: '100@s',
        fontSize: '16@s',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.40,
        borderRadius: 3,
        marginTop: '6@s',
        width: '90%'
    },
    buttonClose: {
        flexDirection: 'row',
        height: '50@s',
        borderRadius: 6,
        marginTop: '10@s',
        alignItems: 'center',
        borderColor: 'gray',
        justifyContent: 'center',
        borderWidth: 0.40,
        width: '90%',
    },
    buttonSave: {
        flexDirection: 'row',
        height: '50@s',
        borderRadius: 6,
        marginTop: '18@s',
        alignItems: 'center',
        backgroundColor: '#0088ff',
        justifyContent: 'center',
        width: '90%',
    },
    head: {
        backgroundColor: 'white',
        padding: 24,
        borderBottomWidth: 0.40,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headLabel: {
        fontSize: '20@s',
        color: 'black',
        width: '80%',
    }
});


export default AddDescriptionProfession;