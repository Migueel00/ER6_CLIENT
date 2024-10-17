import React from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LabScreen from "../../labScreen";
import styled from "styled-components/native";

const Tab = createMaterialTopTabNavigator();

const Icon = styled.Image`
    width: 70px;
    height: 70px;
`
const { height } = Dimensions.get('window');


const MenuLabInside = () => {
    

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
                    name="LAB"
                    component={LabScreen}
                    options={{
                        tabBarIcon: () => (
                            <Icon
                                source={require('../../../assets/icons/lab-icon.png')}
                            />
                        ),
                        tabBarLabel: ''
                    }}
                    />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MenuLabInside