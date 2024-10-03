import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, LogBox, ImageBackground } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { socket } from '../App';

const kaotikaImage = require('../assets/png/KAOTIKA_BLOOD.png');
const buttonImage = require('../assets/png/button1.png');

type LabScreenProps = {
    userEmail: any,
    socketID: String,
    player:  any,
    
}

const LabScreen: React.FC<LabScreenProps> = ({userEmail, socketID, player}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isInsideLab, setIsInsideLab] = useState(player.isInsideLab);
    const [buttonText, setButtonText] = useState(isInsideLab ? "Lab Exit" : "Lab Entry");

    //TEMPORAL SE CAMBIARA EL FONDO EN VEZ DEL TEXTO
    const [screenText, setScreenText] = useState(isInsideLab ? "You are inside the lab" : "This is Angelo's laboratory door");
    const [labBackgroundImage, setLabBackgroundImage] = useState(isInsideLab ? require('../assets/png/insideLab.png') : require('../assets/png/LabEntrance.png'))

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
        setButtonText(isInsideLab ? "Exit from the LAB" : "Lab Entry");
        setScreenText(isInsideLab ? "You are inside the lab" : "This is Angelo's laboratory entrance");
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
            style={styles.background}
            resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
            >
        <View style={styles.container}>
            <Text style={styles.kaotikaFont}>{screenText}</Text>
            
            <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
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
                    <View style={styles.modalContent}>
                        <QRCode
                            value={qrValue ? JSON.stringify(qrValue) : "No email available"} // Convierte a cadena JSON
                            size={280}
                            logo={kaotikaImage}
                            logoSize={250}
                            logoBackgroundColor='transparent'
                            color='black'
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Close" onPress={toggleModal} />
                        </View>
                    </View>
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
    container: {
        flex: 1, 
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%', 
        height: '100%', 
        paddingTop: 20
        //opacity: 0.1
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        //backgroundColor: '#007bff',
        padding: 10,
        paddingTop: 480,
        borderRadius: 5,
    },
    buttonImageBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 310,  // Ajusta estos valores según el tamaño del botón
        height: 80,     // Por ejemplo, podrías ajustar el alto aquí
    },
    kaotikaButton: {
        backgroundColor: 'transparent',
        //padding: 10,
        //borderRadius: 5,
        fontFamily: 'KochAltschrift',
        fontSize: 40
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para el modal
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    kaotikaFont: {
        paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white', // Color blanco para el texto principal
    },
    buttonContainer: {
        marginTop: 10, // Esto mueve el botón más abajo
    },
});

export default LabScreen;