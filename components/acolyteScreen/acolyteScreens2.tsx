import React, { ReactNode, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import AcolyteContext from '../../helpers/AcolyteContext';
import AppContext from '../../helpers/context';
import MenuHome from './menu/MenuHome';
import MenuLab from './menu/MenuLab';
import MenuLabInside from './menu/MenuLabInside';
import { Vibration } from 'react-native';

const MenuContainer = styled.View`
  flex: 1;
`
interface updateEvent {
  playerId: string;
  isInsideLab: boolean;
}

const AcolyteProvider = () => {

const appContext = useContext(AppContext);
const location = appContext?.location;
const [player, setPlayer] = useState(appContext?.player);
const isInsideLab = player?.isInsideLab!;
const socket = appContext?.socket;

const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
const [isMenuLabLoaded, setIsMenuLabLoaded] = useState<boolean>(false);
const [isMenuInsideLabLoaded, setIsMenuInsideLabLoaded] = useState<boolean>(false);

useEffect(() => {
  // Escuchar el evento
  socket?.on('update', ({  playerId, isInsideLab }: updateEvent) => {
    if (player && setPlayer) {
      if(player._id === playerId){
        const updatedPlayer = { ...player, isInsideLab };
        setPlayer(updatedPlayer);
        Vibration.vibrate(100);
      }
    }
  });

  // Limpiar el evento socket al desmontar el componente
  return () => {
    socket?.off('update');
  };
}, [player, setPlayer, socket]);

  useEffect(() => {
    console.log("ESTADO DE isInsideLab " + isInsideLab);
  }, [isInsideLab]);

  return (
    <AcolyteContext.Provider value={{ 
        isMenuLoaded, 
        setIsMenuLoaded,
        isMenuLabLoaded,
        setIsMenuLabLoaded,
        isMenuInsideLabLoaded,
        setIsMenuInsideLabLoaded,
        isInsideLab
      }}>
      <MenuContainer>
          {isInsideLab ? <MenuLabInside/> : location === 'LAB' ? <MenuLab/> : <MenuHome />}
      </MenuContainer>
    </AcolyteContext.Provider>
  );
};

export default AcolyteProvider
