import React from "react";
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const CustomModal = (props) => {

    const isVisible = props.visible;
    const onPressClose = props.onPressClose;
    const component = props.component;
    const title = props.title ? props.title : null;

    return (
        <ScrollView>
            <Modal
                testID={'modal'}
                isVisible={isVisible}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.view}>

                {/* <View style={styles.head}>
                    <Text style={styles.label}>{title}</Text>
                    <EvilIcons name="close" size={30} color={'black'} onPress={onPressClose} />
                </View> */}
                {component}
            </Modal>
        </ScrollView>

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