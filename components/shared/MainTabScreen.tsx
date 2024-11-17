import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styled from 'styled-components/native';
import { Dimensions, ImageSourcePropType } from 'react-native';

const { width } = Dimensions.get('window');

// Definir los tipos para las pantallas
type ScreenConfig = {
    name: string;
    component: React.ComponentType<any>; // Tipo para los componentes
    iconSource: ImageSourcePropType;    // Fuente de la imagen para el ícono
};

type TabScreensComponentProps = {
    Tab: ReturnType<typeof createMaterialTopTabNavigator>;  // Usamos ReturnType para obtener el tipo del Tab
    screens: ScreenConfig[];       // Las pantallas que se van a pasar
};

const Icon = styled.Image`
    width: ${width * 0.15}px;
    height: ${width * 0.15}px;
`;

const TabScreensComponent: React.FC<TabScreensComponentProps> = ({ Tab, screens }) => {
    return (
        <>
            {screens.map((screen, index) => (
                <Tab.Screen
                    key={index}
                    name={screen.name}
                    component={screen.component} // Aquí pasamos el componente correctamente
                    options={{
                        tabBarIcon: () => (
                            <Icon
                                style={{height: width * 0.15, width: width * 0.15 }}
                                source={screen.iconSource}
                            />
                        ),
                        tabBarLabel: () => null,
                    }}
                />
            ))}
        </>
    );
};

export default TabScreensComponent;
