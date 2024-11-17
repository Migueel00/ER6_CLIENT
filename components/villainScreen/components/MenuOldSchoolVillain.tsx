import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import * as CONSTANTS from "../../../src/constants";
import SchoolScreen from "../../mapScreen/schoolScreen";
import MapScreenVillain from "./MapScreenVillain";
import VillainContext from "../../../helpers/VillainContext";
import ProfileScreen3 from "../../shared/ProfileScreen";
import SettingsScreen from "../../settings/settingsScreen";
import MainTabNavigator from "../../shared/MainTabNavigator";

const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');
const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuOldSchoolVillain = () => {

    const screens = [
        {
            name: 'OLDSCHOOL',
            component: SchoolScreen,
            iconSource: require('./../../../assets/icons/schoolIcon.png'),
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
            component: MapScreenVillain,
            iconSource: require('./../../../assets/icons/mapIcon.png'),

        }
    ];

    const villainContext = useContext(VillainContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuOldSchoolLoaded = villainContext?.setIsMenuOldSchoolLoaded!;

    useEffect(() => {
        setIsMenuOldSchoolLoaded(true);

        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        // Se ejecuta al desmontar el componente
        return () => {
            setIsMenuOldSchoolLoaded(false);
        }
    }, []);

    return (
        <MainTabNavigator Tab={Tab} screens={screens} />
    );
}

export default MenuOldSchoolVillain