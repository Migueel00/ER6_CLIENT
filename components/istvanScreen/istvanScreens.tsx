import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../shared/homeScreen';
import SettingsScreen from '../settings/settingsScreen';
import ScannerScreen from './ScannerScreen';
import ProfileScreen3 from '../shared/ProfileScreen';
import MainTabNavigator from '../shared/MainTabNavigator';
import IstvanToolsScreen from './istvanToolsScreen';

const Tab = createMaterialTopTabNavigator();

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
            name: 'TOOLS',
            component: IstvanToolsScreen,
            iconSource: require('./../../assets/icons/istvanScannerIcon.png'),
           
        }
    ];

    return (
        <NavigationContainer>
            <MainTabNavigator Tab={Tab} screens={screens} />
        </NavigationContainer>
    );
};


export default IstvanScreens;