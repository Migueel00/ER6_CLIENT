import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './homeScreen';
import ProfileScreen2 from './profileScreen2';
import SettingsScreen from './settings/settingsScreen';
import LabScreen from './labScreen';
import CameraScreen from './cameraScreen';
import ConnectionScreen from './mortimerScreen/connectionsScreen';

const Tab = createMaterialTopTabNavigator();
interface Player {
  socketId:     string,
  email:        string,
  nickname:     string,
  isInsideLab:  boolean,
  avatar:       string,
  id:           string
}


type AcolyteScreensProps = {
  userRole: string;
  profileAttributes: any;
    userEmail: String;
    socketID: String;
  player: any;
  players:  Player[];
  setPlayers: (players: Player[]) => void;
  setIsLoggedIn: any;
};

const AcolyteScreens: React.FC<AcolyteScreensProps> = ({ userRole, profileAttributes , userEmail, socketID, player, setIsLoggedIn}) => {
  const {width, height} = Dimensions.get('window');

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={
        {tabBarStyle: 
          {
            backgroundColor: "black",
            height: height*0.09,
          },
        tabBarIndicatorStyle: {
        backgroundColor: "orange"
      }}}>
        <Tab.Screen
          
          name='Home'
          children={() => <HomeScreen role={userRole} />}
          options={{
            
            tabBarIcon: ({}) => (
              <Image
                source={require('../assets/icons/home-icon.png')}
                style={{ width: 38, height: 38, resizeMode: 'contain',  margin: 0}}
              />
            ),
            tabBarLabel: ({}) => null,
  
          }} 
        />
        <Tab.Screen
          name="Profile"
          children={() => <ProfileScreen2 profileAttributesToPrint={profileAttributes} />}
          options={{
              tabBarIcon: ({}) => (
                <Image
                  source={require('../assets/icons/profile-icon.png')}
                  style={{width: 38, height: 38}}
                />
              ),
              tabBarLabel: ({}) => null,
          }}
        />
        <Tab.Screen
          name="Settings"
          children={() => <SettingsScreen setIsLoggedIn={setIsLoggedIn} />}
          options={{
            
            tabBarIcon: ({}) => (
              <Image
                source={require('../assets/icons/settings-icon.png')}
                style={{ width: 38, height: 38}}
              />
            ),
            tabBarLabel: ({}) => null,
  
          }} 
        />
        <Tab.Screen
          name="LAB"
          children={() => <LabScreen userEmail={userEmail} player={player} socketID={socketID}/>}
          options={{
            
            tabBarIcon: ({}) => (
              <Image
                source={require('../assets/icons/lab-icon.png')}
                style={{ width: 38, height: 38}}
              />
            ),
            tabBarLabel: ({}) => null,
  
          }} 
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
