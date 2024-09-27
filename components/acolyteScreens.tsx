import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './homeScreen';
import ProfileScreen2 from './profileScreen2';
import SettingsScreen from './settingsScreen';
import LabScreen from './labScreen';
import CameraScreen from './cameraScreen';

const Tab = createMaterialTopTabNavigator();

type AcolyteScreensProps = {
    userRole: string;
    profileAttributes: any;
}

const AcolyteScreens: React.FC<AcolyteScreensProps> = ({ userRole , profileAttributes}) => {
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
              name="LAB"
              component={LabScreen}
            />
            <Tab.Screen 
              name="CAM"
              component={CameraScreen}
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

export default AcolyteScreens;
