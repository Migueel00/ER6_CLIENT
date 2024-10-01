import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity } from 'react-native';
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
    const [buttonVisible, setButtonVisible] = useState(true);

    useEffect(() => {
        // Escuchar el evento 'ScanSuccess' desde el servidor
        socket.on('ScanSuccess', (message: string) => {
            console.log("Mensaje del servidor:", message);

            //Desapareceran el modal y el boton
            setModalVisible(false);
            setButtonVisible(false);
        });
    }, []);

    // Se controlará cuando se muestra o no el modal
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const qrValue = {
        userEmail: userEmail,
        socketId: socketID,
        playerID: player.id
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Kaotika's Laboratory</Text>
            {buttonVisible && (
                <TouchableOpacity onPress={toggleModal} style={styles.button}>
                    <Text style={styles.buttonText}>Lab Entry</Text>
                </TouchableOpacity>
            )}
            
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
