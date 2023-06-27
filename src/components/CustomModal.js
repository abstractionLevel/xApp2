import React from "react";
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Modal from 'react-native-modal';

const CustomModal = (props) => {

    const isVisible = props.visible;
    const onPressClose = props.onPressClose;
    const component = props.component;
    const title = props.title ? props.title : null;

    return (
        <Modal
            testID={'modal'}
            isVisible={isVisible}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.view}
            avoidKeyboard>
            {component}
        </Modal>

    );

}

const styles = ScaledSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    head: {
        backgroundColor: 'white',
        padding: 24,
        borderBottomWidth: 0.40,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: '20@s',
        color: 'black',
        width: '80%',
    }
});

export default CustomModal;