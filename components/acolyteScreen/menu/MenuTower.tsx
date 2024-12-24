import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import AcolyteContext from "../../../helpers/AcolyteContext";
import AppContext from "../../../helpers/context";
import * as CONSTANTS from "../../../src/constants";
import MapScreen from "../../mapScreen/mapScreen";
import SettingsScreen from "../../settings/settingsScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";
import ProfileScreen from "../../shared/ProfileScreen";
import TowerScreen from "../../shared/TowerScreen";

const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');
const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuTower = () => {

    const screens = [
        {
            name: 'TOWER',
            component: TowerScreen,
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
            component: MapScreen,
            iconSource: require('./../../../assets/icons/mapIcon.png'),
        }
    ];

    const acolyteContext = useContext(AcolyteContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuTowerLoaded = acolyteContext?.setIsMenuTowerLoaded!;

    useEffect(() => {
        setIsMenuTowerLoaded(true);
        
        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        // Se ejecuta al desmontar el componente
        return () => {
            setIsMenuTowerLoaded(false);
        }
    }, []);

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />
    );
}

export default MenuTower