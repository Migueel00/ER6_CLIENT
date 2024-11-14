import MortimerScreens from "./mortimerScreen/mortimerScreens";
import IstvanScreens from "./istvanScreen/istvanScreens";
import AcolyteScreens2 from "./acolyteScreen/acolyteScreens2";
import React, { useContext, useEffect } from "react";
import { Text, Vibration } from 'react-native';
import AppContext from "../helpers/context";
import VillainScreens from "./villainScreen/VillainScreens";

interface updateHallEvent {
    playerId: string;
    isInsideHall: boolean;
  }
  

const MainScreens = () => {
    const userRole = useContext(AppContext)?.userRole;
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const player = appContext?.player;
    const setPlayer = appContext?.setPlayer;
    const players = appContext?.players!;
    const setPlayers = appContext?.setPlayers;

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
      
            console.log("PLAYER_ID:");
            console.log(player._id);
    
            const updatePlayers = players.map(player  => player._id === playerId ? { ...player, isInsideHall } : player );
            updatePlayers.forEach(p => console.log(`Player ID: ${p.id}, Player Nickname: ${p.nickname}, isInsideHall: ${p.isInsideHall}`));
    
            console.log("UPDATED PLAYERS");
            console.log(updatePlayers);
            
            setPlayers(updatePlayers);
          }
        });
      
        // Limpiar el evento socket al desmontar el componente
        return () => {
          socket?.off('updateHall');
        };
      }, [player, setPlayer, socket]);
    
    return (
        <>
            {userRole === 'ACOLYTE' ? (
                <AcolyteScreens2 />
            ) : userRole === 'MORTIMER' ? (
                <MortimerScreens />
            ) : userRole === 'ISTVAN' ? (
                <IstvanScreens />
            ) : userRole === 'VILLAIN' ?(
                <VillainScreens/>
            ) :
                <Text>No role assigned</Text>}
        </>
    );
}

export default MainScreens;