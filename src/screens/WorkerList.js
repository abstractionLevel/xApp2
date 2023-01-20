import React, {useState, useEffect} from 'react'
import services from '../services'
import {View, FlatList, StyleSheet,Text} from 'react-native'
import WorkerItem from "./WorkerItem"
import {useGlobalContext} from '../../context';
import { useNavigation } from '@react-navigation/native';

const WorkerList = props => {
    const [workers, setWorkers] = useState()

    const navigation = useNavigation();
    const {removeTokenAuth} = useGlobalContext()


    useEffect(() => {
        services
            .findWorkers({
                worker: props.route.params.searched,
                citta: 'gorizia',
            })
            .then(response => {
                setWorkers(response.data)
            })
            .catch(err => {
                if(err.response.status===404) {
                    setWorkers(null)
                }
                if(err.response.status===401) {
                    removeTokenAuth()
                    navigation.navigate('Home', {logout:true })
                }
                
            })
    }, [props.route.params.searched])

    const Item = ({item}) => (
        <View>
            <Text>{item.type}</Text>
            <Text>{item.vote}</Text>
        </View>
    )

    return (
        <View>
            {workers ? <FlatList 
                data={workers && workers} 
                renderItem={({item})=> <WorkerItem item={item} />}
                keyExtractor={item => item.id}    
                />
                :
                <View style={styles.viewNoWorkers}>
                    <Text style={styles.labelNoWorkers}>Nessun {props.route.params.searched} Trovato</Text>
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    
    labelNoWorkers: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'RobotoMedium',
        marginTop: '40%',
        opacity: 0.50,

    }
});


export default WorkerList
