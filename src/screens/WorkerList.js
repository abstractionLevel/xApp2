import React, {useState, useEffect} from 'react'
import services from '../services'
import {View, FlatList, Dimensions, AppRegistry,Text} from 'react-native'

const WorkerList = props => {
    const [workers, setWorkers] = useState(null)

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
                console.log('err', err)
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
            <FlatList 
                data={workers && workers} 
                renderItem={({item})=> <Item item={item} />}
                keyExtractor={item => item.id}    
                />
        </View>
    )
}

export default WorkerList
