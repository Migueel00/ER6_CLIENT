import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppContext from '../helpers/context';

const kaotikaImage = require('../assets/png/KAOTIKA_BLOOD.png');
const buttonImage = require('../assets/png/button1.png');
const darkButtonImage = require('../assets/png/button2.png');
const qrImage = require('../assets/png/epicQR3.png');
const insideLabImage = require('../assets/png/insideLab.png');
const outsideLabImage = require('../assets/png/LabEntrance.png');

const LabScreen = () => {
    const { height, width } = Dimensions.get('window');
    const context = useContext(AppContext);

    
    

    // Inicializa el estado isInsideLab con el valor de player.isInsideLab
    const [isInsideLab, setIsInsideLab] = useState(context?.player.isInsideLab);
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonText, setButtonText] = useState(isInsideLab ? "Lab Exit" : "Lab Entry");
    const [screenText, setScreenText] = useState(isInsideLab ? "You are inside the lab" : "This is Angelo's laboratory door");
    const [labBackgroundImage, setLabBackgroundImage] = useState(isInsideLab ? insideLabImage : outsideLabImage);

    useEffect(() => {
        // Escucha el mensaje del servidor para cambiar isInsideLab
        context?.socket.on('ScanSuccess', (message: string) => {
            console.log("Mensaje del servidor:", message);
            // Cambiar el estado de isInsideLab al contrario del actual
            setIsInsideLab(!isInsideLab);
            setModalVisible(false);
        });

        return () => {
            context?.socket.off('ScanSuccess');
        };
    }, []);

    // Actualiza el texto del botón y el fondo cada vez que cambie isInsideLab
    useEffect(() => {
        setButtonText(isInsideLab ? "Exit from the LAB" : "Request entrance permission");
        setScreenText(isInsideLab ? "You are inside the lab" : "Angelo's laboratory entrance");
        setLabBackgroundImage(isInsideLab ? insideLabImage : outsideLabImage);
    }, [isInsideLab]);

    // Actualiza isInsideLab si el valor de player.isInsideLab cambia
    useEffect(() => {
        setIsInsideLab(context?.player.isInsideLab);
    }, [context?.player.isInsideLab]);

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
        playerID: context?.player.id
    };

    console.log("QR VALUE BEFORE SENDING IS:" + JSON.stringify(qrValue));

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
                                <Text style={styles.kaotikaButton}>Hide your medalion</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
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
