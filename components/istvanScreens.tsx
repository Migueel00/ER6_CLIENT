import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './homeScreen';
import ProfileScreen2 from './profileScreen2';
import SettingsScreen from './settings/settingsScreen';
import CameraScreen from './cameraScreen';
import { socket } from '../App';

const Tab = createMaterialTopTabNavigator();
interface Player {
    socketId:     string,
    email:        string,
    nickname:     string,
    isInsideLab:  boolean,
    avatar:       string,
    id:           string
}


type IstvanScreensProps = {
    userRole: string;
    profileAttributes: any;
    setIsLoggedIn: any;
};

const IstvanScreens: React.FC<IstvanScreensProps> = ({ userRole, profileAttributes, setIsLoggedIn}) => {
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
        <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen
            name="Home"
            children={() => <HomeScreen role={userRole} />}
            />
            <Tab.Screen
            name="Profile"
            children={() => <ProfileScreen2 profileAttributesToPrint={profileAttributes} />}
            />
            <Tab.Screen
            name="Settings"
            children={() => <SettingsScreen setIsLoggedIn={setIsLoggedIn} />}
            />
            <Tab.Screen
            name="CAM"
            children={() => (
                <View style={styles.container}>
                <Text style={styles.title}>Epic Scanner</Text>
                <Button title="Open Camera" onPress={openCameraModal} />
                {/* Modal de la cámara */}
                <Modal
                    visible={isCameraModalVisible}
                    animationType="slide"
                    onRequestClose={closeCameraModal}
                >
                    <CameraScreen onClose={closeCameraModal}/>
                </Modal>
                </View>
            )}
            />
        </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightcoral', // Personaliza el fondo
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default IstvanScreens;