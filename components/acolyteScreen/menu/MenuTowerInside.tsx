import React from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LabScreen from "../../shared/labScreen";
import styled from "styled-components/native";
import ProfileScreen3 from "../../shared/ProfileScreen";
import SettingsScreen from "../../settings/settingsScreen";
import * as CONSTANTS from "../../../src/constants";
import TowerScreen from "../../shared/TowerScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";
import MapScreen from "../../mapScreen/mapScreen";


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
            component: MapScreen,
            iconSource: require('./../../../assets/icons/mapIcon.png'),
        }
    ];
    

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />

    );
}

export default MenuTowerInside