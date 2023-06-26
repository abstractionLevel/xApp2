import React , {useState,useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native'

const SearchWorker = (props) => {
    
    const [searched,setSearched] = useState(null)

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor="gray"
                underlineColorAndroid="white"
                style={styles.inputSearch}
                placeholder='Cosa Cerchi?'
                onChangeText={(val) => setSearched(val)}
                value={searched}
            />
            <TouchableOpacity
                style={styles.buttonSearch}
                onPress={() => navigation.navigate('WorkerList', {searched: searched})}>
                <Text style={styles.buttonText} >Cerca</Text>
            </TouchableOpacity>
        </View>
    )
}


var { width, height } = Dimensions.get('window');

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        padding: 10,

    },
    inputSearch: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        fontSize: 20,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderColor: '#0088ff',
        borderWidth: 1,
        paddingLeft: 10,

    },
    buttonSearch: {
        marginTop: 4,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#0096FF',
        borderRadius: 6,
    },

    buttonText: {
        textAlign: 'center',
        fontFamily: 'RobotoBold',
        fontSize: 18,
        marginRight: 2,
        color: 'white',
    },
});



export default SearchWorker;