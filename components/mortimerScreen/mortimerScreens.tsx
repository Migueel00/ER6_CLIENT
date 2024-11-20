import { NavigationContainer } from '@react-navigation/native';
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

const AlertButton = styled.TouchableOpacity`
position: absolute;
top: 20px;
left: 20px;
background-color: red;
padding: 10px;
border-radius: 5px;
`;

const AlertButtonText = styled.Text`
color: white;
font-size: 16px;
font-weight: bold;
`;


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
  const [showAlertButton, setShowAlertButton] = useState(false);

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
  // Manejar mensajes en primer plano
  messaging().onMessage(async (remoteMessage) => {
    console.log('Notificación recibida en primer plano:', remoteMessage);
    
    if (remoteMessage.notification?.title === 'The acolytes call you, destiny awaits.') {
        console.log('Mostrar icono de alerta');
        setShowAlertButton(true);
      }
      else {
        setShowAlertButton(false);
      }
    });
}, []);

const handleAlertButtonPress = () => {
  console.log('Botón de alerta presionado');
  setShowAlertButton(false); // Oculta el botón al presionarlo
};

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

        {showAlertButton && (
            <AlertButton onPress={handleAlertButtonPress}>
              <AlertButtonText>ALERT</AlertButtonText>
            </AlertButton>
          )}
      </NavigationContainer>
    </MortimerContext.Provider>
  
);
}

export default MortimerProvider;