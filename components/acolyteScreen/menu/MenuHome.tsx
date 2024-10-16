import React from "react";
import { Dimensions} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../../homeScreen";
import ProfileScreen3 from "../../ProfileScreen3";
import SettingsScreen from "../../settings/settingsScreen";
import MapScreen from "../../mapScreen/mapScreen";
import styled from "styled-components/native";

const Tab = createMaterialTopTabNavigator();

const Icon = styled.Image`
    width: 70px;
    height: 70px;
`
const { height } = Dimensions.get('window');

const MenuHome = () => {
    return (
        <NavigationContainer>
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
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: () => (
                            <Icon
                                source={require('../../../assets/icons/fixed/homeIcon.png')}
                                
                            />
                        ),
                        tabBarLabel: () => null,
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
                        tabBarLabel: () => null,
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
                        tabBarLabel: () => null,
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
                        tabBarLabel: () => null
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MenuHome