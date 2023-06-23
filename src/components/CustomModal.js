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
                    {component}
                </View>
            </Modal>
        </View>
    );

}

const styles = ScaledSheet.create({
    container: {
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
});

export default CustomModal;