import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './homeScreen';
import ProfileScreen3 from './ProfileScreen3';
import { Dimensions , Image} from 'react-native';
import SettingsScreen from './settings/settingsScreen';
import PotionCreator from './PotionCreator';

const Tab = createMaterialTopTabNavigator();

const VillainScreens = () => {
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
            component={HomeScreen}
            options={{
            
                tabBarIcon: ({}) => (
                <Image
                    source={require('./../assets/icons/fixed/homeIcon.png')}
                    style={{ width: 70, height: 70, resizeMode: 'contain',  margin: 0}}
                />
                ),
                tabBarLabel: ({}) => null,
    
            }} 
            />
            <Tab.Screen
            name="Profile" 
            component={ProfileScreen3}
            options={{
                tabBarIcon: ({}) => (
                <Image
                    source={require('./../assets/icons/fixed/profileIcon.png')}
                    style={{width: 70, height: 70}}
                />
                ),
                tabBarLabel: ({}) => null,
            }}
            />
            <Tab.Screen 
            name="Settings"
            component={SettingsScreen}
            options={{
            
                tabBarIcon: ({}) => (
                <Image
                    source={require('./../assets/icons/fixed/settingsIcon.png')}
                    style={{ width: 70, height: 70}}
                />
                ),
                tabBarLabel: ({}) => null,
    
            }}
            />
            <Tab.Screen 
            name="Potion Creator"
            component={PotionCreator}
            options={{
            
                tabBarIcon: ({}) => (
                <Image
                    source={require('./../assets/icons/conections-icon.png')}
                    style={{ width: 70, height: 70}}
                />
                ),
                tabBarLabel: ({}) => null,
    
            }}
            />
        </Tab.Navigator>
    </NavigationContainer>
);
}

export default VillainScreens;
