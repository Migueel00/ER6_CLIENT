import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, LogBox } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { socket } from '../App';

const kaotikaImage = require('../assets/png/KAOTIKA_BLOOD.png');

type LabScreenProps = {
    userEmail: any,
    socketID: String,
    player:  any,
    
}

const LabScreen: React.FC<LabScreenProps> = ({userEmail, socketID, player}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isInsideLab, setIsInsideLab] = useState(player.isInsideLab);
    const [buttonText, setButtonText] = useState(isInsideLab ? "Lab Exit" : "Lab Entry")
    
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
        setButtonText(isInsideLab ? "Lab Exit" : "Lab Entry");
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
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Kaotika's Laboratory</Text>
            
            <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                <Text style={styles.buttonText}>{buttonText}</Text>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray', // Personaliza el fondo
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
    buttonContainer: {
        marginTop: 10, // Esto mueve el botón más abajo
    },
});

export default LabScreen;
