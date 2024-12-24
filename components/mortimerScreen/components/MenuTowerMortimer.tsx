import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../../helpers/context';
import MortimerContext from '../../../helpers/MortimerContext';
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from '../../settings/settingsScreen';
import MainTabNavigator from '../../shared/MainTabNavigator';
import ProfileScreen from '../../shared/ProfileScreen';
import MortimerTowerScreen from '../MortimerTowerScreen';
import MapScreenMortimer from './MapScreenMortimer';


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
            iconSource: require('../../../assets/icons/towerIcon.png'),
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