import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MenuMortimer from './components/MenuMortimer';
import MortimerContext from '../../helpers/MortimerContext';
import AppContext from '../../helpers/context';
import MenuInsideConnection from './components/MenuInsideConnections';
import MenuMortimerTower from './components/MenuMortimerTower';
import MenuOldSchool from '../acolyteScreen/menu/MenuOldSchool';
import InsideHall from '../shared/InsideHall';
import MenuHallMortimer from './components/MenuHallMortimer';
import { NavigationContainer } from '@react-navigation/native';
import MenuOldSchoolMortimer from '../acolyteScreen/menu/MenuOldSchoolMortimer';
import { Vibration } from 'react-native';
import MenuHallInside from '../acolyteScreen/menu/MenuHallInside';

const MenuContainer = styled.View`
  flex: 1;
`;

interface updateEvent {
  playerId: string;
  isInsideLab: boolean;
}

interface updateHallEvent {
  playerId: string;
  isInsideHall: boolean;
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

  useEffect(() => {
    // Escuchar el evento
    // Escuchar el evento
    socket?.on('updateHall', ({  playerId, isInsideHall }: updateHallEvent) => {
      if (player && setPlayer) {
        if(player._id === playerId) {
       
          console.log("PLAYER ID MATCHES");
          const updatedPlayer = { ...player, isInsideHall };
  
          setPlayer(updatedPlayer);
          console.log("UPDATED PLAYER ISINSIDEHALL");
          console.log(player.isInsideHall);
  
          Vibration.vibrate(100);
        }
  
        else {
  
          if(player.location === 'HALL'){
            Vibration.vibrate(100);
          }
  
        }
  
        console.log("UPDATED PLAYERS LIST:");
        const updatePlayers = players.map(player  => player.id === playerId ? { ...player, isInsideHall } : player );
        updatePlayers.forEach(p => console.log(`Player ID: ${p.id}, isInsideHall: ${p.isInsideHall}`));
        setPlayers(updatePlayers);
      }
    });
  
    // Limpiar el evento socket al desmontar el componente
    return () => {
      socket?.off('updateHall');
    };
  }, [player, setPlayer, socket]);

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
