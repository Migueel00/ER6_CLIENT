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
    const players = appContext?.players;

    return (
        <InsideHallBackground source={insideHallBackgroundImage} width={width} height={height}>
            <PlayerRow>
                    <AvatarWrapper>
                        <Avatar source={{ uri: player.avatar }} />
                    </AvatarWrapper>
            </PlayerRow>
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
