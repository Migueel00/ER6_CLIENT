import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import AppContext from '../../helpers/context';
import VillainContext from '../../helpers/VillainContext';
import MenuVillain from './components/MenuVillain';
import MenuVillainInsideLab from './components/MenuVillainInsideLab';
import MenuVillainTower from './components/MenuVillainTower';
import MenuHallVillain from './components/MenuHallVillain';


const MenuContainer = styled.View`
    flex: 1;
`;


const VillainProvider = () => {

    const appContext = useContext(AppContext);
    const location   = appContext?.location;
    const socket = appContext?.socket;
    const player = appContext?.player;
    const players = appContext?.players!;
    const setPlayer = appContext?.setPlayer;
    const setPlayers = appContext?.setPlayers;
    const isInsideHall = player?.isInsideHall;
  
    const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
    const [isMenuLabLoaded, setIsMenuLabLoaded] = useState<boolean>(false);
    const [isMenuTowerLoaded, setIsMenuTowerLoaded] = useState<boolean>(false);
    const [isMenuSwampLoaded, setIsMenuSwampLoaded] = useState<boolean>(false);
    const [isMenuOldSchoolLoaded, setIsMenuOldSchoolLoaded] = useState<boolean>(false);
    const [isMenuHallOfSagesLoaded, setIsMenuHallOfSagesLoaded] = useState<boolean>(false);
    

    return (
        <VillainContext.Provider
            value={{isMenuLoaded, setIsMenuLoaded, isMenuLabLoaded, setIsMenuLabLoaded, 
                isMenuTowerLoaded, 
                setIsMenuTowerLoaded
            }}>
                <MenuContainer>
                    {isInsideHall ? <MenuHallVillain/>
                    : location === 'LAB' ? <MenuVillainInsideLab/> 
                    : location === 'TOWER' ? <MenuVillainTower/> 
                    : <MenuVillain/>  }
                </MenuContainer>  
        </VillainContext.Provider>
    );
}

export default VillainProvider;
