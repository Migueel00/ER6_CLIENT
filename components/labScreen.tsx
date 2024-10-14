import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppContext from '../helpers/context';
import { socket } from '../App';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Equipment from './Equipment';
import PotionCreator from './PotionCreator';

const buttonImage = require('../assets/png/button1.png');
const qrImage = require('../assets/png/epicQR3.png');
const insideLabImage = require('../assets/png/insideLab.png');
const outsideLabImage = require('../assets/png/LabEntrance.png');

const Tab = createBottomTabNavigator();

const LabEntry = () => {
    const { height, width } = Dimensions.get('window');
    const { userEmail, socketID, player } : any = useContext(AppContext);

    const [isInsideLab, setIsInsideLab] = useState(player.isInsideLab);
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonText, setButtonText] = useState(isInsideLab ? "Lab Exit" : "Lab Entry");
    const [screenText, setScreenText] = useState(isInsideLab ? "You are inside the lab" : "This is Angelo's laboratory door");
    const [labBackgroundImage, setLabBackgroundImage] = useState(isInsideLab ? insideLabImage : outsideLabImage);

    useEffect(() => {
        socket.on('ScanSuccess', (message: string) => {
        console.log("Mensaje del servidor:", message);
        setIsInsideLab(!isInsideLab);
        setModalVisible(false);
        });

    return () => {
        socket.off('ScanSuccess');
        };
    }, [isInsideLab]);

    useEffect(() => {
        setButtonText(isInsideLab ? "Exit from the LAB" : "Request entrance permission");
        setScreenText(isInsideLab ? "You are inside the lab" : "Angelo's laboratory entrance");
        setLabBackgroundImage(isInsideLab ? insideLabImage : outsideLabImage);
    }, [isInsideLab]);

    useEffect(() => {
        setIsInsideLab(player.isInsideLab);
    }, [player.isInsideLab]);

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
        userEmail: userEmail,
        socketId: socketID,
        playerID: player._id
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

const LabScreen = () => {

    // Cambiara segun appcontext
    const { height } = Dimensions.get('window');
    const { player } : any = useContext(AppContext);
    const [isInsideLab, setIsInsideLab] = useState(player.isInsideLab);
    return (
        <NavigationContainer independent={true}>
        {isInsideLab ? (
            <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                backgroundColor: 'black',
                height: height * 0.09, // Altura de la barra inferior
                paddingBottom: 5, // Espacio extra en la parte inferior
            },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarItemStyle: {
                justifyContent: 'center', // Centrar los iconos
                borderRightWidth: 0.2, // Bordes entre las pestañas
                borderRightColor: 'white', // Color de los bordes
                paddingHorizontal: 10,
                height: '100%',
            },
        }}
        >
        <Tab.Screen
            name="Lab Entry"
            component={LabEntry}
            options={{
            tabBarIcon: ({ focused }) => (
                <Image
                source={require('../assets/icons/home-icon.png')} // Icono personalizado para esta pestaña
                style={{
                    width: 70,
                    height: 70,
                    opacity: focused ? 1 : 0.2, // Cambiar opacidad basado en el enfoque
                    resizeMode: 'contain',
                    margin: 0
                }}
                />
            ),
            }}
        />
        <Tab.Screen
            name="Potion Creator"
            component={PotionCreator}
            options={{
            tabBarIcon: ({ focused }) => (
                <Image
                source={require('../assets/icons/lab-icon.png')}
                style={{
                    width: 70,
                    height: 70,
                    opacity: focused ? 1 : 0.2,
                    resizeMode: 'contain',
                    margin: 0
                }}
                />
            ),
            }}
        />
        </Tab.Navigator>
    ) : (
        // No se mostraran los iconos si esta fuera del laboratorio
        <LabEntry />
    )}
    </NavigationContainer>
);
};

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

export default LabScreen;
