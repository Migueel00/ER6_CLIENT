import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppContext from '../helpers/context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const buttonImage = require('../assets/png/button1.png');
const qrImage = require('../assets/png/epicQR3.png');
const insideLabImage = require('../assets/png/insideLab.png');

const Tab = createBottomTabNavigator();

const InsideLab = () => {
    const { height, width } = Dimensions.get('window');
    const context = useContext(AppContext);

    // Inicializa el estado isInsideLab con el valor de player.isInsideLab
    const [isInsideLab, setIsInsideLab] = useState(context?.player.isInsideLab);
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonText, setButtonText] = useState("Request exit permission");
    const [screenText, setScreenText] = useState("You are inside lab");
    const [labBackgroundImage, setLabBackgroundImage] = useState(insideLabImage);

    useEffect(() => {
        // Escucha el mensaje del servidor para cambiar isInsideLab
        context?.socket.on('ScanSuccess', (message: string) => {
            console.log("Mensaje del servidor:", message);
    
            // Usa la forma funcional de setState para asegurarte de obtener el valor más reciente de isInsideLab
            setIsInsideLab(!isInsideLab);
    
            setModalVisible(false);
        });
    
        return () => {
            context?.socket.off('ScanSuccess');
        };
    }, [isInsideLab]);
    
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleButtonPress = () => {
        if (isInsideLab) {
        setModalVisible(!modalVisible);
        } else {
        toggleModal();
        }
    };

    const qrValue = {
        userEmail: context?.player.email,
        socketId: context?.socketID,
        playerID: context?.player._id
    };

    return (
        <ImageBackground
        source={labBackgroundImage}
        style={[styles.background, { width: width, height: height }]}
        >
        <View style={styles.container}>
            <Text style={styles.kaotikaFont}>{screenText}</Text>

            <TouchableOpacity onPress={handleButtonPress} style={styles.permissionButton}>
            <ImageBackground
                source={buttonImage}
                style={styles.buttonImageBackground}
                resizeMode="cover"
            >
                <Text style={styles.kaotikaButton}>{buttonText}</Text>
            </ImageBackground>
            </TouchableOpacity>

            <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={toggleModal}
            >
            <View style={styles.modalContainer}>
                <ImageBackground
                source={qrImage}
                style={[styles.qrBackground, { width: width * 0.7, height: height * 0.4 }]}
                resizeMode="cover"
                >
                <QRCode
                    value={qrValue ? JSON.stringify(qrValue) : "No email available"}
                    size={width * 0.23}
                    logoBackgroundColor='transparent'
                    color='#00BFAE'
                    backgroundColor='black'
                />
                </ImageBackground>

                <TouchableOpacity onPress={toggleModal} style={styles.permissionButton}>
                <ImageBackground
                    source={buttonImage}
                    style={styles.buttonImageBackground}
                    resizeMode="cover"
                >
                    <Text style={styles.kaotikaButton}>Hide your medallion</Text>
                </ImageBackground>
                </TouchableOpacity>
            </View>
            </Modal>
        </View>
        </ImageBackground>
    );
};

// const LabScreen = () => {

//     // Cambiara segun appcontext
//     const { height } = Dimensions.get('window');

//     const context = useContext(AppContext);
//     const [isInsideLab, setIsInsideLab] = useState(context?.player.isInsideLab);
//     return (
//         <NavigationContainer independent={true}>
//         {isInsideLab ? (
//             <Tab.Navigator
//             screenOptions={{
//                 tabBarStyle: {
//                 backgroundColor: 'black',
//                 height: height * 0.09, // Altura de la barra inferior
//                 paddingBottom: 5, // Espacio extra en la parte inferior
//             },
//                 tabBarShowLabel: false,
//                 headerShown: false,
//                 tabBarItemStyle: {
//                 justifyContent: 'center', // Centrar los iconos
//                 borderRightWidth: 0.2, // Bordes entre las pestañas
//                 borderRightColor: 'white', // Color de los bordes
//                 paddingHorizontal: 10,
//                 height: '100%',
//             },
//         }}
//         >
//         <Tab.Screen
//             name="Lab Entry"
//             component={LabEntry}
//             options={{
//             tabBarIcon: ({ focused }) => (
//                 <Image
//                 source={require('../assets/icons/fixed/homeIcon.png')} // Icono personalizado para esta pestaña
//                 style={{
//                     width: 70,
//                     height: 70,
//                     opacity: focused ? 1 : 0.2, // Cambiar opacidad basado en el enfoque
//                     resizeMode: 'contain',
//                     margin: 0
//                 }}
//                 />
//             ),
//             }}
//         />
//         <Tab.Screen
//             name="Potion Creator"
//             component={PotionCreator}
//             options={{
//             tabBarIcon: ({ focused }) => (
//                 <Image
//                 source={require('../assets/icons/fixed/potionIcon.png')}
//                 style={{
//                     width: 70,
//                     height: 70,
//                     opacity: focused ? 1 : 0.2,
//                     resizeMode: 'contain',
//                     margin: 0
//                 }}
//                 />
//             ),
//             }}
//         />
//         </Tab.Navigator>
//     ) : (
//         // No se mostraran los iconos si esta fuera del laboratorio
//         <LabEntry />
//     )}
//     </NavigationContainer>
// );
// };

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrBackground: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 20
    },
    permissionButton: {
        padding: 10,
        borderRadius: 5,
    },
    buttonImageBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 315,
        height: 80,
    },
    kaotikaButton: {
        backgroundColor: 'transparent',
        fontFamily: 'KochAltschrift',
        fontSize: 30
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    kaotikaFont: {
        paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white',
    },
});

export default InsideLab;
