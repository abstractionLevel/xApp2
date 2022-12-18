import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Rating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import { ScaledSheet } from 'react-native-size-matters';



const WriteReviewModal = (props) => {

    const visible = props.visible;
    const onPressClose = props.onPressClose;
    const userID = props.userId
    const workerID = props.workerId
    console.log(userID + " " +  workerID)

    const [review, setReview] = useState(null)
    const [rating, setRating] = useState()

    const ratingCompleted = rating => {
        setRating(rating)
    }

    const onPressSend = async () => {
        // try {
        //     const reviewData = await API.graphql(
        //         graphqlOperation(
        //             createWorkerReview, {
        //             input: {
        //                 review: review,
        //                 rating: rating,
        //                 userID: userID,
        //                 workerID, workerID
        //             }
        //         })
        //     )
        //     onPressClose()
        //     props.updateWorker(UPDATE_WORKER)
        // } catch (e) {
        //     console.log(e)
        // }
    }

    useEffect(() => {

    }, [])


    return (
        <Modal
            style={{ margin: 0 }}
            testID={'modal'}
            isVisible={visible}
            backdropColor="black"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalViewReview}>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.buttonClose}
                        onPress={onPressClose}>
                        <Text style={styles.buttonText} >Anulla</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonClose}
                        onPress={onPressSend}>
                        <Text style={styles.buttonText} >Invia</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalReview}>
                    <Rating
                        style={styles.rating}
                        type='custom'
                        ratingColor='orange'
                        ratingCount={5}
                        imageSize={40}
                        ratingBackgroundColor='gray'
                        tintColor='white'
                        showRating={false}
                        startingValue={0}
                        onFinishRating={ratingCompleted} />
                </View>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Scrivi una recensione  {facoltativo}"
                        placeholderTextColor="grey"
                        numberOfLines={20}
                        multiline={true}
                        onChangeText={(text) => setReview(text)}
                        value={review}

                    />
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};


const styles = ScaledSheet.create({

    modalViewReview: {
        height: '80%',
        backgroundColor: 'white',
        padding: 10,
    },
    iconCross: {
        alignSelf: 'flex-end',
        marginBottom: '20@s',
    },
    modalReview: {
    },
    rating: {

    },
    textAreaContainer: {
        marginTop: '10@s',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2,
        width: '100%',
        borderColor: 'black',
        height: '60%',
    },
    textArea: {
        textAlignVertical: 'top',
        fontSize: '18@s',
        fontFamily: 'RobotoItalic',
        backgroundColor: 'white',
        padding: 4,

    },
    buttonView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '100%',
        height: '20%',
        padding: 4,
    },
    buttonClose: {
        width: '20%',
        height: '40@s',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#1d4e89',
        fontSize: '17@s',
        textAlign: "center",
        fontFamily: "RobotoBold",
    },
});


export default WriteReviewModal
