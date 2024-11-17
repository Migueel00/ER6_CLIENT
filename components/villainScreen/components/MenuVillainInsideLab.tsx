import styled from 'styled-components/native';
import * as CONSTANTS from "../../../src/constants";
import { Dimensions, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen3 from '../../shared/ProfileScreen';
import SettingsScreen from '../../settings/settingsScreen';
import { useContext, useEffect } from 'react';
import VillainContext from '../../../helpers/VillainContext';
import PotionCreator from '../../shared/PotionCreator/PotionCreator';
import AppContext from '../../../helpers/context';
import ExitLab from '../../shared/ExitLab';
import MainTabNavigator from '../../shared/MainTabNavigator';

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuVillainInsideLab = () => {


    const screens = [
        {
            name: 'LAB',
            component: PotionCreator,
            iconSource: require('./../../../assets/icons/villainLabIcon.png'),
        },
        {
            name: 'EXITLAB',
            component: ExitLab,
            iconSource: require('./../../../assets/icons/exitLabIcon.png'),
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

        }
    ];

    const villainContext = useContext(VillainContext);
    const setIsMenuLabLoaded = villainContext?.setIsMenuLabLoaded!;
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

export default MenuVillainInsideLab;