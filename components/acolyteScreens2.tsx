import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './homeScreen';
import ProfileScreen3 from './ProfileScreen3';
import SettingsScreen from './settings/settingsScreen';
import LabScreen from './labScreen';
import MapScreen from './mapScreen/mapScreen';

const Tab = createMaterialTopTabNavigator();

const AcolyteScreens = () => {
  const { height } = Dimensions.get('window');


  return (
    <View 
      style={{ flex: 1 }} 

    >
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
                <Image
                  source={require('../assets/icons/fixed/homeIcon.png')}
                  style={{ width: 70, height: 70, resizeMode: 'contain', margin: 0 }}
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
                <Image
                  source={require('../assets/icons/fixed/profileIcon.png')}
                  style={{ width: 70, height: 70 }}
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
                <Image
                  source={require('../assets/icons/fixed/settingsIcon.png')}
                  style={{ width: 70, height: 70 }}
                />
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tab.Screen
            name="LAB"
            component={LabScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('../assets/icons/fixed/potionIcon.png')}
                  style={{ width: 70, height: 70 }}
                />
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tab.Screen
            name="MAP"
            component={MapScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AcolyteScreens;
