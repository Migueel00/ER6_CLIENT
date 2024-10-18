import React, { useContext, useEffect } from "react";
import { Dimensions} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../../homeScreen";
import ProfileScreen3 from "../../ProfileScreen3";
import SettingsScreen from "../../settings/settingsScreen";
import MapScreen from "../../mapScreen/mapScreen";
import styled from "styled-components/native";
import AcolyteContext from "../../../helpers/AcolyteContext";
import * as CONSTANTS from "../../../src/constants";

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuHome = () => {
    const acolyteContext = useContext(AcolyteContext);
    const setMenuIsLoaded = acolyteContext?.setIsMenuLoaded!;

    useEffect(() => {
        setMenuIsLoaded(true);

        // Se ejecuta al desmontar el componente
        return () => {
            setMenuIsLoaded(false);
        }
    }, []);

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
            </NavigationContainer>
    );
}

export default MenuHome