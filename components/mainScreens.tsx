import MortimerScreens from "./mortimerScreen/mortimerScreens";
import IstvanScreens from "./istvanScreen/istvanScreens";
import AcolyteScreens2 from "./acolyteScreen/acolyteScreens2";
import React, { useContext, useEffect } from "react";
import { Text, Vibration } from 'react-native';
import AppContext from "../helpers/context";
import VillainScreens from "./villainScreen/VillainScreens";

interface updateHallEvent {
    nickname: string,
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
        socket?.on('updateMyHall', ({ nickname, playerId, isInsideHall }: updateHallEvent) => {
            if (player && setPlayer) {
                if(playerId === player._id){
                    console.log("INCOMMING NICKNAME: " + nickname);
                    console.log("INCOMING IS INSIDE HALL:", isInsideHall);
                    console.log("INCOMING PLAYERID:", playerId);
    
                    // Actualiza el jugador actual
                    const updatedPlayer = { ...player, isInsideHall };
                    setPlayer(updatedPlayer);

                }
                  
                if (players && setPlayers) {
                    const updatedPlayers = players.map(p => {
                        if (p._id === playerId) {
                            console.log("Nickname encontrado:", p.nickname); // Imprime el nickname del jugador
                            return { ...p, isInsideHall };
                        }
                        return p;
                    });
                    setPlayers(updatedPlayers);
                }
                    
            Vibration.vibrate(100);
            }
        });

        // Limpiar el evento socket al desmontar el componente
        return () => {
            socket?.off('updateMyHall');
        };
    }, [player, setPlayer, players, setPlayers, socket]);

    useEffect(() => {
        console.log("PLAYER IS INSIDE HALL?", player!.isInsideHall);
    }, [player!.isInsideHall]);

    useEffect(() => {
        socket?.on('updateOtherHall', ({ playerId, isInsideHall }: updateHallEvent) => {
            if (players && setPlayers) {
                const updatedPlayers = players.map(p => p._id === playerId ? { ...p, isInsideHall } : p);
                setPlayers(updatedPlayers);
            }
        });
    
        return () => {
            socket?.off('updateOtherHall');
        };
    }, [players, setPlayers, socket]);
    
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