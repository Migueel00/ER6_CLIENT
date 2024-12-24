import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../../helpers/context';
import MortimerContext from '../../../helpers/MortimerContext';
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from '../../settings/settingsScreen';
import HomeScreen from '../../shared/homeScreen';
import MainTabNavigator from '../../shared/MainTabNavigator';
import ProfileScreen from '../../shared/ProfileScreen';
import MapScreenMortimer from './MapScreenMortimer';

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuMortimer = () => {

    const screens = [
        {
            name: 'HOME',
            component: HomeScreen,
            iconSource: require('./../../../assets/icons/fixed/homeIcon.png'),
        },
        {
            name: 'Profile',
            component: ProfileScreen,
            iconSource: require('./../../../assets/icons/fixed/profileIcon.png'),

        },
        {
            name: 'Settings',
            component: SettingsScreen,
            iconSource: require('./../../../assets/icons/fixed/settingsIcon.png'),

        },
        {
            name: 'MAP',
            component: MapScreenMortimer,
            iconSource: require('./../../../assets/icons/mapIcon.png'),
        }
    ];


    const mortimerContex = useContext(MortimerContext);
    const setIsMenuLoaded = mortimerContex?.setIsMenuLoaded!;

    const appContext = useContext(AppContext);
    const socket = appContext?.socket;

    useEffect(() => {
        setIsMenuLoaded(true);

        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        // Se ejecuta al desmontar el componente
        return () => {
            setIsMenuLoaded(false);
        }
    }, []);

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />
    )
}

export default MenuMortimer;