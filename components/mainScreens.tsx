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
        socket?.on('updateHall', async ({ playerId, isInsideHall }: updateHallEvent) => {
            if (player && setPlayer) {
                if (player._id === playerId) {
                    console.log("INCOMING IS INSIDE HALL:", isInsideHall);
                    console.log("PLAYER ID MATCHES");
    
                    // Actualiza el jugador actual
                    const updatedPlayer = { ...player, isInsideHall };
                    setPlayer(updatedPlayer);
    
                    // Crea una copia de `players` y actualiza el jugador correspondiente
                    const newPlayers = players.map(p => p._id === playerId ? { ...p, isInsideHall } : p);
                    setPlayers(newPlayers);
    
                    console.log("UPDATED PLAYER ISINSIDEHALL:", updatedPlayer.isInsideHall);
                    Vibration.vibrate(100);
                } else {
                    if (player.location === 'HALL') {
                        Vibration.vibrate(100);
                    }
    
                    console.log("PLAYER_ID:", player._id);
    
                    // Mapea `players` y actualiza solo el jugador necesario
                    const updatedPlayers = players.map(p => p._id === playerId ? { ...p, isInsideHall } : p);
                    updatedPlayers.forEach(p => console.log(`Player ID: ${p._id}, Player Nickname: ${p.nickname}, isInsideHall: ${p.isInsideHall}`));
    
                    console.log("UPDATED PLAYERS");
                    console.log(updatedPlayers);
    
                    setPlayers(updatedPlayers);
                }
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