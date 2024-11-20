import { NavigationContainer, NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MortimerContext from '../../helpers/MortimerContext';
import AppContext from '../../helpers/context';
import MenuHallInside from '../acolyteScreen/menu/MenuHallInside';
import MenuHallMortimer from './components/MenuHallMortimer';
import MenuMortimer from './components/MenuMortimer';
import MenuMortimerTower from './components/MenuTowerMortimer';
import MenuOldSchoolMortimer from './components/MenuOldSchoolMortimer';
import MenuLabMortimer from './components/MenuLabMortimer';
import MenuSwampMortimer from './components/MenuSwampMortimer';
import messaging from '@react-native-firebase/messaging';

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
  const setPlayers = appContext?.setPlayers;
  const isInsideHall = player?.isInsideHall;
  const setLocation = appContext?.setLocation;

  const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
  const [isMenuConnectionLoaded, setIsMenuConnectionLoaded] = useState<boolean>(false);
  const [isMenuTowerLoaded, setIsMenuTowerLoaded] = useState<boolean>(false);
  const [isMenuSwampLoaded, setIsMenuSwampLoaded] = useState<boolean>(false);
  const [isMenuOldSchoolLoaded, setIsMenuOldSchoolLoaded] = useState<boolean>(false);
  const [isMenuHallOfSagesLoaded, setIsMenuHallOfSagesLoaded] = useState<boolean>(false);

    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

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

    // Configura la recepción de mensajes cuando la aplicación está en segundo plano o cerrada
    const onNotificationOpenedApp = () => {
      messaging().onNotificationOpenedApp(remoteMessage => {
          console.log('Notificación abierta desde el segundo plano:', remoteMessage);
          // Maneja la lógica de la navegación aquí
          setLocation('TOWER');
          navigation.navigate('TOWER');
    });
  }
  
  useEffect(() => {
      onNotificationOpenedApp();
  }, []);


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
          : mortimerLocation === 'LAB' ? <MenuLabMortimer/> 
          : mortimerLocation === 'TOWER' ? <MenuMortimerTower/>
          : mortimerLocation === 'OLDSCHOOL' ? <MenuOldSchoolMortimer/>
          : mortimerLocation === 'HALL' ? <MenuHallMortimer/>
          : mortimerLocation === 'SWAMP' ? <MenuSwampMortimer/>
          : <MenuMortimer/>}
        </MenuContainer>
      </NavigationContainer>
    </MortimerContext.Provider>
  
);
}

export default MortimerProvider;
