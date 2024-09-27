import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type LabScreenProps = {
    userEmail: any
}

const LabScreen: React.FC<LabScreenProps> = (userEmail) => {
    const [modalVisible, setModalVisible] = useState(false);

    //Se controlara cuando se muestra o no el modal
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Kaotika's Laboratory</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.button}>
                <Text style={styles.buttonText}>Lab Entry</Text>
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
                            value={userEmail || "No email available"} // Usa el email del usuario autenticado
                            size={200}
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