import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import * as CONSTANTS from "../../../src/constants";
import MapScreen from "../../mapScreen/mapScreen";
import SettingsScreen from "../../settings/settingsScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";
import ProfileScreen from "../../shared/ProfileScreen";
import DungeonScreen from "../../shared/DungeonScreen";
import MortimerContext from "../../../helpers/MortimerContext";
import MapScreenMortimer from "./MapScreenMortimer";



const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuDungeonMortimer = () => {

    const mortimerContext = useContext(MortimerContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuDungeonLoaded = mortimerContext?.setIsMenuDungeonLoaded!;

    useEffect(() => {
        setIsMenuDungeonLoaded(true);

        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        // Se ejecuta al desmontar el componente
        return () => {
            setIsMenuDungeonLoaded(false);
        }
    }, []);

    const screens = [
        {
            name: 'DUNGEON',
            component: DungeonScreen,
            iconSource: require('./../../../assets/icons/dungeonIcon.png'),
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

export default MenuDungeonMortimer