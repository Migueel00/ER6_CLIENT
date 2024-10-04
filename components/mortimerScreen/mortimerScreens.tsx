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
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              tabBarStyle: {
                backgroundColor: 'black',
                height: height * 0.10, // Incremento en la altura para más espacio
                paddingBottom: 1, // Añade espacio en la parte inferior de la barra
              },
              tabBarIconStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,  // Puedes ajustar el ancho de los íconos
                height: 50, // Ajusta el alto para dar más espacio
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
                height: '100%'
              },
            })}>
            <Tab.Screen 
              name="Home"
              children={() => <HomeScreen role={userRole} />}
              options={{
            
                tabBarIcon: ({}) => (
                  <Image
                    source={require('../../assets/icons/fixed/homeIcon.png')}
                    style={{ width: 70, height: 70, resizeMode: 'contain',  margin: 0}}
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
                    source={require('../../assets/icons/fixed/profileIcon.png')}
                    style={{width: 70, height: 70}}
                  />
                ),
                tabBarLabel: ({}) => null,
            }}
            />
            <Tab.Screen 
              name="Settings"
              children={() => <SettingsScreen setIsLoggedIn={setIsLoggedIn}></SettingsScreen>}
              options={{
            
                tabBarIcon: ({}) => (
                  <Image
                    source={require('../../assets/icons/fixed/settingsIcon.png')}
                    style={{ width: 70, height: 70}}
                  />
                ),
                tabBarLabel: ({}) => null,
      
              }}
            />
            <Tab.Screen 
              name="Connections"
              children={() => <ConnectionScreen players={players} setPlayers={setPlayers}/>}
              options={{
            
                tabBarIcon: ({}) => (
                  <Image
                    source={require('../../assets/icons/conections-icon.png')}
                    style={{ width: 70, height: 70}}
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

export default MortimerScreens;
