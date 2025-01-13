import MortimerScreens from "./mortimerScreen/mortimerScreens";
import IstvanScreens from "./istvanScreen/istvanScreens";
import AcolyteScreens from "./acolyteScreen/AcolyteScreens";
import React, { useContext, useEffect } from "react";
import { Text, Vibration } from 'react-native';
import AppContext from "../helpers/context";
import VillainScreens from "./villainScreen/VillainScreens";
import Artifact from "../interfaces/ArtifactsInterface";
import { Player } from "../interfaces/contextInterface";

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
                if (playerId === player._id) {
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
                player._id === playerId ? { ...player, isInsideTower } : player
            );

            setPlayers(updatedPlayers);

        });

        return () => {
            socket.off('updateTower');
        };
    }, [socket, players, setPlayers]);

    useEffect(() => {

        socket.on('updatePlayerCurses', (updatedPlayer: Player) => {

            const updatedPlayers = players.map(player =>
                player._id === updatedPlayer._id ? { ...player, curses: updatedPlayer.curses } : player
            );

            setPlayers(updatedPlayers);

            if(player?._id === updatedPlayer._id){
                setPlayer(updatedPlayer);
            }
        });

        return () => {
            socket.off('updatePlayerCurses');
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
        
        socket.on('updateAll', (updatePlayer : Player) => {
            const updatedPlayers = players.map(player =>
                player._id === updatePlayer._id ? updatePlayer : player
            );
            setPlayers?.(updatedPlayers);
            
            if(player?._id === updatePlayer._id){
                setPlayer(updatePlayer);
            }
        });
    }, []);


    useEffect(() => {

        socket.on('updateEthazium', (updatedPlayer: Player) => {

            const updatedPlayers = players.map(player =>
                player._id === updatedPlayer._id ? { ...player, ethazium: updatedPlayer.ethazium } : player
            );

            setPlayers(updatedPlayers);

            if(player?._id === updatedPlayer._id){
                setPlayer(updatedPlayer);
            }
        });

        return () => {
            socket.off('updateEthazium');
        };
    }, [socket, players, setPlayers]);

    useEffect(() => {

        socket.on('updateHeal', (updatedPlayer: Player) => {

            const updatedPlayers = players.map(player =>
                player._id === updatedPlayer._id ? { ...player, ethazium: updatedPlayer.ethazium, epicWeakness: updatedPlayer.epicWeakness,  
                                                    putridPlague: updatedPlayer.putridPlague, medularApocalypse: updatedPlayer.medularApocalypse,
                                                    attributes: updatedPlayer.attributes } : player
            );

            setPlayers(updatedPlayers);

            if(player?._id === updatedPlayer._id){
                setPlayer(updatedPlayer);
            }
        });

        return () => {
            socket.off('updateHeal');
        };
    }, [socket, players, setPlayers]);

    useEffect(() => {

        socket.on('changeResistence', (updatedPlayer: Player) => {

            const updatedPlayers = players.map(player =>
                player._id === updatedPlayer._id ? { ...player, attributes: updatedPlayer.attributes} : player
            );

            setPlayers(updatedPlayers);

            if(player?._id === updatedPlayer._id){
                setPlayer(updatedPlayer);
            }
        });

        return () => {
            socket.off('changeResistence');
        };
    }, [socket, players, setPlayers]);

    useEffect(() => {
        socket.on('IsBetrayer', (updatedPlayer: Player) => {

            const updatedPlayers = players.map(player =>
                player._id === updatedPlayer._id ? { ...player, isBetrayer: updatedPlayer.isBetrayer} : player
            );

            setPlayers(updatedPlayers);

            if(player?._id === updatedPlayer._id){
                setPlayer(updatedPlayer);
            }

        });

        return () => {
            socket.off('IsBetrayer');
        };
    }, [socket, player, setPlayer]);

    return (
        <>
            {userRole === 'ACOLYTE' ? (
                <AcolyteScreens />
            ) : userRole === 'MORTIMER' ? (
                <MortimerScreens />
            ) : userRole === 'ISTVAN' ? (
                <IstvanScreens />
            ) : userRole === 'VILLAIN' ? (
                <VillainScreens />
            ) :
                <Text>No role assigned</Text>}
        </>
    );
}

export default MainScreens;