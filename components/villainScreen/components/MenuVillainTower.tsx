import styled from 'styled-components/native';
import * as CONSTANTS from "../../../src/constants";
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../shared/homeScreen';
import ProfileScreen3 from '../../shared/ProfileScreen';
import SettingsScreen from '../../settings/settingsScreen';
import { useContext, useEffect } from 'react';
import VillainContext from '../../../helpers/VillainContext';
import MapScreenVillain from './MapScreenVillain';
import OutsideTower from '../../shared/OutsideTower';
import AppContext from '../../../helpers/context';
import MainTabNavigator from '../../shared/MainTabNavigator';

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuVillainTower = () => {

    const screens = [
        {
            name: 'TOWER',
            component: OutsideTower,
            iconSource: require('./../../../assets/icons/towerIcon.png'),
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
            component: MapScreenVillain,
            iconSource: require('./../../../assets/icons/mapIcon.png'),

        }
    ];

    const villainContext = useContext(VillainContext);
    const setIsMenuTowerLoaded = villainContext?.setIsMenuTowerLoaded!;
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;

    useEffect(() => {
        setIsMenuTowerLoaded(true);

        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        return() => {
            setIsMenuTowerLoaded(false);
        }
    }, []);

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />
    )
}

export default MenuVillainTower;