import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MortimerContext from '../../helpers/MortimerContext';
import AppContext from '../../helpers/context';
import MenuHallInside from '../acolyteScreen/menu/MenuHallInside';
import MenuHallMortimer from './components/MenuHallMortimer';
import MenuInsideConnection from './components/MenuInsideConnections';
import MenuMortimer from './components/MenuMortimer';
import MenuMortimerTower from './components/MenuMortimerTower';
import MenuOldSchoolMortimer from './components/MenuOldSchoolMortimer';

const MenuContainer = styled.View`
  flex: 1;
`;

interface updateEvent {
  playerId: string;
  isInsideLab: boolean;
}


const MortimerProvider = () => {

  const appContext = useContext(AppContext);
  const mortimerLocation   = appContext?.location;
  const socket = appContext?.socket;
  const player = appContext?.player;
  const players = appContext?.players!;
  const setPlayer = appContext?.setPlayer;
  const setPlayers = appContext?.setPlayers;
  const isInsideHall = player?.isInsideHall;

  const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
  const [isMenuConnectionLoaded, setIsMenuConnectionLoaded] = useState<boolean>(false);
  const [isMenuTowerLoaded, setIsMenuTowerLoaded] = useState<boolean>(false);
  const [isMenuSwampLoaded, setIsMenuSwampLoaded] = useState<boolean>(false);
  const [isMenuOldSchoolLoaded, setIsMenuOldSchoolLoaded] = useState<boolean>(false);
  const [isMenuHallOfSagesLoaded, setIsMenuHallOfSagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    console.log("ENTRA AL USEFFECT")
    // Escuchar el evento
    socket.on('update', ({ playerId  , isInsideLab } : updateEvent) => {
        const updatePlayers = players.map(player  => player.id === playerId ? { ...player, isInsideLab } : player );

        console.log(updatePlayers);
        
        // Settear players
        setPlayers(updatePlayers);
        
        console.log("PLAYER ID" + playerId);
        console.log("IS INSIDE LAB " + isInsideLab);
        console.log("ENTRA AL EVENTO DE UPDATE");
    });

    // Limpiar el evento socket
    return () => {
        socket.off('update');
    };
}, [players, setPlayers]);



  return (
    <MortimerContext.Provider value={{
      isMenuLoaded,
      setIsMenuLoaded,
      isMenuConnectionLoaded,
      setIsMenuConnectionLoaded,
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
          : mortimerLocation === 'LAB' ? <MenuInsideConnection/> 
          : mortimerLocation === 'TOWER' ? <MenuMortimerTower/>
          : mortimerLocation === 'OLDSCHOOL' ? <MenuOldSchoolMortimer/>
          : mortimerLocation === 'HALL' ? <MenuHallMortimer/>
          : <MenuMortimer/>}
        </MenuContainer>
      </NavigationContainer>
    </MortimerContext.Provider>
  
);
}

export default MortimerProvider;
