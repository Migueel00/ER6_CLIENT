import React from 'react';
import { Dimensions, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../shared/homeScreen';
import SettingsScreen from '../settings/settingsScreen';
import ScannerScreen from './ScannerScreen';
import ProfileScreen3 from '../shared/ProfileScreen';
import styled from 'styled-components/native';
import * as CONSTANTS from "../../src/constants";
import MainTabNavigator from '../shared/MainTabNavigator';

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const IstvanScreens = () => {

    const screens = [
        {
            name: 'HOME',
            component: HomeScreen,
            iconSource: require('./../../assets/icons/fixed/homeIcon.png'),
        },
        {
            name: 'Profile',
            component: ProfileScreen3,
            iconSource: require('./../../assets/icons/fixed/profileIcon.png'),

        },
        {
            name: 'Settings',
            component: SettingsScreen,
            iconSource: require('./../../assets/icons/fixed/settingsIcon.png'),

        },
        {
            name: 'CAM',
            component: ScannerScreen,
            iconSource: require('./../../assets/icons/istvanScannerIcon.png'),
           
        }
    ];

    return (
        <NavigationContainer>
            <MainTabNavigator Tab={Tab} screens={screens} />
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