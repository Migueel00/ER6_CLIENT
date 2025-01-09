import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { useContext } from "react";
import AppContext from "../../helpers/context";
import PotionCreator from "./PotionCreator/PotionCreator";

const { width, height } = Dimensions.get('window');


const CustomBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const background = require('../../assets/backgrounds/hollow.png');

const HollowScreen = () => {

    const appContext = useContext(AppContext);
    const player = appContext?.player;

    return (

        <CustomBackground source={background}>
            {player?.isBetrayer && <PotionCreator />}
        </CustomBackground>

    )
}

export default HollowScreen;
