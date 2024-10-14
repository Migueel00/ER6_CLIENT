import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './homeScreen';
import ProfileScreen2 from './profileScreen2';
import SettingsScreen from './settings/settingsScreen';
import CameraScreen from './cameraScreen';
import ScannerScreen from './ScannerScreen';

const Tab = createMaterialTopTabNavigator();

const IstvanScreens = () => {
    const {height, width} = Dimensions.get('window')
    // Estado para manejar el modal de la cámara

    return (
        <NavigationContainer>
        <Tab.Navigator 
        screenOptions={() => ({
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
            component={HomeScreen}
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
            component={ProfileScreen2}
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
            component={SettingsScreen}
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
                    component={ScannerScreen}
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

export default IstvanScreens;