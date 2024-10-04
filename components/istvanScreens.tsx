import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Image, ImageBackground, Modal, StyleSheet, View } from 'react-native';
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
    const {height} = Dimensions.get('window')
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
        <Tab.Navigator screenOptions={{tabBarStyle: {
            backgroundColor: "black",
            height: height*0.09,
        },
        tabBarIndicatorStyle: {
            backgroundColor: "orange"
        }}}>
                <Tab.Screen
            name='home'
            children={() => <HomeScreen role={userRole} />}
            options={{
                
                tabBarIcon: ({}) => (
                <Image
                    source={require('../assets/icons/home-icon.png')}
                    style={{ width: 38, height: 38}}
                />
                ),
                tabBarLabel: ({}) => null,
    
            }} 
            />
            <Tab.Screen
            name="Proe"
            children={() => <ProfileScreen2 profileAttributesToPrint={profileAttributes} />}
            options={{
                tabBarIcon: ({}) => (
                    <Image
                    source={require('../assets/icons/profile-icon.png')}
                    style={{width: 38, height: 38}}
                    />
                ),
                tabBarLabel: ({}) => null,
            }}
            />
            <Tab.Screen
            name="Settings"
            children={() => <SettingsScreen setIsLoggedIn={setIsLoggedIn} />}
            options={{
                
                tabBarIcon: ({}) => (
                <Image
                    source={require('../assets/icons/settings-icon.png')}
                    style={{ width: 38, height: 38}}
                />
                ),
                tabBarLabel: ({}) => null,
    
            }}
        />
                <Tab.Screen
                    name="CAM"
                    children={() => (
                        <ImageBackground
                            source={require('../assets/png/cameraScreenEye.png')}
                            style={styles.background}
                            resizeMode="cover"
                        >
                            <View style={styles.container}>
                                <View style={styles.button}>
                                    <Button title="Open Camera" onPress={openCameraModal} />
                                </View>
                                <Modal
                                    visible={isCameraModalVisible}
                                    animationType="slide"
                                    onRequestClose={closeCameraModal}
                                >
                                    <CameraScreen onClose={closeCameraModal} />
                                </Modal>
                            </View>
                        </ImageBackground>
                    )}
                />
            </Tab.Navigator>
        </NavigationContainer>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 115,
        width: 75,
        opacity: 0, // Aplica la opacidad al contenedor del botón
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default IstvanScreens;