import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
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

const MenuTowerInside = () => {

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
    

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />

    );
}

export default MenuTowerInside