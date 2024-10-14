import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CameraScreen from './cameraScreen';
import AppContext from '../helpers/context';

const ScannerScreen = () => {
    const {height, width} = Dimensions.get('window')
    // Estado para manejar el modal de la cámara
    const [isCameraModalVisible, setCameraModalVisible] = useState(false);

    // Función para abrir el modal de la cámara
    const openCameraModal = () => {
        setCameraModalVisible(true);
    };

    // Función para cerrar el modal de la cámara
    const closeCameraModal = () => {
        setCameraModalVisible(false);
    };

    const socket = useContext(AppContext)?.socket;
    
    useEffect(() => {

        // Cambiar isInsideLab cuando se recibe OK! desde el servidor
        socket.on('ScanSuccess', (message: string) => {
            console.log("Mensaje del servidor:", message);

            setCameraModalVisible(false);
        });

        return () => {
            socket.off('ScanSuccess')
        }
    }, []);

    return (
        <ImageBackground
                source={require('../assets/png/cameraScreenEye.png')}
                style={[styles.background, { width: width, height: height }]}
            >
                <View style={styles.container}> 
                    <Text style={styles.kaotikaFont}>Touch the eye to use</Text>
                    <Text style={styles.kaotikaFont}>Morghul's Sight</Text>

                    <Modal
                        visible={isCameraModalVisible}
                        animationType="fade"
                        onRequestClose={closeCameraModal}
                    >
                        <CameraScreen onClose={closeCameraModal} />
                    </Modal>
                </View>

                <TouchableOpacity onPress={openCameraModal} style={styles.eyeButton}>

                </TouchableOpacity>
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
    },
    eyeButton: {
        height: 135,
        width: 135,
        opacity: 0, // Aplica la opacidad al contenedor del botón
        backgroundColor: 'purple',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',  // Para centrarlo en la pantalla
        top: '42.5%',  // Centrado verticalmente
        left: '45%',  // Centrado horizontalmente
        transform: [{ translateX: -50 }, { translateY: -50 }],  // Ajuste para centrar el botón
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    kaotikaFont: {
        paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white', 
    },
});

export default ScannerScreen;