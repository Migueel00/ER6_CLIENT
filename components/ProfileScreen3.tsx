import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import AppContext from '../helpers/context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stats from './Stats';
import Equipment from './Equipment';
import Inventory from './Inventory';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const convertAttributesToPercentage = (profileAttributes: any) => {
    return {
        intelligence: profileAttributes.intelligence / 100,
        dexterity: profileAttributes.dexterity / 100,
        insanity: profileAttributes.insanity / 100,
        charisma: profileAttributes.charisma / 100,
        constitution: profileAttributes.constitution / 100,
        strength: profileAttributes.strength / 100,
    };
};

const ProfileScreen3 = () => {
    const { height, width } = Dimensions.get('window');

    const activeOpacity = 1;
    const inactiveOpacity = 0.2;

    return (
        <AppContext.Consumer>
            {({ profileAttributes }: any) => {
                const attributesToPrint = convertAttributesToPercentage(profileAttributes);

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
                                name="Stats"
                                component={Stats}
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
                                name="Equipment"
                                component={Equipment}
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
                            <Tab.Screen
                                name="Inventory"
                                component={Inventory}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <Image
                                            source={require('../assets/icons/fixed/settingsIcon.png')}
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
                        </Tab.Navigator>
                    </NavigationContainer>
                );
            }}
        </AppContext.Consumer>
    );
};

const styles = StyleSheet.create({
    // Your existing styles remain unchanged
});

export default ProfileScreen3;