import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import axios from '../http/axios';
import Url from "../utils/Urls";
import { AsyncStorage } from 'react-native';


const JobProfile = (props) => {

    const [jobs, setJobs] = useState();
    const [searchJob, setSearchJob] = useState();
    const [filterJobs, setFilterJobs] = useState([]);

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
                <Text style={styles.label} >Aggiungi La Tua Professione</Text>
                <TextInput
                    style={styles.inputAddWork}
                    placeholder='Aggiungi la tua professione'
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
                <Text style={styles.label} >Aggiungi una descrizione  </Text>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="add your own description"
                        placeholderTextColor="grey"
                        numberOfLines={20}
                        multiline={true}
                    // onChangeText={(text) => setState({ ...state, description: text })}
                    // value={state.description}
                    />
                </View>
                {/* <Text style={styles.error}>{error.description}</Text> */}
                <TouchableOpacity
                    style={styles.buttonSave}
                // onPress={() => onSubmit()}
                >
                    <Text style={styles.saveWorkText} >Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const blue = '#1d4e89';
// define your styles
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },
    inner: {
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    inputAddWork: {
        width: '100%',
        height: '50@s',
        fontSize: '18@s',
        borderRadius: 10,
        // borderWidth: 0.10,
        color: 'black',
        // paddingLeft: 10,
        backgroundColor: 'white',
        marginBottom: 5,

    },
    textAreaContainer: {
        borderColor: 'white',
        borderWidth: 0.10,
        borderRadius: 2,
        width: '100%',
        borderColor: 'black',
        justifyContent: "flex-start",
        padding: 5
    },
    textArea: {
        height: 200,
        textAlignVertical: 'top',
        fontSize: '14@s',
        fontFamily: 'RobotoItalic',
        backgroundColor: 'white'

    },
    buttonSave: {
        width: '100%',
        height: '40@s',
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginLeft: '4@s',
        borderWidth: 0.2,
    },
    saveWorkText: {
        color: '#1d4e89',
        fontSize: '20@s',
        fontFamily: 'RobotoBold',
        padding: 4,
    },
    filterJobsText: {
        fontSize: '18@s',
        color: '#0088ff',
        marginLeft: 5,
        zIndex: 200,
        padding: 4,
        fontFamily: 'RobotoBold',
    },
    filterJobsView: {
        backgroundColor: 'white'

    },
    label: {
        fontFamily: 'RobotoItalic',
        color: 'orange',
        fontSize: '20@s',
        textAlign: 'center',
        marginBottom: '5@s'
    },
    containerFilterJobs: {
        width: '100%',
        borderColor: '#0088ff',
    },
});

export default JobProfile;