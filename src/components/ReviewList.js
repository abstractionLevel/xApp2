
//import liraries
import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import ReviewItem from './ReviewItem';
// create a component
const ReviewList = (props) => {


    const reviews = props.reviews
    console.log("review" , reviews.map(item=>item.review))

    return (
        <View >
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item} />}
                showsVerticalScrollIndicator={true}
                snapToAlignment={'start'}
                decelerationRate={'fast'}
                snapToInterval={Dimensions.get('window').height}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
    );
};


//make this component available to the app
export default ReviewList;
