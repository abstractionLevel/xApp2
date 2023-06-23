import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddDescriptionProfession = (props) => {


    const [description, setDescription] = useState();
    const onPressClose = props.onPressClose;

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={{
                    marginTop: 20,
                    fontWeight: '500',
                    letterSpacing: 2,
                }}>
                    Aggiungi info sulla tua Professione
                </Text>
                <TextInput
                    style={{
                        width: '100%',
                        height: 100,
                        fontSize: 18,
                        borderBottomWidth: 1,
                        // paddingLeft: 10,
                        backgroundColor: 'white',
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                    multiline
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                />
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={onPressClose}
                >
                    <Text style={styles.buttonText} >Salva</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={onPressClose}
                >
                    <Text style={styles.buttonText} >Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex:1,
        padding: 24,
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
    },
 
    textArea: {
        height: 100,
        width: '90%',
        textAlignVertical: 'top',
        fontSize: '14@s',
        fontFamily: 'RobotoItalic',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 4,
    },
    buttonView: {
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonClose: {
        backgroundColor: 'orange',
        width: '40%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});


export default AddDescriptionProfession;