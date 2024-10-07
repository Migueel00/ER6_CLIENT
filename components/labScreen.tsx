import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, LogBox, ImageBackground, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { socket } from '../App';

const kaotikaImage = require('../assets/png/KAOTIKA_BLOOD.png');
const buttonImage = require('../assets/png/button1.png');
const darkButtonImage = require('../assets/png/button2.png');
const qrImage = require('../assets/png/epicQR3.png');
const insideLabImage = require('../assets/png/insideLab.png');
const outsideLabImage = require('../assets/png/LabEntrance.png');

type LabScreenProps = {
    userEmail: any,
    socketID: String,
    player:  any,
    
}

const LabScreen: React.FC<LabScreenProps> = ({userEmail, socketID, player}) => {
    const {height, width} = Dimensions.get('window')
    const [modalVisible, setModalVisible] = useState(false);
    const [isInsideLab, setIsInsideLab] = useState(player.isInsideLab);
    const [buttonText, setButtonText] = useState(isInsideLab ? "Lab Exit" : "Lab Entry");

    //TEMPORAL SE CAMBIARA EL FONDO EN VEZ DEL TEXTO
    const [screenText, setScreenText] = useState(isInsideLab ? "You are inside the lab" : "This is Angelo's laboratory door");
    const [labBackgroundImage, setLabBackgroundImage] = useState(isInsideLab ? insideLabImage : outsideLabImage)

    console.log("Player is insideLab? " + isInsideLab);
    
    useEffect(() => {

        // Cambiar isInsideLab cuando se recibe OK! desde el servidor
        socket.on('ScanSuccess', (message: string) => {
            console.log("Mensaje del servidor:", message);

                // Cambiar el estado de isInsideLab
                setIsInsideLab(!isInsideLab);
                setModalVisible(false);
        });

        return () => {
            socket.off('ScanSuccess')
        }
    }, [isInsideLab]);

    // Actualiza el texto del botón según el estado
    useEffect(() => {
        setButtonText(isInsideLab ? "Exit from the LAB" : "Request entrance permission");
        setScreenText(isInsideLab ? "You are inside the lab" : "Angelo's laboratory entrance");
        setLabBackgroundImage(isInsideLab ? insideLabImage : outsideLabImage);
    }, [isInsideLab]);

    // Se controlará cuando se muestra o no el modal
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    // Función para gestionar la acción del botón
    const handleButtonPress = () => {
        if (isInsideLab) {
            setModalVisible(!modalVisible)
            // Aquí puedes manejar la salida del laboratorio si es necesario
        } else {
            toggleModal(); // Abrir el modal solo si es "Lab Entry"
        }
    };

    const qrValue = {
        userEmail: userEmail,
        socketId: socketID,
        playerID: player._id
    };
    
    console.log("QR VALUE BEFORE SENDING IS:" + JSON.stringify(qrValue));
    

    return (
        <ImageBackground
            source={labBackgroundImage} // Cambia esta ruta a la imagen que desees
            style={[styles.background, { width: width, height: height }]}
            >
        <View style={styles.container}>
            <Text style={styles.kaotikaFont}>{screenText}</Text>
            
            <TouchableOpacity onPress={handleButtonPress} style={styles.permissionButton}>
                <ImageBackground
                    source={buttonImage} // Ruta a tu imagen de fondo
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
                        style={styles.qrBackground}
                        resizeMode="cover" 
                        >
                        <QRCode
                            value={qrValue ? JSON.stringify(qrValue) : "No email available"} // Convierte a cadena JSON
                            size={120}
                            //logo={kaotikaImage}
                            //logoSize={250}
                            logoBackgroundColor='transparent'
                            color='#00BFAE'
                            backgroundColor='black'
                            //logoBorderRadius={100}
                        />


                    </ImageBackground>

                    <TouchableOpacity onPress={toggleModal} style={styles.permissionButton}>
                        <ImageBackground
                            source={buttonImage} // Ruta a tu imagen de fondo
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
        height: 430,
        width: 430,
        paddingTop: 0,
        //backgroundColor: 'transparent'
    },
    container: {
        flex: 1, 
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%', 
        height: '100%', 
        paddingTop: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    permissionButton: {
        //backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonImageBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 315,  // Tamaño real en pixeles del botón (habrá que refactorizar a full responsive?)
        height: 80,     // Tamaño real en pixeles del botón (habrá que refactorizar a full responsive?)
    },
    kaotikaButton: {
        backgroundColor: 'transparent',
        fontFamily: 'KochAltschrift',
        fontSize: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center',     
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    },
    modalContent: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    kaotikaFont: {
        paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white', 
    },
    buttonContainer: {

    },
});

export default LabScreen;