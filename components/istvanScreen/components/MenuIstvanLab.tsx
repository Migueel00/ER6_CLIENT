import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../../helpers/context';
import IstvanContext from '../../../helpers/IstvanContext';
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from '../../settings/settingsScreen';
import ExitLab from '../../shared/ExitLab';
import MainTabNavigator from '../../shared/MainTabNavigator';
import ProfileScreen from '../../shared/ProfileScreen';
import ScannerScreen from '../ScannerScreen';

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuIstvanLab = () => {


    const screens = [
        {
            name: 'LAB',
            component: ScannerScreen,
            iconSource: require('./../../../assets/icons/villainLabIcon.png'),
        },
        {
            name: 'EXITLAB',
            component: ExitLab,
            iconSource: require('./../../../assets/icons/exitLabIcon.png'),
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

    const istvanContext = useContext(IstvanContext);
    const setIsMenuLabLoaded = istvanContext?.setIsMenuLabLoaded!;
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;

    useEffect(() => {
        setIsMenuLabLoaded(true);


        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        return() => {
            setIsMenuLabLoaded(false);
        }
    }, []);

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />
    )
}

export default MenuIstvanLab;