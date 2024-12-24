import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import MortimerContext from '../../../helpers/MortimerContext';
import AppContext from '../../../helpers/context';
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from '../../settings/settingsScreen';
import MainTabNavigator from '../../shared/MainTabNavigator';
import ProfileScreen from '../../shared/ProfileScreen';
import ConnectionScreen from '../connectionsScreen';


const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuLabMortimer = () => {

    const Tab = createMaterialTopTabNavigator();

    const screens = [
        {
            name: 'LAB',
            component: ConnectionScreen,
            iconSource: require('../../../assets/icons/fixed/potionIcon.png'),
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

        }
    ];

    const mortimerContext = useContext(MortimerContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuConnectionLoaded = mortimerContext?.setIsMenuConnectionLoaded!;

    useEffect(() => {
        setIsMenuConnectionLoaded(true);

        const value = {
            playerID: appContext?.player,
            location: appContext?.location
        }

        socket.emit("UpdateLocation", value);

        return() => {
            setIsMenuConnectionLoaded(false);
        }
    }, []);

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />
    )
}

export default MenuLabMortimer;