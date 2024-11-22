import MortimerScreens from "./mortimerScreen/mortimerScreens";
import IstvanScreens from "./istvanScreen/istvanScreens";
import AcolyteScreens2 from "./acolyteScreen/acolyteScreens2";
import React, { useContext, useEffect } from "react";
import { Text, Vibration } from 'react-native';
import AppContext from "../helpers/context";
import VillainScreens from "./villainScreen/VillainScreens";
import Artifact from "../interfaces/ArtifactsInterface";

interface updateTowerEvent {
    playerId: string;
    isInsideTower: boolean;
}

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
    const setIsValidating = appContext?.setIsValidating!;
    const artifacts = appContext?.artifacts;
    const setArtifacts = appContext?.setArtifacts!;

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
                    Vibration.vibrate(100);
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
        socket.on('updateTower', ({ playerId, isInsideTower }: updateTowerEvent) => {
            const updatedPlayers = players.map(player =>
                player.id === playerId ? { ...player, isInsideTower } : player
            );

            

            setPlayers(updatedPlayers);

        });

        return () => {
            socket.off('updateTower');
        };
    }, [socket, players, setPlayers]);


    useEffect(() => {         
        socket?.on('updateArtifact', (updateArtifact: Artifact) => {       

            console.log("SOCKET ARTIFACTS " + JSON.stringify(artifacts));
            
            // setArtifacts(updatedArtifacts);
            setArtifacts((prevArtifacts) => {
                return prevArtifacts.map(artifact => 
                    artifact.id === updateArtifact.id ? updateArtifact : artifact);
            })
        
            console.log("SOCKET ARTIFACTS " + JSON.stringify(artifacts));
        });      
    }, []);



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