import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from "../../settings/settingsScreen";
import LabScreen from "../../shared/labScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";
import ProfileScreen from "../../shared/ProfileScreen";


const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuLabInside = () => {

    const screens = [
        {
            name: 'LAB',
            component: LabScreen,
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

    return (

        <MainTabNavigator Tab={Tab} screens={screens} />

    );
}

export default MenuLabInside