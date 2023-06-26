import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView
} from 'react-native'
import { AsyncStorage } from 'react-native';
import Url from "../utils/Urls";
import axios from '../http/axios';
import { ScaledSheet } from 'react-native-size-matters';


const AddProfession = (props) => {

    const [jobs, setJobs] = useState();
    const [searchJob, setSearchJob] = useState(null);
    const [filterJobs, setFilterJobs] = useState([]);
    const [heightContent, setHeightContent] = useState('40%');
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

    const saveJob = async () => {
        const token = await AsyncStorage.getItem('logged');
        const principalStored = await AsyncStorage.getItem("principal")
        const principal = JSON.parse(principalStored)
        if (searchJob !== null) {
            axios.put(Url.worker + "/" + principal.userId + "/job", { job: searchJob }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {
                    onPressClose();
                }).catch(error => {
                    console.log("ce un errore nel salvataggio del job ", error);
                })
        } else {
            console.log("searchJob e' null");
        }
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
        setSearchJob(props.job ? props.job : null);
    }, [])

    return (
        <View style={{
            height: heightContent,
            backgroundColor: 'white'
        }}>
            <View style={styles.inner}>
                <View style={{ width: '90%', marginTop: 20 }}>
                    <Text style={styles.label}>
                        Professione
                    </Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => searchJobFilter(text)}
                    value={searchJob}
                    onFocus={() => setHeightContent('75%')}
                />
                <View style={styles.containerFilterJobs}>
                    <FlatList
                        data={filterJobs}
                        keyboardShouldPersistTaps={'always'}
                        keyExtractor={(item, index) => { return index.toString() }}
                        renderItem={itemViewJob}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={saveJob}
                >
                    <Text style={styles.text} >Salva</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={onPressClose}
                >
                    <Text style={styles.textClose} >Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const blue = '#1d4e89';

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    containerFilterJobs: {
        width: '100%',
        borderColor: '#0088ff',
    },
    buttonView: {
        padding: 24,
    },
    buttonClose: {
        flexDirection: 'row',
        height: '40@s',
        borderRadius: 6,
        marginTop: '10@s',
        alignItems: 'center',
        borderColor: 'gray',
        justifyContent: 'center',
        borderWidth: 0.40,
        width: '90%',
    },
    buttonSave: {
        flexDirection: 'row',
        height: '40@s',
        borderRadius: 6,
        marginTop: '18@s',
        alignItems: 'center',
        backgroundColor: '#0088ff',
        justifyContent: 'center',
        width: '90%',
    },
    input: {
        height: '43@s',
        fontSize: 18,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.40,
        borderRadius: 3,
        marginTop: '6@s',
        width: '90%'
    },
    label: {
        fontWeight: '600',
        color: 'black',
    },
    text: {
        fontFamily: 'RobotoLight',
        fontSize: '18@s',
        marginLeft: '4@s',
        color: 'white',
        marginLeft: '10@s',
    },
    textClose: {
        fontFamily: 'RobotoLight',
        fontSize: '18@s',
        marginLeft: '4@s',
        color: '#0088ff',
        marginLeft: '10@s',
    },
    head: {
        backgroundColor: 'white',
        padding: 24,
        borderBottomWidth: 0.40,
    },
});

export default AddProfession;