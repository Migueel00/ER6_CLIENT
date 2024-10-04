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
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarStyle: {
                backgroundColor: 'black',
                height: height * 0.10, // Incremento en la altura para más espacio
                paddingBottom: 1, // Añade espacio en la parte inferior de la barra
            },
            tabBarIconStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,  // Puedes ajustar el ancho de los íconos
                height: 50, // Ajusta el alto para dar más espacio
            },
            tabBarIndicatorStyle: {
                backgroundColor: 'orange',
                height: 3, // Ajusta el grosor del indicador de la pestaña
            },
            tabBarItemStyle: {
                justifyContent: 'center', // Asegura que los íconos se centren
                borderRightWidth: 0.2,  // Agrega un borde entre pestañas
                borderRightColor: 'white', // Color del borde
                paddingHorizontal: 10,
                height: '100%'
            },
        })}>
                <Tab.Screen
            name='home'
            children={() => <HomeScreen role={userRole} />}
            options={{
                
                tabBarIcon: ({}) => (
                <Image
                    source={require('../assets/icons/fixed/homeIcon.png')}
                    style={{ width: 70, height: 70}}
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
                    source={require('../assets/icons/fixed/profileIcon.png')}
                    style={{width: 70, height: 70}}
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
                    source={require('../assets/icons/fixed/settingsIcon.png')}
                    style={{ width: 70, height: 70}}
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
                    options={{
                
                        tabBarIcon: ({}) => (
                        <Image
                            source={require('../assets/icons/istvanScannerIcon.png')}
                            style={{ width: 70, height: 70}}
                        />
                        ),
                        tabBarLabel: ({}) => null,
            
                    }}
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