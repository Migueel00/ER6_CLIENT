import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../homeScreen';
import ProfileScreen2 from '../profileScreen2';
import SettingsScreen from '../settingsScreen';
import ConnectionScreen from './connectionsScreen';
import { getAllPlayers } from '../../src/API/getAllPlayers'

const Tab = createMaterialTopTabNavigator();

type MortimerScreensProps = {
    userRole: string;
    profileAttributes: any;
    players: any
}

const MortimerScreens: React.FC<MortimerScreensProps> = ({ userRole , profileAttributes, players}) => {
    return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="Home"
              children={() => <HomeScreen role={userRole} />}
            />
            <Tab.Screen
              name="Profile" 
              children={() => <ProfileScreen2 profileAttributesToPrint={profileAttributes} />}
            />
            <Tab.Screen 
              name="Settings"
              component={SettingsScreen}
            />
            <Tab.Screen 
              name="Connections"
              children={() => <ConnectionScreen players={players} />}

            />
          </Tab.Navigator>
        </NavigationContainer>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightcoral', // Personaliza el fondo
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default MortimerScreens;
