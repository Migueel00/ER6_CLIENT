import styled from 'styled-components/native';
import * as CONSTANTS from "../../../src/constants";
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen3 from '../../shared/ProfileScreen';
import SettingsScreen from '../../settings/settingsScreen';
import ConnectionScreen from '../connectionsScreen';
import MapScreenMortimer from './MapScreenMortimer';
import { useContext, useEffect } from 'react';
import MortimerContext from '../../../helpers/MortimerContext';
import TowerScreen from '../../shared/TowerScreen';
import MortimerTowerScreen from '../MortimerTowerScreen';
import AppContext from '../../../helpers/context';
import MainTabNavigator from '../../shared/MainTabNavigator';


const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuMortimerTower = () => {

    const Tab = createMaterialTopTabNavigator();

    const screens = [
        {
            name: 'TOWER',
            component: MortimerTowerScreen,
            iconSource: require('../../../assets/icons/fixed/potionIcon.png'),
        },
        {
            name: 'Profile',
            component: ProfileScreen3,
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

    const mortimerContext = useContext(MortimerContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuTowerLoaded = mortimerContext?.setIsMenuTowerLoaded!;

    useEffect(() => {
        setIsMenuTowerLoaded(true);

        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        }

        socket.emit("UpdateLocation", value);

        return() => {
            setIsMenuTowerLoaded(false);
        }
    }, []);

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />
    )
}

export default MenuMortimerTower;