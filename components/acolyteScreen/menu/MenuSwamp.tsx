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

const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window');
const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuSwamp = () => {
    const acolyteContext = useContext(AcolyteContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsSwampLoaded = acolyteContext?.setIsMenuSwampLoaded!;

    useEffect(() => {
        setIsSwampLoaded(true);

        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        // Se ejecuta al desmontar el componente
        return () => {
            setIsSwampLoaded(false);
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
                    <Tab.Screen
                        name="Settings"
                        component={SwampScreen}
                        options={{
                            tabBarIcon: () => (
                                <Icon
                                    source={require('../../../assets/icons/fixed/settingsIcon.png')}
                                />
                            ),
                            tabBarLabel: '',
                        }}
                    />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MenuSwamp