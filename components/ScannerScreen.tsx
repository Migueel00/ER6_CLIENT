import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Modal, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import CameraScreen from './cameraScreen';
import AppContext from '../helpers/context';

const { height, width } = Dimensions.get('window');

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
            socket.off('ScanSuccess');
        };
    }, []);

    return (
        <Background source={require('../assets/png/cameraScreenEye.png')} style={{ width, height }}>
            <Container>
                <KaotikaText>Touch the eye to use</KaotikaText>
                <KaotikaText>Morghul's Sight</KaotikaText>

                <Modal
                    visible={isCameraModalVisible}
                    animationType="fade"
                    onRequestClose={closeCameraModal}
                >
                    <CameraScreen onClose={closeCameraModal} />
                </Modal>
            </Container>

            <EyeButton onPress={openCameraModal} />
        </Background>
    );
};

const Background = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`;

const EyeButton = styled.TouchableOpacity`
    height: ${height * 0.4}px;
    width: ${width * 0.9}px;
    background-color: purple;
    border-radius: ${width * 0.60}px;
    bottom: ${width * 0.55}px;
`;

const KaotikaText = styled.Text`
    padding-top: 20px;
    font-family: 'KochAltschrift';
    font-size: 40px;
    color: white;
`;

export default ScannerScreen;