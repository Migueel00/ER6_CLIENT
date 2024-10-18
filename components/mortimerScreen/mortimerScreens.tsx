import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../homeScreen';
import SettingsScreen from '../settings/settingsScreen';
import ConnectionScreen from './connectionsScreen';
import { Dimensions , Image} from 'react-native';
import ProfileScreen3 from '../ProfileScreen3';
import styled from 'styled-components/native';
import * as CONSTANTS from "../../src/constants";

const {width, height} = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const Tab = createMaterialTopTabNavigator();

const MortimerScreens = () => {

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
          component={HomeScreen}
          options={{
        
            tabBarIcon: ({}) => (
              <Icon source={require('../../assets/icons/fixed/homeIcon.png')}/>
            ),
            tabBarLabel: ({}) => null,
  
          }} 
        />
        <Tab.Screen
          name="Profile" 
          component={ProfileScreen3}
          options={{
            tabBarIcon: ({}) => (
                <Icon source={require('../../assets/icons/fixed/profileIcon.png')}/>
            ),
            tabBarLabel: ({}) => null,
        }}
        />
        <Tab.Screen 
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({}) => (
              <Icon source={require('../../assets/icons/fixed/settingsIcon.png')}/>
            ),
            tabBarLabel: ({}) => null,
  
          }}
        />
        <Tab.Screen 
          name="Connections"
          component={ConnectionScreen}
          options={{
            tabBarIcon: ({}) => (
              <Icon source={require('../../assets/icons/conections-icon.png')}/>
            ),
            tabBarLabel: ({}) => null,
  
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
);
}

export default MortimerScreens;
