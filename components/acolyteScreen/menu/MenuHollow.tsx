import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import * as CONSTANTS from "../../../src/constants";
import SettingsScreen from "../../settings/settingsScreen";
import ProfileScreen3 from "../../shared/ProfileScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";
import MapScreen from "../../mapScreen/mapScreen";
import ObituaryScreen from "../../shared/ObituaryScreen";
import AcolyteContext from "../../../helpers/AcolyteContext";
import AppContext from "../../../helpers/context";
import HollowScreen from "../../shared/HollowScreen";



const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuHollow = () => {

    const acolyteContext = useContext(AcolyteContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuHollowLoaded = acolyteContext?.setIsMenuHollowLoaded!;

    useEffect(() => {
        setIsMenuHollowLoaded(true);

        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
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
            iconSource: require('./../../../assets/icons/obituaryIcon.png'),
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

export default MenuHollow