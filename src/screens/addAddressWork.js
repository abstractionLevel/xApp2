import React from "react";
import { 
    View,
    Text,
 } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const AddAddressWork  = (props) => {

    const onPressClose = props.onPressClose;

    return (
        <View style={{height: '100%',backgroundColor: 'white'}}>
            <View style={styles.head}>
                <Text style={styles.headLabel}>Aggiungi indirizzo lavorativo</Text>
                <EvilIcons name="close" size={30} color={'black'} onPress={onPressClose} />

            </View>
        </View>
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
    headLabel: {
        fontSize: '20@s',
        color: 'black',
        width: '80%',
    },
});
export default AddAddressWork;