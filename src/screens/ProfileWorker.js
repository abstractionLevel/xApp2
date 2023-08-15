import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native'
import services from '../services';
import { Rating } from 'react-native-ratings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ComponentModal from '../components/ComponentModal';
import ReviewList from '../components/ReviewList';
import WriteReviewModal from '../components/WriteReviewModal';

const ProfileWorker = (props) => {

    const [reviews, setReviews] = useState();
    const [auth, setAuth] = useState();
    const [isFollowed, setIsFollowed] = useState(null);
    const [followedWorker, setFollowedWorker] =  useState(null);
    const [visibleModalReview, setVisibleModalReview] = useState(false);
    const [visibleModalWriteReview, setVisibleModalWriteReview] = useState(false);
    const worker = props.route.params.worker
    const navigate = useNavigation();


    const toggleModalReview = () => {
        setVisibleModalReview(true);
    }

    const onPressWriteReview = () => {
        setVisibleModalWriteReview(true)
    }

    

    const toggleFollow = () => {
        if (!isFollowed) {
            services.followWorker({ userid: auth.id, otherUser: worker.id })
                .then(response => {
                    if (response) {
                        setIsFollowed(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            services.deleteFollowedWorker(followedWorker.id)
                .then(response => {
                    if (response) {
                        setIsFollowed(false)
                    }
                })
                .catch(err => {
                    console.log("errore ", err.message)
                })
        }
    }

    return (
        <View style={styles.container}>
            {worker &&
                <>
                    <View style={styles.head}>
                        <View style={styles.profileImageView}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                            />
                        </View>
                        <View style={styles.infoWorkerView} >
                            <View style={styles.nameView}>
                                <Text style={styles.name} >
                                    {worker.fullName}
                                </Text>
                            </View>
                            <View style={styles.workView}>
                                <Text style={styles.workText} >
                                    {worker.worker.job}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contactBar}>
                        <View style={styles.ratingView}>
                            <Rating
                                style={styles.rating}
                                type='custom'
                                ratingColor='orange'
                                ratingCount={5}
                                imageSize={18}
                                ratingBackgroundColor='gray'
                                tintColor='white'
                                showRating={false}
                                readonly
                                startingValue={worker.avarage_vote} />
                            <Text style={styles.totalVotedRating}>{worker.vote} {worker.vote}</Text>
                            <View style={styles.reviewView}>
                                <TouchableOpacity
                                    style={styles.buttonReview}
                                    onPress={() => onPressWriteReview()}>
                                    <Text style={styles.contact} >lascia una recensione</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.contactView}>
                            <TouchableOpacity
                                style={styles.buttonContact}
                                onPress={() => navigate.navigate("Chat",{otherUser:worker.userId,fcmToken:worker.fcmToken})}>
                                <Text style={styles.contact} >Chat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bodyLeft}>
                            <Text style={styles.descriptionTitle}>Descrizione</Text>
                            <Text style={styles.descriptionText} >
                                {worker.worker.descriptionJob}
                            </Text>
                        </View>
                        <View style={styles.bodyRight}>
                            <View style={styles.buttonsWorker}>
                                {/**<TouchableOpacity
                                    style={styles.priceButton}
                                    onPress={() => toggleModalPrice()}>
                                    <FontAwesome name="dollar" size={30} color={'#1d4e89'} />
                                    <Text style={styles.price}>price</Text>
                                </TouchableOpacity>**/}
                                <TouchableOpacity
                                    style={styles.reviewButton}
                                    onPress={() => toggleModalReview()}>
                                    <FontAwesome name="comments-o" size={30} color={'#1d4e89'} />
                                    <Text style={styles.review}>{worker.vote}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.reviewButton}
                                    onPress={toggleFollow}
                                >
                                    <FontAwesome name="heart" size={30} color={isFollowed === true ? 'red' : '#1d4e89'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <WriteReviewModal visible={visibleModalWriteReview} onPressClose={() => setVisibleModalWriteReview(false)} workerId={worker.id} />
                    <ComponentModal visible={visibleModalReview} component={<ReviewList reviews={reviews} />} onPressClose={() => setVisibleModalReview(false)} />
                    {/* <CustomModal visible={visibleModalPrice} component={<PriceList idWorker={idWorker} />} onPressClose={() => setVisibleModalPrice(false)} /> */}
                </>}
        </View>
    )
}

const buttonRadius = 4;
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const fontFamilyButton = 'RobotoLight';
const headPercent = (height * 21) / 100;
const profileImagePercentWidth = (width * 30) / 100;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // marginTop: Platform.OS === 'ios' ? Constants.statusBarHeight - 10 : Constants.statusBarHeight,
    },
    head: {
        flexDirection: 'row',
        width: '100%',
        height: headPercent,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        backgroundColor: '#1d4e89',
    },
    profileImageView: {
        width: '30%',
        height: '67%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20@s',
        marginLeft: '30@s',
    },
    profileImage: {
        height: profileImagePercentWidth,
        width: profileImagePercentWidth,
        borderRadius: profileImagePercentWidth / 2,
    },
    infoWorkerView: {
        width: '70%',
        height: '38%',
        marginTop: '30@s',
        marginLeft: '16@s',
    },
    nameView: {
        height: '60%',
        marginBottom: '10@s',
    },
    name: {
        fontSize: '24@s',
        color: 'white',
        fontFamily: 'RobotoBold',
        textTransform: 'capitalize'
    },
    workView: {
    },
    workText: {
        color: 'white',
        fontSize: '16@s',
        includeFontPadding: false,
        fontFamily: 'RobotoItalic',
        // marginTop: '0@s',
    },

    contactBar: {
        height: '8%',
        width: '100%',
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        marginTop: '20@s',
    },
    totalVote: {
        fontSize: '14@s',
    },
    ratingView: {
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '16@s',
    },
    reviewView: {

    },
    contactView: {
        width: "40%",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '8%',
    },
    buttonContact: {
        height: '80%',
        width: "80%",
        backgroundColor: '#D3D3D3',
        borderRadius: buttonRadius,
        justifyContent: 'center',
    },
    contact: {
        color: '#1d4e89',
        fontSize: '17@s',
        textAlign: "center",
        fontFamily: "RobotoBold",
    },
    totalVotedRating: {
        color: 'black',
        fontSize: '14@s',
        fontFamily: 'RobotoLight',
        marginTop: '4@s',
    },
    body: {
        height: '65%',
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',

    },
    bodyLeft: {
        width: '80%',
        height: '100%',
        marginTop: '40@s',
    },
    descriptionTitle: {
        color: '#1d4e89',
        fontSize: '30@s',
        fontFamily: 'RobotoBold',
        marginLeft: '13@s',
    },
    descriptionText: {
        color: 'black',
        marginLeft: '6@s',
        fontSize: '16@s',
        fontFamily: 'RobotoItalic',
    },
    bodyRight: {
        width: '20%',
        alignItems: 'flex-end',
        marginTop: '60@s'
    },
    buttonsWorker: {
        width: '80%',
        height: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    skillButton: {
        marginTop: 25,
        alignItems: 'center',
    },
    skill: {
        color: 'black',
        fontSize: 12,
        fontFamily: fontFamilyButton,
        alignItems: 'center',
    },

    priceButton: {
        marginTop: 25,
        alignItems: 'center',
    },
    price: {
        color: 'black',
        fontSize: 12,
        fontFamily: fontFamilyButton,
        alignItems: 'center',
    },
    reviewButton: {
        marginTop: 25,
        alignItems: 'center',
    },
    review: {
        color: 'black',
        fontSize: '16@s',
        fontFamily: fontFamilyButton,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '10%',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },
    modalSkills: {
        backgroundColor: 'white',
        width: '100%',
    },

    modalText: {
        fontSize: 16,
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
});

export default ProfileWorker;