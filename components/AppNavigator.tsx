import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MenuHome from './acolyteScreen/menu/MenuHome';
import MenuLab from './acolyteScreen/menu/MenuLab';
import MenuTower from './acolyteScreen/menu/MenuTower';
import MenuSwamp from './acolyteScreen/menu/MenuSwamp';
import MenuOldSchoolAcolyte from './acolyteScreen/menu/MenuOldSchoolAcolyte';
import MainScreens from './mainScreens';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, // Oculta los encabezados para una experiencia más inmersiva
                    animationEnabled: true, // Habilita animaciones entre pantallas
                }}
            >
                <Stack.Screen name="MAINSCREENS" component={MainScreens} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
