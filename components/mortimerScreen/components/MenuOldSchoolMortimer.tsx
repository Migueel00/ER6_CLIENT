import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import MortimerContext from "../../../helpers/MortimerContext";
import * as CONSTANTS from "../../../src/constants";
import SchoolScreen from "../../mapScreen/schoolScreen";
import MapScreenMortimer from "./MapScreenMortimer";
import ProfileScreen3 from "../../shared/ProfileScreen";
import SettingsScreen from "../../settings/settingsScreen";

const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');
const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuOldSchoolMortimer = () => {
    const mortimerContext = useContext(MortimerContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuOldSchoolLoaded = mortimerContext?.setIsMenuOldSchoolLoaded!;

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
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    animationEnabled: false,
                    swipeEnabled: true,
                    tabBarStyle: {
                        backgroundColor: 'black',
                        height: height * 0.10,
                        paddingBottom: 1,
                    },
                    tabBarIconStyle: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: 'orange',
                        height: 3,
                    },
                    tabBarItemStyle: {
                        justifyContent: 'center',
                        borderRightWidth: 0.2,
                        borderRightColor: 'white',
                        paddingHorizontal: 10,
                        height: '100%',
                    },
                })}
            >   
                <Tab.Screen
                    name="OLDSCHOOL"
                    component={SchoolScreen}
                    options={{
                        tabBarIcon: () => (
                            <Icon
                                source={require('../../../assets/icons/schoolIcon.png')}
                            />
                        ),
                        tabBarLabel: '',
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen3}
                    options={{
                        tabBarIcon: ({ }) => (
                            <Icon source={require('../../../assets/icons/fixed/profileIcon.png')} />
                        ),
                        tabBarLabel: ({ }) => null,
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ }) => (
                            <Icon source={require('../../../assets/icons/fixed/settingsIcon.png')} />
                        ),
                        tabBarLabel: ({ }) => null,

                    }}
                />
                <Tab.Screen
                    name="MAP"
                    component={MapScreenMortimer}
                    options={{
                        tabBarIcon: () => (
                            <Icon
                                source={require('../../../assets/icons/mapIcon.png')}
                            />
                        ),
                        tabBarLabel: ''
                    }}
                />
            </Tab.Navigator>
    );
}

export default MenuOldSchoolMortimer