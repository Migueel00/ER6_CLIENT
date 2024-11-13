import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import * as CONSTANTS from "../../../src/constants";
import MapScreen from "../../mapScreen/mapScreen";
import SettingsScreen from "../../settings/settingsScreen";
import ProfileScreen3 from "../../shared/ProfileScreen";
import OutsideHall from "../../shared/OutsideHall";


const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuHall = () => {
    

    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
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
                    name="HALL"
                    component={OutsideHall}
                    options={{
                        tabBarIcon: () => (
                            <Icon
                                source={require('../../../assets/icons/settings-icon.png')}
                            />
                        ),
                        tabBarLabel: ''
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

export default MenuHall