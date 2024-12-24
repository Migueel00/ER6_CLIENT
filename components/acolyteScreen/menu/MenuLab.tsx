import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import AcolyteContext from "../../../helpers/AcolyteContext";
import AppContext from "../../../helpers/context";
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

const MenuLab = () => {

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

    const acolyteContext = useContext(AcolyteContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuLabLoaded = acolyteContext?.setIsMenuLabLoaded!;

    useEffect(() => {
        setIsMenuLabLoaded(true);

        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        // Se ejecuta al desmontar el componente
        return () => {
            setIsMenuLabLoaded(false);
        }
    }, []);

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />
    );
}

export default MenuLab