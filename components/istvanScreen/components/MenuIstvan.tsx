import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Component, useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../../helpers/context';
import IstvanContext from '../../../helpers/IstvanContext';
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from '../../settings/settingsScreen';
import HomeScreen from '../../shared/homeScreen';
import MainTabNavigator from '../../shared/MainTabNavigator';
import ProfileScreen from '../../shared/ProfileScreen';
import MapScreenIstvan from './MapScreenIstvan';
import ApplyCurseScreen from '../applyCurseScreen';


const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuIstvan = () => {

    const Tab = createMaterialTopTabNavigator();

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
            component: MapScreenIstvan,
            iconSource: require('./../../../assets/icons/mapIcon.png'),
        },
        {
            name: "CURSE",
            component: ApplyCurseScreen,
            iconSource: require('./../../../assets/icons/villainLabIcon.png')
        }
    ];

    const istvanContext = useContext(IstvanContext);
    const setIsMenuLoaded = istvanContext?.setIsMenuLoaded!;
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

export default MenuIstvan;