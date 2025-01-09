import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from "../../settings/settingsScreen";
import HollowScreen from "../../shared/HollowScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";
import ProfileScreen from "../../shared/ProfileScreen";
import MapScreenMortimer from "./MapScreenMortimer";
import MortimerContext from "../../../helpers/MortimerContext";

const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuHollowMortimer = () => {

    const mortimerContext = useContext(MortimerContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuHollowLoaded = mortimerContext?.setIsMenuHollowLoaded!;
    const player = appContext?.player;

    useEffect(() => {
        setIsMenuHollowLoaded(true);

        const value = {
            playerID: player?._id,
            location: player?.location
        };

        socket.emit("UpdateLocation", value);

        // Se ejecuta al desmontar el componente
        return () => {
            setIsMenuHollowLoaded(false);
        }
    }, []);

    const screens = [
        {
            name: 'HOLLOW',
            component: HollowScreen,
            iconSource: require('../../../assets/icons/hollowIcon.png')
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


    return (
        <MainTabNavigator Tab={Tab} screens={screens} />

    );
}

export default MenuHollowMortimer