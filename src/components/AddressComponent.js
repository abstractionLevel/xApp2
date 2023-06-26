import React,{useState,useEffect} from 'react';
import {
    Text,
    Modal,
    Alert,
    View,
    Pressable,
    StyleSheet,
	TouchableOpacity
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';  
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScaledSheet } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const AddressComponent = () => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
			<View style={styles.containerLocation}>
				<TouchableOpacity
					style={styles.buttonAddLocation}
					onPress={() => setModalVisible(true)}>
					<Text style={styles.textAddLocation} >aggiungi indirizzo</Text>
				</TouchableOpacity>
				< TouchableOpacity
					style={styles.buttonMap}
					onPress={() => console.log("Map")}>
					<MaterialCommunityIcons style={styles.iconMap} name="map-marker-outline" size={28} color={'#0096FF'} />
				</TouchableOpacity>
			</View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
                }}
            >
				<View style={styles.modalContainer}>
					<View style={styles.buttonView}>
						<TouchableOpacity
							style={styles.buttonClose}
							onPress={()=>setModalVisible(false)}>
							<Entypo name="cross" style={styles.iconCross} size={40} color={'gray'} />
						</TouchableOpacity>
					</View>
					<View style={styles.ViewPosition}>
                        <TouchableOpacity
                            style={styles.buttonAndress}
                            onPress={() => console.log()}>
                            <Text></Text>
                            <Ionicons name="search-outline" style={styles.iconSearch} size={30} color={'red'} />
                            <Text style={styles.textSearchAddress} >Search andress</Text>
                        </TouchableOpacity>
                        <View style={styles.line}></View>
                    </View>
				</View>
            </Modal>
        </View>
    );
};

const styles = ScaledSheet.create({
	modalContainer: {
        backgroundColor: 'white',
        height: '40%',
        marginTop: 'auto',
    },
	buttonView: {
        width: '100%',
        height: '7%',
        justifyContent: 'flex-end',
        flexDirection: "row",
    },
	buttonClose: {
        width: '30@s',
        height: '30@s',
    },
	ViewPosition: {
        marginLeft: '20@s',
        marginTop: '10@s',
        marginHorizontal: 10,
    },
	buttonAndress: {
        flexDirection: 'row',
        marginBottom: '4@s',
    },
	iconSearch: {
        marginBottom: '10@s',
    },
	line: {
        borderWidth: '0.50@s',
        borderColor: 'gray'
    },
	textSearchAddress: {
        fontFamily: 'RobotoBoldItalic',
        color: 'red',
        fontSize: '16@s',
        marginLeft: '6@s',
        marginTop: '3@s',
    },
	buttonAddLocation: {
        borderRadius: 6,
        //backgroundColor: 'white',
    },
	buttonAndress: {
        flexDirection: 'row',
        width: '80%',
		marginRight:'10@s',
    },
	containerLocation: {
        width: '100%',
        height: '50@s',
        marginTop: '5@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
		margin: '5@s'
    },
	containerMapPosition: {
        flexDirection: 'row',
        width: '100%',
        height: '60@s',
        marginHorizontal: 10,
        marginTop: 30,

    },
	textAddLocation: {
        fontFamily: 'RobotoMedium',
        color: '#0096FF',
        fontSize: 20,
        padding: 5,
        //textAlign: 'center',
    },
	buttonMap: {
        alignItems: 'center',
    },
	iconMap: {
        marginRight: '20@s',
    },
	iconCross: {
		marginTop: '4@s',
		marginLeft: '-5@s',
	}
});
  
export default AddressComponent;