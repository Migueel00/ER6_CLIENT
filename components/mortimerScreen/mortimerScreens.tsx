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
import { Dimensions, Vibration } from 'react-native';

const alertIcon = require('./../../assets/icons/alertIcon.png');

const MenuContainer = styled.View`
  flex: 1;
`;

interface updateEvent {
  playerId: string;
  isInsideLab: boolean;
}

const {width, height} = Dimensions.get('window');

const MortimerProvider = () => {

  const appContext = useContext(AppContext);
  const mortimerLocation   = appContext?.location;
  const socket = appContext?.socket;
  const player = appContext?.player;
  const players = appContext?.players!;
  const setPlayers = appContext?.setPlayers;
  const isInsideHall = player?.isInsideHall;

  const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
  const [isMenuConnectionLoaded, setIsMenuConnectionLoaded] = useState<boolean>(false);
  const [isMenuTowerLoaded, setIsMenuTowerLoaded] = useState<boolean>(false);
  const [isMenuSwampLoaded, setIsMenuSwampLoaded] = useState<boolean>(false);
  const [isMenuOldSchoolLoaded, setIsMenuOldSchoolLoaded] = useState<boolean>(false);
  const [isMenuHallOfSagesLoaded, setIsMenuHallOfSagesLoaded] = useState<boolean>(false);
  const [showAlertButton, setShowAlertButton] = useState<boolean>(true);

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
  // Manage messages inside the app
  messaging().onMessage(async (remoteMessage) => {
    console.log('Notificación recibida en primer plano:', remoteMessage);
    
    if (remoteMessage.notification?.title === 'The acolytes call you, destiny awaits.') {
        console.log('Mostrar icono de alerta');
        setShowAlertButton(true);
        Vibration.vibrate(350);
      }
      else {
        setShowAlertButton(false);
      }
    });

}, []);

// Hide button if player is inside
useEffect(() => {

  if (player?.isInsideHall){
    setShowAlertButton(false);
  }

}, [player]);

const handleAlertButtonPress = () => {
  console.log('Botón de alerta presionado');
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
      setIsMenuHallOfSagesLoaded,
      showAlertButton,
      setShowAlertButton
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

        {showAlertButton && !player?.isInsideHall && (
          <AlertButton onPress={handleAlertButtonPress}>
            <AlertButtonImage source={alertIcon} />
          </AlertButton>
      )}
      </NavigationContainer>
    </MortimerContext.Provider>
  
);
}

const AlertButtonImage = styled.Image`
  width: ${width * 0.15}px;
  height: ${width * 0.15}px;
`;

const AlertButton = styled.TouchableOpacity`
  position: absolute;
  top: ${height * 0.21}px;
  left: ${height * 0.01}px;
`;


export default MortimerProvider;