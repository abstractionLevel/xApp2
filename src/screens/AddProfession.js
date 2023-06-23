import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList
} from 'react-native'
import { AsyncStorage } from 'react-native';
import Url from "../utils/Urls";
import axios from '../http/axios';
import { ScaledSheet } from 'react-native-size-matters';


const AddProfession = (props) => {

    const [jobs, setJobs] = useState();
    const [searchJob, setSearchJob] = useState();
    const [filterJobs, setFilterJobs] = useState([]);
    const onPressClose = props.onPressClose;


    const getJobs = async () => {
        const token = await AsyncStorage.getItem('logged');
        axios.get(Url.getAllJob, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                setJobs(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const itemViewJob = ({ item }) => {
        return (
            <View style={styles.filterJobsView}>
                <TouchableOpacity
                    onPress={() => onPressJobsFIlter(item.name)}
                >
                    <Text style={styles.filterJobsText} >{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const searchJobFilter = (text) => {
        if (text) {
            const newData = jobs.filter((value) => {
                const itemData = value.name ? value.name : '';
                const textData = text.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterJobs(newData);
            setSearchJob(text);
        } else {
            setFilterJobs([]);
            setSearchJob(text)
        }
    }

    const onPressJobsFIlter = job => {
        setSearchJob(job);
        setFilterJobs([]);
    }

    useEffect(() => {
        getJobs();
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={{
                    marginTop: 20,
                    fontWeight: '500',
                    letterSpacing: 2,
                }}>
                    Aggiungi Professione
                </Text>
                <TextInput
                    style={{
                        width: '100%',
                        height: 50,
                        fontSize: 18,
                        borderBottomWidth: 1,
                        // paddingLeft: 10,
                        backgroundColor: 'white',
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                    onChangeText={(text) => searchJobFilter(text)}
                    value={searchJob}
                />
                <View style={styles.containerFilterJobs}>
                    <FlatList
                        data={filterJobs}
                        keyboardShouldPersistTaps={'always'}
                        keyExtractor={(item, index) => { return index.toString() }}
                        renderItem={itemViewJob}
                    />
                </View>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={onPressClose}
                >
                    <Text style={styles.buttonText} >Salva</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={onPressClose}
                >
                    <Text style={styles.buttonText} >Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const blue = '#1d4e89';

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex:1,
        padding: 24,
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
    },
    containerFilterJobs: {
        width: '100%',
        borderColor: '#0088ff',
    },
    buttonView: {
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonClose: {
        backgroundColor: 'orange',
        width: '40%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});

export default AddProfession;