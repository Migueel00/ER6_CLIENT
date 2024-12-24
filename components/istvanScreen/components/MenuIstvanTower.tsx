import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../../helpers/context';
import IstvanContext from '../../../helpers/IstvanContext';
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from '../../settings/settingsScreen';
import MainTabNavigator from '../../shared/MainTabNavigator';
import OutsideTower from '../../shared/OutsideTower';
import ProfileScreen from '../../shared/ProfileScreen';
import MapScreenIstvan from './MapScreenIstvan';

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuIstvanTower = () => {

    const screens = [
        {
            name: 'TOWER',
            component: OutsideTower,
            iconSource: require('./../../../assets/icons/towerIcon.png'),
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

        }
    ];

    const istvanContext = useContext(IstvanContext);
    const setIsMenuTowerLoaded = istvanContext?.setIsMenuTowerLoaded!;
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

export default MenuIstvanTower;