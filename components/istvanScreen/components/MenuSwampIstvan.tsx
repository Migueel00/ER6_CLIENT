import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import * as CONSTANTS from "../../../src/constants";
import AppContext from "../../../helpers/context";
import SwampScreen from "../../shared/SwampScreen";
import ProfileScreen3 from "../../shared/ProfileScreen";
import SettingsScreen from "../../settings/settingsScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";
import MapScreenIstvan from "./MapScreenIstvan";
import IstvanContext from "../../../helpers/IstvanContext";

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