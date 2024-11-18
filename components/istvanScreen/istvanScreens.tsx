import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styled from 'styled-components/native';
import IstvanContext from '../../helpers/IstvanContext';
import AppContext from '../../helpers/context';
import MenuHallInside from '../acolyteScreen/menu/MenuHallInside';
import MenuIstvanLab from './components/MenuIstvanLab';
import MenuIstvanTower from './components/MenuIstvanTower';
import MenuOldSchoolIstvan from './components/MenuOldSchoolIstvan';
import MenuSwampIstvan from './components/MenuSwampIstvan';
import MenuHallIstvan from './components/MenuHallIstvan';
import MenuIstvan from './components/MenuIstvan';

const MenuContainer = styled.View`
    flex: 1;
`;



const Tab = createMaterialTopTabNavigator();

const IstvanScreens = () => {

    const appContext = useContext(AppContext);
    const location   = appContext?.location;
    const player = appContext?.player;
    const isInsideHall = player?.isInsideHall;

    const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
    const [isMenuLabLoaded, setIsMenuLabLoaded] = useState<boolean>(false);
    const [isMenuTowerLoaded, setIsMenuTowerLoaded] = useState<boolean>(false);
    const [isMenuSwampLoaded, setIsMenuSwampLoaded] = useState<boolean>(false);
    const [isMenuOldSchoolLoaded, setIsMenuOldSchoolLoaded] = useState<boolean>(false);
    const [isMenuHallOfSagesLoaded, setIsMenuHallOfSagesLoaded] = useState<boolean>(false);
    

    return (
        <IstvanContext.Provider
            value={{isMenuLoaded,
                setIsMenuLoaded,
                isMenuLabLoaded,
                setIsMenuLabLoaded,
                isMenuTowerLoaded,
                setIsMenuTowerLoaded,
                isMenuSwampLoaded,
                setIsMenuSwampLoaded,
                isMenuOldSchoolLoaded,
                setIsMenuOldSchoolLoaded,
                isMenuHallOfSagesLoaded,
                setIsMenuHallOfSagesLoaded
            }}>
            <NavigationContainer>
                <MenuContainer>
                    {isInsideHall ? <MenuHallInside/>
                    : location === 'LAB' ? <MenuIstvanLab/> 
                    : location === 'TOWER' ? <MenuIstvanTower/> 
                    : location === 'OLDSCHOOL' ? <MenuOldSchoolIstvan/>
                    : location === 'SWAMP' ? <MenuSwampIstvan/>
                    : location === 'HALL' ? <MenuHallIstvan/>
                    : <MenuIstvan/>  }
                </MenuContainer>  
            </NavigationContainer>
        </IstvanContext.Provider>
    );
};


export default IstvanScreens;