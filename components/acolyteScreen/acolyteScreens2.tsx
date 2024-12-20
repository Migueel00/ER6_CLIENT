import React, { ReactNode, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import AcolyteContext from '../../helpers/AcolyteContext';
import AppContext from '../../helpers/context';
import MenuHome from './menu/MenuHome';
import MenuLab from './menu/MenuLab';
import MenuLabInside from './menu/MenuLabInside';
import MenuTower from './menu/MenuTower';
import { Vibration } from 'react-native';
import MenuTowerInside from './menu/MenuTowerInside';

const MenuContainer = styled.View`
  flex: 1;
`
interface updateEvent {
  playerId: string;
  isInsideLab: boolean;
}

interface updateTowerEvent {
  playerId: string;
  isInsideTower: boolean;
}

const AcolyteProvider = () => {

const appContext = useContext(AppContext);
const [player, setPlayer] = useState(appContext?.player);
const isInsideLab = player?.isInsideLab!;
const isInsideTower = player?.isInsideTower!;
const socket = appContext?.socket;
const acolyteLocation = appContext?.location;


const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
const [isMenuLabLoaded, setIsMenuLabLoaded] = useState<boolean>(false);
const [isMenuInsideLabLoaded, setIsMenuInsideLabLoaded] = useState<boolean>(false);
const [isMenuTowerLoaded, setIsMenuTowerLoaded] = useState<boolean>(false);
const [hasEmitted, setHasEmitted] = useState(false); // Estado para controlar el emit

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
  // Escuchar el evento
  socket?.on('updateTower', ({  playerId, isInsideTower }: updateTowerEvent) => {
    if (player && setPlayer) {
      if(player._id === playerId){
        const updatedPlayer = { ...player, isInsideTower };
        setPlayer(updatedPlayer);
        Vibration.vibrate(100);

        if (!hasEmitted) { // Verifica si ya se hizo emit
          socket.emit("AnatiCloseDoor", "Close the door");
          setHasEmitted(true); // Marca el emit como hecho
      }
      }
    }
  });

  // Limpiar el evento socket al desmontar el componente
  return () => {
    socket?.off('updateTower');
  };
}, [player, setPlayer, socket, hasEmitted]);


useEffect(() => {
  // Resetear el emit después de 5 segundos si no se ha vuelto a emitir
  const resetEmit = setTimeout(() => {
      setHasEmitted(false);
  }, 5000);

  // Limpiar el timeout si el componente se desmonta o se actualiza
  return () => clearTimeout(resetEmit);
}, [hasEmitted]);

  useEffect(() => {
    // console.log("ESTADO DE isInsideLab " + isInsideLab);
  }, [isInsideLab]);

  useEffect(() => {
    console.log("ESTADO DE isInsideTower " + isInsideTower);
  }, [isInsideTower]);

  return (
    <AcolyteContext.Provider value={{ 
        isMenuLoaded, 
        setIsMenuLoaded,
        isMenuLabLoaded,
        setIsMenuLabLoaded,
        isMenuInsideLabLoaded,
        setIsMenuInsideLabLoaded,
        isMenuTowerLoaded,
        setIsMenuTowerLoaded,
        isInsideLab,
        isInsideTower
      }}>


      <MenuContainer>
        {isInsideLab ? <MenuLabInside />
        : isInsideTower ? <MenuTowerInside /> 
        : acolyteLocation === 'LAB' ? <MenuLab />
        : acolyteLocation === 'TOWER' ? <MenuTower/>
        : <MenuHome />}    
                    
      </MenuContainer>
    </AcolyteContext.Provider>
  );
};

export default AcolyteProvider
