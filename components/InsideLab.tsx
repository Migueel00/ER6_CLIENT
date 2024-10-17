import React from 'react';
import {  StyleSheet, Dimensions, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PotionCreator from './PotionCreator';
import HomeLab from './HomeLab';

const Tab = createBottomTabNavigator();

const InsideLab = () => {
    const { height, width } = Dimensions.get('window');

    const activeOpacity = 1;
    const inactiveOpacity = 0.2;

                return (
                    <NavigationContainer independent={true}>
                        <Tab.Navigator
                            screenOptions={{
                                tabBarStyle: {
                                    backgroundColor: 'black',
                                    height: height * 0.09, // Height for bottom tab bar
                                    paddingBottom: 5, // Adds space at the bottom
                                },
                                tabBarIconStyle: {
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: height * 0.08, // Width for icons
                                    height: height * 0.08, // Height for icons
                                },
                                tabBarShowLabel: false,
                                headerShown: false,
                                tabBarItemStyle: {
                                    justifyContent: 'center', // Center icons
                                    borderRightWidth: 0.2, // Border between tabs
                                    borderRightColor: 'white', // Border color
                                    paddingHorizontal: 10,
                                    height: '100%',
                                },
                            }}
                        >
                            <Tab.Screen
                                name="HomeLab"
                                component={HomeLab}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <Image
                                            source={require('../assets/icons/fixed/homeIcon.png')}
                                            style={{
                                                width: 70,
                                                height: 70,
                                                opacity: focused ? activeOpacity : inactiveOpacity, // Change opacity based on focus
                                                resizeMode: 'contain',
                                                margin: 0
                                            }}
                                        />
                                    ),
                                }}
                            />
                            <Tab.Screen
                                name="Potion Creator"
                                component={PotionCreator}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <Image
                                            source={require('../assets/icons/fixed/profileIcon.png')}
                                            style={{
                                                width: height * 0.09,
                                                height: height * 0.09,
                                                opacity: focused ? activeOpacity : inactiveOpacity, // Change opacity based on focus
                                                resizeMode: 'contain',
                                                margin: 0
                                            }}
                                        />
                                    ),
                                }}
                            />
                        </Tab.Navigator>
                    </NavigationContainer>
                );
};

const styles = StyleSheet.create({
    // Your existing styles remain unchanged
});

export default InsideLab;
