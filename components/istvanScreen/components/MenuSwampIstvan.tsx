import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import IstvanContext from "../../../helpers/IstvanContext";
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from "../../settings/settingsScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";
import ProfileScreen from "../../shared/ProfileScreen";
import SwampScreen from "../../shared/SwampScreen";
import MapScreenIstvan from "./MapScreenIstvan";

const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');
const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuSwampIstvan = () => {

    const screens = [
        {
            name: 'SWAMP',
            component: SwampScreen,
            iconSource: require('./../../../assets/icons/swampIcon.png'),
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
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuSwampLoaded = istvanContext?.setIsMenuSwampLoaded!;

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

export default MenuSwampIstvan