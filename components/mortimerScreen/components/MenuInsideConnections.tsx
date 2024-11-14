import styled from 'styled-components/native';
import * as CONSTANTS from "../../../src/constants";
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen3 from '../../shared/ProfileScreen';
import SettingsScreen from '../../settings/settingsScreen';
import ConnectionScreen from '../connectionsScreen';
import MapScreenMortimer from './MapScreenMortimer';
import { useContext, useEffect } from 'react';
import MortimerContext from '../../../helpers/MortimerContext';
import AppContext from '../../../helpers/context';


const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuInsideConnection = () => {

    const Tab = createMaterialTopTabNavigator();

    const mortimerContext = useContext(MortimerContext);
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const setIsMenuConnectionLoaded = mortimerContext?.setIsMenuConnectionLoaded!;

    useEffect(() => {
        setIsMenuConnectionLoaded(true);

        const value = {
            playerID: appContext?.player,
            location: appContext?.location
        }

        socket.emit("UpdateLocation", value);

        return() => {
            setIsMenuConnectionLoaded(false);
        }
    }, []);

    return (
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
                    name="Profile"
                    component={ProfileScreen3}
                    options={{
                        tabBarIcon: ({ }) => (
                            <Icon source={require('../../../assets/icons/fixed/profileIcon.png')} />
                        ),
                        tabBarLabel: ({ }) => null,
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ }) => (
                            <Icon source={require('../../../assets/icons/fixed/settingsIcon.png')} />
                        ),
                        tabBarLabel: ({ }) => null,

                    }}
                />
                <Tab.Screen
                    name="LAB"
                    component={ConnectionScreen}
                    options={{
                        tabBarIcon: ({ }) => (
                            <Icon source={require('../../../assets/icons/conections-icon.png')} />
                        ),
                        tabBarLabel: ({ }) => null,

                    }}
                />
                <Tab.Screen
                    name='MAP'
                    component={MapScreenMortimer}
                    options={{
                        tabBarIcon: ({ }) => (
                            <Icon source={require('../../../assets/icons/mapIcon.png')} />
                        ),
                        tabBarLabel: ({ }) => null,

                    }}
                />
            </Tab.Navigator>
    )
}

export default MenuInsideConnection;