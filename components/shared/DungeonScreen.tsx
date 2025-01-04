import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, TouchableOpacity } from "react-native";
import { useContext } from "react";
import AppContext from "../../helpers/context";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

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
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
    font-family: 'KochAltschrift';
`;

const StyledButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    padding: 10px;
`;

const StyledCorridorButton = styled(TouchableOpacity)`
    backgroundColor: 'rgba(0, 0, 0, 0.8)';
    height: ${height * 0.1}px;
    width: ${width * 0.65}px;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: ${width * 0.4}px;
    bottom: ${height * 0.03}px;
`;

const AvatarWrapper = styled.View`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: ${width * 0.5}px;
    border-width: ${width * 0.004}px;
    border-color: white;
    overflow: hidden;
    position: absolute;
    top: ${height * 0.3}px;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: ${width * 0.5}px;
`;

const background = require('../../assets/backgrounds/dungeon.png');

const DungeonScreen = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const appContext = useContext(AppContext);
    const players = appContext?.players;
    const setLocation = appContext?.setLocation;

    const angelo = players?.find(player => player.role === 'ANGELO');
    const [showAngelo, setShowAngelo] = useState(false);

    useEffect(() => {
        if (angelo?.isArrested) {
            setShowAngelo(true);
        } else {
            setShowAngelo(false);
        }
    }, [angelo]);

    const handleGoToCorridor = () => {
        console.log("PRESSED SCHOOL BUTTON IN DUNGEON");

        setLocation('OLDSCHOOL');
        navigation.navigate('OLDSCHOOL');
    };

    const handleAngeloPress = () => {
        console.log("Angelo clicked!");
        setShowAngelo(false);
    };

    return (
        <CustomBackground source={background}>

            <StyledCorridorButton onPress={handleGoToCorridor}>
                <StyledButtonText>Go back to the corridor</StyledButtonText>
            </StyledCorridorButton>

            {showAngelo && angelo?.avatar && (
                <AvatarWrapper>
                    <TouchableOpacity onPress={handleAngeloPress}>
                        <Avatar source={{ uri: `https://kaotika-server.fly.dev${angelo.avatar}` }} />
                    </TouchableOpacity>
                </AvatarWrapper>
            )}
        </CustomBackground>
    );
};

export default DungeonScreen;