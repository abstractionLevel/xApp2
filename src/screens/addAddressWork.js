import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const AddAddressWork = (props) => {

    const onPressClose = props.onPressClose;
    const [address, setAddress] = useState(null);

    const save = () => {
        if(address!==null) {
            console.log('salvataggio');
        }else {
            console.log("deve essere diverso da null")
        }
    }

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            <View style={styles.head}>
                <Text style={styles.headLabel}>Aggiungi indirizzo lavorativo</Text>
                <EvilIcons name="close" size={30} color={'black'} onPress={onPressClose} />
            </View>
            <View style={styles.inner}>
                <TextInput
                    style={styles.input}
                    onChange={(text) => setAddress(text)}
                    value={address}
                />
                <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={save}
                >
                    <Text style={styles.text} >Salva</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={onPressClose}
                >
                    <Text style={styles.textClose} >Anulla</Text>
                </TouchableOpacity>
            </View>

        </View >
    );
}

const styles = ScaledSheet.create({
    head: {
        backgroundColor: 'white',
        padding: 24,
        borderBottomWidth: 0.40,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    headLabel: {
        fontSize: '20@s',
        color: 'black',
        width: '80%',
    },
    input: {
        height: '50@s',
        fontSize: 18,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.40,
        borderRadius: 3,
        marginTop: '6@s',
        width: '90%'
    },
    buttonClose: {
        flexDirection: 'row',
        height: '40@s',
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
    text: {
        fontFamily: 'RobotoLight',
        fontSize: '18@s',
        marginLeft: '4@s',
        color: 'white',
        marginLeft: '10@s',
    },
});
export default AddAddressWork;