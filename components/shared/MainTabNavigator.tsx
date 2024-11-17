import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions, ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

type ScreenConfig = {
    name: string;
    component: React.ComponentType<any>; // Tipo para los componentes
    iconSource: ImageSourcePropType;    // Fuente de la imagen para el ícono
};


type TabNavigatorComponentProps = {
    Tab: ReturnType<typeof createMaterialTopTabNavigator>;  // Usamos ReturnType para obtener el tipo del Tab
    screens: ScreenConfig[];       // Las pantallas que se van a pasar
};

const Icon = styled.Image`
    width: ${width * 0.15}px;
    height: ${width * 0.15}px;
`;

const MainTabNavigator: React.FC<TabNavigatorComponentProps> = ({ Tab, screens }) => {
    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    animationEnabled: false,
                    tabBarStyle: {
                        backgroundColor: 'black',
                        height: height * 0.10, // Incremento en la altura para más espacio
                        paddingBottom: 1, // Añade espacio en la parte inferior de la barra
                    },
                    tabBarIconStyle: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: height * 0.08,  // Puedes ajustar el ancho de los íconos
                        height: height * 0.073, // Ajusta el alto para dar más espacio
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: 'orange',
                        height: height * 0.002,
                    },
                    tabBarItemStyle: {
                        justifyContent: 'center',
                        borderRightWidth: height * 0.002,
                        borderRightColor: 'white',
                        paddingHorizontal: 0,
                        height: '100%'
                    },
                })}>
            {screens.map((screen, index) => (
                <Tab.Screen
                    key={index}
                    name={screen.name}
                    component={screen.component} // Aquí pasamos el componente correctamente
                    options={{
                        tabBarIcon: () => (
                            <Icon
                                style={{height: width * 0.16, width: width * 0.16, borderRadius: width * 0.5 }}
                                source={screen.iconSource}
                            />
                        ),
                        tabBarLabel: () => null,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
