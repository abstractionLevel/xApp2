import React, { useState, useEffect } from 'react'
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native'
import WorkerItem from "./WorkerItem"
import { useNavigation } from '@react-navigation/native';
import axios from '../http/axios';
import Url from '../utils/Urls';

const WorkerList = props => {

    const [workers, setWorkers] = useState()
    const [principal, setPrincipal] = useState();
    const navigation = useNavigation();

    const findWorkers = async () => {
        const principalStored = await AsyncStorage.getItem('principal');
        const token = await AsyncStorage.getItem("logged");
        const principal = JSON.parse(principalStored)
        const job = props.route.params.searched;
        axios.get(Url.worker + "/workers", {
            params: {
                city:principal.address,
                job:job
            }
        }, {
            headers: {
                "Authorizazion": "Bearer " + token
            }
        }).then(response => {
            if (response.data) {
                console.log(response.data);
            }
        }).catch(error => {
            console.log("ce un errore nel cercare i workers: ", error)
        })

    }
    useEffect(() => {
        findWorkers();

    }, [props.route.params.searched])

    const Item = ({ item }) => (
        <View>
            <Text>{item.type}</Text>
            <Text>{item.vote}</Text>
        </View>
    )

    return (
        <View>
            {workers ? <FlatList
                data={workers && workers}
                renderItem={({ item }) => <WorkerItem item={item} />}
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
