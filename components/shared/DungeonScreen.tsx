import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { useContext } from "react";
import AppContext from "../../helpers/context";

const { width, height } = Dimensions.get('window');

const CustomBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const CenteredText = styled.Text`
    font-size: 60px;
    color: white;
    font-weight: bold;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const background = require('../../assets/backgrounds/Dungeon.png');

const DungeonScreen = () => {
    const appContext = useContext(AppContext);
    const player = appContext?.player;

    return (
        <CustomBackground source={background}>
            <CenteredText>THE OLD SCHOOL DUNGEON</CenteredText>
        </CustomBackground>
    );
}

export default DungeonScreen;
