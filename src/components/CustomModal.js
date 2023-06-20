import React from "react";
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';


const CustomModal = (props) => {

    const visible = props.visible;
    const onPressClose = props.onPressClose;
    const component = props.component;

    return (
        <View style={styles.container}>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {component}
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={styles.buttonClose}
                                onPress={onPressClose}>
                                <Text style={styles.buttonText} >Salva</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonClose}
                                onPress={onPressClose}>
                                <Text style={styles.buttonText} >Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );

}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonView: {
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

export default CustomModal;