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
    const player = appContext?.player!;
    const socket = appContext?.socket;
    const players = appContext?.players;

    useEffect(() => {
        if (players) {
            players.map(player => console.log(player.nickname));
        }
    }, [players]);

    const handleExitHall = () => {
        console.log("EXITING HALL");
        console.log("ACTUAL IS INSIDE HALL STATE:");
        console.log(player.isInsideHall);

        const values = {
            socketId: appContext?.socketID,
            playerID: appContext?.player._id,
            isInsideHall: player?.isInsideHall,
        };

        socket.emit("HallDoorPressed", values);
    };


    return (
        <InsideHallBackground source={insideHallBackgroundImage} width={width} height={height}>
            <PlayerRow>
                    <AvatarWrapper>
                        <Avatar source={{ uri: player.avatar }} />
                    </AvatarWrapper>
            </PlayerRow>

            <StyledButton onPress={handleExitHall}>
                <StyledButtonText>Exit from the Hall</StyledButtonText>
            </StyledButton>
        </InsideHallBackground>
    );
};

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
const PlayerRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
`;

const AvatarWrapper = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    border-width: 2px;
    border-color: white;
    overflow: hidden;
    margin: 0 10px;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 40px;
`;

export default InsideHall;
