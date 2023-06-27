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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from "../components/CustomModal";
import AddProfession from "./AddProfession";
import AddDescriptionProfession from "./addDescriptionProfession";



const JobProfile = (props) => {

    const [worker, setWorker] = useState();
    const [jobs, setJobs] = useState();
    const [isModalAddProfession, setIsModalProfession] = useState(false);
    const [isModalAddDescriptionProfession, setIsModalDescriptionProfession] = useState(false);

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

    const getWorkerInfo = async () => {
        const principalStored = await AsyncStorage.getItem("principal");
        const token = await AsyncStorage.getItem('logged');
        const principal = JSON.parse(principalStored);
        axios.get(Url.worker + "/" + principal.userId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.data) {
                    setWorker(response.data);
                }
            })
            .catch(error => {
                console.log("ce un errore nella chiamata al worker " + error);
            })
    }

    const openModalAddProfession = () => {
        setIsModalProfession(true);
    }

    const openModalAddDescriptionProfession = () => {
        setIsModalDescriptionProfession(true);
    }

    const closeModalAddProfession = () => {
        setIsModalProfession(false);
    }
    const closeModalAddDescriptionProfession = () => {
        setIsModalDescriptionProfession(false);
    }

    useEffect(() => {
        getJobs();
        getWorkerInfo();
    }, [])

    useEffect(() => {
        getJobs();
        getWorkerInfo();
    }, [isModalAddDescriptionProfession || isModalAddProfession])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.inner}>
                    {worker && worker.job ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={openModalAddProfession}
                        >
                            <View>
                                <Text style={styles.labelJobEdit} >Professione</Text>
                                <Text style={styles.labelButton} >{worker.job}</Text>
                            </View>

                            <MaterialIcons name="edit" style={styles.icon} size={30} color={'gray'} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.button}
                            onPress={openModalAddProfession}
                        >
                            <Text style={styles.labelButton} >Aggiungi Professione</Text>
                            <MaterialCommunityIcons name="pen" style={styles.icon} size={30} color={'gray'} />
                        </TouchableOpacity>
                    }
                    {worker && worker.descriptionJob
                        ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={openModalAddDescriptionProfession}
                        >
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={styles.labelJobEdit} >Informazioni Professionali</Text>
                                <Text style={styles.labelButton} >{worker.descriptionJob}</Text>
                            </View>
                            <MaterialIcons name="edit" style={styles.icon} size={30} color={'gray'} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.button}
                            onPress={openModalAddDescriptionProfession}
                        >
                            <Text style={styles.labelButton} >Scrivi qualcosa sulla tua  professione</Text>
                            <MaterialCommunityIcons name="account" style={styles.icon} size={30} color={'gray'} />
                        </TouchableOpacity>}

                </View>

            </View>
            <CustomModal
                visible={isModalAddProfession}
                onPressClose={closeModalAddProfession}
                component={<AddProfession onPressClose={(() => setIsModalProfession(false))} job={worker && worker.job} />}
            />
            <CustomModal
                onPressClose={closeModalAddDescriptionProfession}
                visible={isModalAddDescriptionProfession}
                component={<AddDescriptionProfession onPressClose={(() => setIsModalDescriptionProfession(false))} descriptionJob={worker && worker.descriptionJob} />}
            />
        </>
    )
}

const blue = '#1d4e89';
// define your styles
const styles = ScaledSheet.create({
    container: {
        // flex: 1,
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
    icon: {
        alignItems: 'flex-end',
        marginRight: '10@s',
    },
    button: {
        flexDirection: 'row',
        width: '100%',
        height: '160@s',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 6,
        marginTop: '20@s',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    labelButton: {
        flex: 1,
        fontSize: '16@s',
        marginLeft: '4@s',
    },
    labelJobEdit: {
        fontFamily: 'RobotoLight',
        fontSize: '20@s',
        marginLeft: '4@s',
        color: 'black',

    }
});

export default JobProfile;