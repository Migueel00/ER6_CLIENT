import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';

const outsideHallImage = require('./../../assets/backgrounds/outsideHall.png');
const { height, width } = Dimensions.get('window');

const OutsideHall = () => {
    const appContext = useContext(AppContext);
    const [outsideHallBackgroundImage, setOutsideHallBackgroundImage] = useState(outsideHallImage);
    const socket = appContext?.socket;
    const player = appContext?.player;
    
    const values = {
        socketId: appContext?.socketID,
        playerID: appContext?.player._id,
        isInsideHall: player?.isInsideHall,
    };


    const handleEnterHall = () => {
        console.log("ENTERING HALL");
        console.log("ACTUAL IS INSIDE HALL STATE:");
        console.log(player?.isInsideHall);

        const values = {
            socketId: appContext?.socketID,
            playerID: appContext?.player._id,
            isInsideHall: player?.isInsideHall,
        };

        socket.emit("HallDoorPressed", values);
    };

    return (
        <OutsideHallBackground source={outsideHallBackgroundImage}>
            <StyledButton onPress={handleEnterHall}>
            </StyledButton>
        </OutsideHallBackground>
    );
};

const OutsideHallBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const StyledButton = styled(TouchableOpacity)`
    backgroundColor: 'rgba(0, 0, 0, 0.3)';
    margin-top: ${height * -0.10}px;
    height: ${height * 0.5}px;
    width: ${width * 1}px;
    align-items: 'center';
    border-radius: ${width * 1}px;
`;


export default OutsideHall;