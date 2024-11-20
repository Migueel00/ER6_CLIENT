import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';
import MortimerValidatingModal from '../mortimerScreen/components/MortimerValidatingModal';

const insideHall = require('./../../assets/backgrounds/insideHall.png');
const watchingEyes = require('./../../assets/png/watchingEyes.png');
const { height, width } = Dimensions.get('window');

const InsideHall = () => {

    const appContext = useContext(AppContext);
    const player = appContext?.player!;
    const socket = appContext?.socket;
    const players = appContext?.players!;
    const isValidating = appContext?.isValidating;
    const [isModalVisible, setModalVisible] = useState(false);
    

    useEffect(() => {
        if (players) {
            players.map(player => console.log(player.nickname));
        }
    }, [players]);

    useEffect(() => {
        if (isValidating && player.role === 'MORTIMER') {
            setModalVisible(true);
        }
    }, [isValidating]);

    const handleCloseModal = () => setModalVisible(false);

    const handleExitHall = () => {
        console.log("EXITING HALL");
        console.log(player.isInsideHall);

        const values = {
            socketId: appContext?.socketID,
            playerID: appContext?.player._id,
            isInsideHall: player?.isInsideHall,
        };

        socket.emit("HallDoorPressed", values);
    };

    return (
        <InsideHallBackground source={insideHall}>

            <MortimerValidatingModal visible={isModalVisible} onClose={handleCloseModal}/>

            <ContainerTopLeft>
                {players
                    .filter(player => player.isInsideHall && player.role === 'MORTIMER')
                    .map(player => (
                        <AvatarWrapper key={player._id}>
                            <Avatar source={{ uri: player.avatar }} />
                        </AvatarWrapper>
                    ))
                }
            </ContainerTopLeft>

            <ContainerTopRight>
                {player.role !== 'MORTIMER' && player.role !== 'VILLAIN' && (
                    <WatchingText>Someone might be watching...</WatchingText>
                )}

                {player.role === 'MORTIMER' || player.role === 'VILLAIN' ? (
                    players
                        .filter(player => player.isInsideHall && player.role === 'VILLAIN')
                        .map(player => (
                            <AvatarWrapper key={player._id}>
                                <Avatar source={{ uri: player.avatar }} />
                            </AvatarWrapper>
                        ))
                ) : (
                    <AvatarWrapper>
                        <Avatar source={watchingEyes} />
                    </AvatarWrapper>
                )}
            </ContainerTopRight>

            <ContainerBottom>
                {players
                    .filter(player => player.isInsideHall && player.role === 'ACOLYTE'
                    )
                    .map(p => (
                        <AvatarWrapper key={p._id}>
                            <Avatar source={{ uri: p.avatar }} />
                        </AvatarWrapper>
                    ))
                }
            </ContainerBottom>

            <StyledButton onPress={handleExitHall}>
                <StyledButtonText>Exit from the Hall</StyledButtonText>
            </StyledButton>
        </InsideHallBackground>
    );    
};

// Estilo del texto "Someone might be watching..."
const WatchingText = styled.Text`
    color: red;
    font-size: ${width * 0.05}px;
    font-family: 'KochAltschrift';
    position: absolute;
    bottom: ${height * 0.11}px;
    right: ${width * -0.04}px;
    text-align: center;
`;

const StyledButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    padding: 10px;
`;

const StyledButton = styled(TouchableOpacity)`
    backgroundColor: 'rgba(0, 0, 0, 0.8)';
    height: ${height * 0.1}px;
    width: ${width * 0.5}px;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: ${width * 0.4}px;
    bottom: ${height * 0.05}px;
`;

const InsideHallBackground = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: ${width}px;
    height: ${height}px;
`;

const AvatarWrapper = styled.View`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: ${width * 0.5}px;
    border-width: ${width * 0.004}px;
    border-color: white;
    overflow: hidden;
    margin: 0 ${width * 0.05}px;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: ${width * 0.4}px;
`;

// Estilos de contenedores
const ContainerTopLeft = styled.View`
    position: absolute;
    top: ${height * 0.1}px;
    left: ${width * 0.1}px;
    flex-direction: row;
`;

const ContainerTopRight = styled.View`
    position: absolute;
    top: ${height * 0.1}px;
    right: ${width * 0.1}px;
    flex-direction: row;
`;

const ContainerBottom = styled.View`
    position: absolute;
    bottom: ${height * 0.3}px; /* Espacio para el botón */
    align-self: center;
    flex-direction: row;
`;

export default InsideHall;
