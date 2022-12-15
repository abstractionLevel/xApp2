import React from 'react';
import { View, Text, Image,Dimensions } from 'react-native'
import { Rating } from 'react-native-ratings';
import { ScaledSheet } from 'react-native-size-matters';


const ReviewItem = (props) => {

    const review = props.review;

    console.log("sono nel reviewItedm ", review)

    return (
        <View style={styles.container}>
            <View style={styles.commentContainer}>
                <View style={styles.imageProfileView}>
                    <Image source={{ uri: "review.user.imageUri "}} style={styles.image} />
                </View>
                <View style={styles.infoComment}>
                    <View style={styles.nameView}>
                        <Text style={styles.name}>{review.username}</Text>
                        <Rating
                            style={styles.rating}
                            type='custom'
                            ratingColor='orange'
                            ratingCount={5}
                            imageSize={14}
                            ratingBackgroundColor='gray'
                            tintColor='white'
                            showRating={false}
                            readonly
                            startingValue={review.rating} />
                    </View>
                    <View style={styles.commentView}>
                        <Text style={styles.review} >{review.review}</Text>
                    </View>
                </View>
            </View>
        </View>

    );

}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const heightContainer = 0;
const commentContainerHeight = (height * 8) / 100;

// define your styles
const styles = ScaledSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    commentContainer: {
        marginTop: 10,
        flexDirection: 'row',
        width: '92%',
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,

    },
    imageProfileView: {
        width: '20%',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
    },
    infoComment: {
        width: '80%',
    },
    nameView: {
        width: '100%',
    },
    name: {
        color: 'gray',
        fontSize: '14@s',
        fontFamily: 'RobotoMedium',
    },
    commentView: {
        width: '100%',
        marginTop: '10@s',
    },
    review: {
        color: 'black',
        fontSize: '14@s',
        fontFamily: 'RobotoBold',
    },
    ratingView: {
        marginTop: '5@s',
    },
    rating: {
        alignItems: 'flex-start'

    }


});


export default ReviewItem;