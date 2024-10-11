import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './homeScreen';
import ProfileScreen2 from './profileScreen2';
import SettingsScreen from './settings/settingsScreen';
import LabScreen from './labScreen';
import AppContext from '../helpers/context';

const Tab = createMaterialTopTabNavigator();

const AcolyteScreens = () => {
  const { width, height } = Dimensions.get('window');

  return (
    <AppContext.Consumer>
      {({ setIsLoggedIn }: any) => (
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
                width: 50,  // Ajusta el ancho de los íconos
                height: 50, // Ajusta el alto para dar más espacio
              },
              tabBarIndicatorStyle: {
                backgroundColor: 'orange',
                height: 3, // Ajusta el grosor del indicador de la pestaña
              },
              tabBarItemStyle: {
                justifyContent: 'center', // Asegura que los íconos se centren
                borderRightWidth: 0.2,  // Agrega un borde entre pestañas
                borderRightColor: 'white', // Color del borde
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
              component={ProfileScreen2}
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
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </AppContext.Consumer>
  );
};

export default AcolyteScreens;
