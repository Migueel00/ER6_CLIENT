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
        socket?.on('updateMyHall', ({ playerId, isInsideHall }: updateHallEvent) => {
            if (player && setPlayer) {
                    console.log("INCOMING IS INSIDE HALL:", isInsideHall);
    
                    // Actualiza el jugador actual
                    const updatedPlayer = { ...player, isInsideHall };
                    setPlayer(updatedPlayer);

                    console.log("PLAYER IS INSIDE HALL?");
                    
                    console.log(player.isInsideHall);

                            // Actualiza el jugador en el array `players`
                    if (players && setPlayers) {
                        const updatedPlayers = players.map(p => p._id === playerId ? { ...p, isInsideHall } : p);
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