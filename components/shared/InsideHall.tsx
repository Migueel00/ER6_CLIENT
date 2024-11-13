import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';

const insideHall = require('./../../assets/backgrounds/insideHall.png');
const { height, width } = Dimensions.get('window');

interface updateHall {
    playerId: string;
    isInsideHall: boolean;
}

const InsideHall = () => {

    const appContext = useContext(AppContext);
    const [insideHallBackgroundImage, setLabBackgroundImage] = useState(insideHall);
    const socket = appContext?.socket;
    const player = appContext?.player;
    const players = useContext(AppContext)?.players!;
    const setPlayers = useContext(AppContext)?.setPlayers;
    const [activePlayers, setActivePlayers] = useState(players.filter(player => player.isInsideHall));

    useEffect(() => {

        console.log("EN EL USEFFECT DE INSIDEHALL");
        
        // Escuchar el evento
        socket.on('updateHall', ({ playerId, isInsideHall }: updateHall) => {
            console.log("ASÑLIDFJLKAÑSDJFLKÑASJDÑLFJAÑSDLKFJAÑLSDFJÑLAKSDJFÑLASDJFLÑAJSDÑLKFJSAÑDLF ");
            const updatePlayers = players.map(player =>
                player.id === playerId ? { ...player, isInsideHall } : player
            );
            
            console.log(updatePlayers);
            setPlayers(updatePlayers);

            console.log("PLAYER ID" + playerId);
            console.log("IS INSIDE HALL " + isInsideHall);
            console.log("ENTRA AL EVENTO DE UPDATE");

            const newActivePlayers = updatePlayers.filter(player => player.isInsideHall);
            setActivePlayers(newActivePlayers);
            
            console.log("New active players: ");
            console.log(newActivePlayers);

        });

        // Limpiar el evento socket
        return () => {
            socket.off('updateHall');
        };
    }, [socket, players, setPlayers, player]);


    return (
        <InsideHallBackground source={insideHallBackgroundImage} width={width} height={height}>
        {/* Other components can go here */}
        </InsideHallBackground>
    );
};
const InsideHallBackground = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: ${width}px;
    height: ${height}px;
`;
const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 20px;
`;

const PermissionButton = styled(TouchableOpacity)`
    padding: 10px;
    border-radius: 5px;
`;

const ButtonImageBackground = styled.ImageBackground`
    justify-content: center;
    align-items: center;
    width: 315px;
    height: 80px;
`;

const KaotikaButton = styled.Text`
    background-color: transparent;
    font-family: 'KochAltschrift';
    font-size: 30px;
`;

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
`;

const KaotikaFont = styled.Text`
    padding-top: 20px;
    font-family: 'KochAltschrift';
    font-size: 40px;
    color: white;
`;

export default InsideHall;
