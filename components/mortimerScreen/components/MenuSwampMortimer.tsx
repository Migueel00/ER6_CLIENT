import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import * as CONSTANTS from "../../../src/constants";
import AppContext from "../../../helpers/context";
import SwampScreen from "../../shared/SwampScreen";
import ProfileScreen3 from "../../shared/ProfileScreen";
import SettingsScreen from "../../settings/settingsScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";
import VillainContext from "../../../helpers/VillainContext";
import MapScreenMortimer from "./MapScreenMortimer";
import MortimerContext from "../../../helpers/MortimerContext";

const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');
const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuSwampMortimer = () => {

    const screens = [
        {
            name: 'SWAMP',
            component: SwampScreen,
            iconSource: require('./../../../assets/icons/swampIcon.png'),
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
    const setIsMenuSwampLoaded = mortimerContext?.setIsMenuSwampLoaded!;

    useEffect(() => {
        setIsMenuSwampLoaded(true);

        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        // Se ejecuta al desmontar el componente
        return () => {
            setIsMenuSwampLoaded(false);
        }
    }, []);

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />
    );
}

export default MenuSwampMortimer