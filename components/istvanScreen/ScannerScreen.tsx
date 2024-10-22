import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CameraScreen from './cameraScreen';
import AppContext from '../../helpers/context';

const {height, width} = Dimensions.get('window')
const ScannerScreen = () => {

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
                source={require('../../assets/png/cameraScreenEye.png')}
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
        height: height *0.4,
        width: width *0.8,
        opacity: 0, // Aplica la opacidad al contenedor del botón
        backgroundColor: 'purple',
        borderRadius: height * 0.2,
        top: height * - 0.2,  // Centrado verticalmente
        left: width * 0.12,  // Centrado horizontalmente
        transform: [{ translateX: -50 }, { translateY: -50 }],  // Ajuste para centrar el botón
    },
    kaotikaFont: {
        paddingTop: height * 0.02,
        fontFamily: 'KochAltschrift',
        fontSize: width * 0.12,
        color: 'white', 
    },
});

export default ScannerScreen;