import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

// create a component
const ComponentModal = (props) => {

    const visible = props.visible;
    const onPressClose = props.onPressClose;
    const component = props.component;

    return (
        <View style={styles.container}>
            <Modal
                style={{ backgroundColor: 'red' }}
                visible={visible}
                transparent={true}
            >
                <View style={styles.modalViewComment}>
                    <View style={styles.modalComment}>
                        {component}
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={onPressClose}>
                            <Text style={styles.buttonText} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    modalViewComment: {
        width: '100%',
        height: '100%',
        backgroundColor: 'gray',
    },
    modalComment: {
        backgroundColor: 'white',
        height: '93%',
    },


    buttonView: {
        width: '100%',
        height: '7%',
    },
    buttonClose: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20@s',
        fontFamily: 'RobotoItalic',
    },
});


export default ComponentModal;
