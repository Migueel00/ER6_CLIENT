import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MapScreen from "../../mapScreen/mapScreen";
import styled from "styled-components/native";
import AcolyteContext from "../../../helpers/AcolyteContext";
import * as CONSTANTS from "../../../src/constants";
import AppContext from "../../../helpers/context";
import SwampScreen from "../../shared/SwampScreen";
import ProfileScreen3 from "../../shared/ProfileScreen";
import SettingsScreen from "../../settings/settingsScreen";
import MortimerContext from "../../../helpers/MortimerContext";

const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');
const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuSwamp = () => {
    const acolyteContext = useContext(AcolyteContext);
    const mortimerContext = useContext(MortimerContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const player = appContext?.player!;
    const setIsMenuSwampLoaded = acolyteContext?.setIsMenuSwampLoaded!;
    const setIsMenuMortimerSwampLoaded = mortimerContext?.setIsMenuSwampLoaded!;

    useEffect(() => {
        switch (player.role) {
            case 'MORTIMER':
                setIsMenuMortimerSwampLoaded(true);
                break;
            case 'ACOLYTE':
                setIsMenuSwampLoaded(true);
                break;
            default:
                break;
        }

        const value = {
            playerID: player._id,
            location: player.location
        };

        socket.emit("UpdateLocation", value);

        // Se ejecuta al desmontar el componente
        return () => {
            setIsMenuSwampLoaded(false);
            setIsMenuMortimerSwampLoaded(false);
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
                    name="SWAMP"
                    component={SwampScreen}
                    options={{
                        tabBarIcon: () => (
                            <Icon
                                source={require('../../../assets/icons/swampIcon.png')}
                            />
                        ),
                        tabBarLabel: '',
                    }}
                />
                <Tab.Screen
                        name="Profile"
                        component={ProfileScreen3}
                        options={{
                            tabBarIcon: () => (
                                <Icon
                                    source={require('../../../assets/icons/fixed/profileIcon.png')}
                                />
                            ),
                            tabBarLabel: '',
                        }}
                    />
                <Tab.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            tabBarIcon: () => (
                                <Icon
                                    source={require('../../../assets/icons/fixed/settingsIcon.png')}
                                />
                            ),
                            tabBarLabel: '',
                        }}
                    />
                <Tab.Screen
                    name="MAP"
                    component={MapScreen}
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

export default MenuSwamp