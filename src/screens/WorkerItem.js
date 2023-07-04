//import liraries
import React, {useEffect, useState} from 'react'
import {View, Text, ImageBackground, TouchableOpacity,Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { ScaledSheet } from 'react-native-size-matters'
import { Rating } from 'react-native-ratings';
import { calcultate5starsVote } from '../utils/calculate5starsVote';

// create a component
const WorkerItem = props => {
    
    const navigation = useNavigation()

    const worker = props.worker;
    const [avarageVote, setAvarageVote] = useState()
    const [isAvarageVote, setIsAvarageVote] = useState(false)
    const [totalVote, setTotalVote] = useState(0)

    // const calcultateAvarageVote = async () => {
    //     try {
    //         let ratings = []
    //         let totVot = 0
    //         props.worker.worker.reviews.items.map(value => {
    //             ratings.push(value.rating)
    //             totVot++
    //         })
    //         if (ratings.length) {
    //             const resultAvarageVote = await calcultate5starsVote(ratings)
    //             setAvarageVote(resultAvarageVote)
    //             setTotalVote(totVot)
    //         } else {
    //             setAvarageVote(0)
    //         }
    //         setIsAvarageVote(true)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // useEffect(() => {
    //     calcultateAvarageVote()
    // }, [])

    return (
        <View style={styles.container}>
            <>
                <ImageBackground
                    source={{
                        uri:  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                    }}
                    style={styles.image}
                />
                <View style={styles.titles}>
                    <Text style={styles.title}>
                        {worker.user.fullName}
                    </Text>
                    <Text style={styles.subtitle}>{worker.user.worker.job}</Text>
                </View>
                <View style={styles.position}>
                    <Text style={styles.labelPosition}>12334</Text>
                </View>
                {/* <View style={styles.voted}>
                    {avarage_vote &&
                     <Rating
                     type='custom'
                     ratingColor='gold'
                     ratingCount={5}
                     imageSize={30}
                     ratingBackgroundColor='black'
                     tintColor='white'
                     showRating={false}
                     readonly
                     startingValue={calcultate5starsVote([1,3,4,10,10])}
                 />
                    }
                   

                    <Text style={styles.totalVoted}>{avarage_vote} </Text>
                </View> */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.buttonGoToProfile}
                        onPress={() => navigation.navigate('ProfileWorker', {worker:worker.user})}>
                        <Text style={styles.buttonText}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </>
        </View>
    )
}

var heigth = Dimensions.get('window').height
const blue = '#1d4e89'

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: 'white',
        // marginTop:
        //     Platform.OS === 'ios'
        //         ? Constants.statusBarHeight - 10
        //         : Constants.statusBarHeight,
    },
    image: {
        height: heigth / 2,
        width: '100%',
        resizeMode: 'center',
    },
    titles: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: '35@s',
        color: blue,
        fontFamily: 'RobotoLight',
    },
    position: {
        width: '100%',
        alignItems: 'center',
    },
    labelPosition: {
        marginTop: 0,
    },
    subtitle: {
        fontSize: '20@s',
        color: blue,
        fontFamily: 'RobotoBold',
    },
    buttonsContainer: {
        width: '100%',
        position: 'absolute',
        bottom: '40@s',
    },
    voted: {
        alignItems: 'center',
        marginTop: '18@s',
    },
    totalVoted: {
        alignItems: 'center',
        color: 'black',
        fontFamily: 'RobotoLight',
    },
    icon: {
        color: 'gray',
    },
    buttonsContainer: {
        marginTop: '30@s',
        alignItems: 'center',
    },
    buttonGoToProfile: {
        height: '50@s',
        width: '50%',
        backgroundColor: 'white',
        borderColor: blue,
        borderWidth: 1,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'RobotoBold',
    },
})

export default WorkerItem
