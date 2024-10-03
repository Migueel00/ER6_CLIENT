import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../homeScreen';
import ProfileScreen2 from '../profileScreen2';
import SettingsScreen from '../settings/settingsScreen';
import ConnectionScreen from './connectionsScreen';
import { getAllPlayers } from '../../src/API/getAllPlayers'
import { Dimensions , Image} from 'react-native';

const Tab = createMaterialTopTabNavigator();

interface Player {
  socketId:     string,
  email:        string,
  nickname:     string,
  isInsideLab:  boolean,
  avatar:       string,
  id:           string
}


type MortimerScreensProps = {
    userRole: string;
    profileAttributes: any;
    players: Player[];
    setPlayers: (players: Player[]) => void;
    setIsLoggedIn: any;
}

const MortimerScreens: React.FC<MortimerScreensProps> = ({ userRole , profileAttributes, players, setPlayers, setIsLoggedIn}) => {
    const {width, height} = Dimensions.get('window');


    return (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{tabBarStyle: {
              backgroundColor: "black",
              height: height*0.09,
            },
            tabBarIndicatorStyle: {
              backgroundColor: "white"
            }}}>
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
              children={() => <SettingsScreen setIsLoggedIn={setIsLoggedIn}></SettingsScreen>}
            />
            <Tab.Screen 
              name="Connections"
              children={() => <ConnectionScreen players={players} setPlayers={setPlayers}/>}
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
