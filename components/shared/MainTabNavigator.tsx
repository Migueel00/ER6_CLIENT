import React, { ReactNode } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Definir el tipo de las props
type TabNavigatorComponentProps = {
    Tab: ReturnType<typeof createMaterialTopTabNavigator>;  // Usamos ReturnType para obtener el tipo del Tab
    children: ReactNode;  // Los "children" son las pantallas que se pasan
};

const TabNavigatorComponent: React.FC<TabNavigatorComponentProps> = ({ Tab, children }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'black',
                    height: '10%',
                    paddingBottom: 1,
                },
                tabBarIconStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '8%',
                    height: '8%',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'orange',
                    height: '0.2%',
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    borderRightWidth: 0.2,
                    borderRightColor: 'white',
                    paddingHorizontal: 0,
                    height: '100%',
                },
            }}
        >
            {children}
        </Tab.Navigator>
    );
};

export default TabNavigatorComponent;
