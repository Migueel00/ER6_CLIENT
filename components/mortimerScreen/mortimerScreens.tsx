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
import { Dimensions, Modal, TouchableWithoutFeedback, Vibration } from 'react-native';
import MenuObituaryMortimer from './components/MenuObituaryMortimer';

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
  const [isMenuObituaryLoaded, setIsMenuObituaryLoaded] = useState<boolean>(false);
  const [showAlertButton, setShowAlertButton] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  if (player?.isInsideHall) {
    setShowAlertButton(false);
  }

}, [player]);

const handleAlertButtonPress = () => {
  console.log('Botón de alerta presionado');
  setIsModalVisible(true); // Show the modal when the button is pressed
};

const handleCloseModal = () => {
  setIsModalVisible(false); // Close the modal
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
      isMenuObituaryLoaded,
      setIsMenuObituaryLoaded,
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
          : mortimerLocation === 'OBITUARY' ? <MenuObituaryMortimer/>
          : <MenuMortimer/>}
        </MenuContainer>

        {showAlertButton && !player?.isInsideHall && (
          <AlertButton onPress={handleAlertButtonPress}>
            <AlertButtonImage source={alertIcon} />
          </AlertButton>
      )}

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}>

          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <ModalContainer>
              <ModalContent>
                <ModalText>Mortimer, the acolytes rise, and your fate is sealed!</ModalText>
                <ModalText>Go to the Hall Of Sages</ModalText>
              </ModalContent>
            </ModalContainer>
          </TouchableWithoutFeedback>

        </Modal>
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

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
    background-color: rgba(0, 0, 0, 0.93); /* Fondo oscuro con opacidad */
  padding: ${height * 0.012}px;
  border-radius: ${width * 0.05}px;
  bottom: ${height * 0.26}px;
  width: ${width * 0.8}px;
  left: ${width * 0.08}px;
`;

const ModalText = styled.Text`
    color: white;
    font-size: ${width * 0.09}px;
    font-family: 'KochAltschrift';
    text-align: center;
`;

export default MortimerProvider;