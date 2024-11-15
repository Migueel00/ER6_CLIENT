import styled from 'styled-components/native';
import * as CONSTANTS from "../../../src/constants";
import { Dimensions, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen3 from '../../shared/ProfileScreen';
import SettingsScreen from '../../settings/settingsScreen';
import { useContext, useEffect } from 'react';
import VillainContext from '../../../helpers/VillainContext';
import PotionCreator from '../../shared/PotionCreator/PotionCreator';
import AppContext from '../../../helpers/context';
import ExitLab from '../../shared/ExitLab';


const { width, height } = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`

const MenuVillainInsideLab = () => {

    const Tab = createMaterialTopTabNavigator();

    const villainContext = useContext(VillainContext);
    const setIsMenuLabLoaded = villainContext?.setIsMenuLabLoaded!;
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;

    useEffect(() => {
        setIsMenuLabLoaded(true);


        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        return() => {
            setIsMenuLabLoaded(false);
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
                    name='LAB'
                    component={PotionCreator}
                    options={{
                        tabBarIcon: ({ }) => (

                                <Icon source={require('../../../assets/icons/villainLabIcon.png')}  style={{ width: width * 0.16, height: width * 0.16, borderRadius: width * 0.5 }}  />

                        ),
                        tabBarLabel: ({ }) => null,

                    }}
                />
                 <Tab.Screen
                    name="EXITLAB"
                    component={ExitLab}
                    options={{
                        tabBarIcon: ({ }) => (
                            <Icon source={require('../../../assets/icons/exitLabIcon.png')} />
                        ),
                        tabBarLabel: ({ }) => null,
                    }}
                />
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


            </Tab.Navigator>
    )
}

export default MenuVillainInsideLab;