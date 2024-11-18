import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';
import AcolyteContext from '../../helpers/AcolyteContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const outsideHallImage = require('./../../assets/backgrounds/outsideHall.png');
const { height, width } = Dimensions.get('window');

const OutsideHall = () => {
    const appContext = useContext(AppContext);
    const [outsideHallBackgroundImage, setOutsideHallBackgroundImage] = useState(outsideHallImage);
    const socket = appContext?.socket;
    const player = appContext?.player;
    const acolyteContext = useContext(AcolyteContext);
    const isMenuOldSchoolLoaded = acolyteContext?.isMenuOldSchoolLoaded;
    const setLocation = appContext?.setLocation;

    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

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

    const handleGoToCorridor = () => {
        console.log("PRESSED SCHOOL BUTTON IN MAP");
        
        setLocation('OLDSCHOOL');
        if(isMenuOldSchoolLoaded){
            console.log("NAVIGATING TO OLDSCHOOL");
            
            navigation.navigate('OLDSCHOOL');
        }
    }   

    return (
        <OutsideHallBackground source={outsideHallBackgroundImage}>
            <HeaderText>Pressed the door to enter to the HALL</HeaderText>
                <StyledButton onPress={handleEnterHall}>
                </StyledButton>
            <StyledCorridorButton onPress={handleGoToCorridor}>
                <StyledButtonText>Go back to the corridor</StyledButtonText>
            </StyledCorridorButton>
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
    backgroundColor: 'rgba(0, 0, 0, 0)';
    margin-top: ${height * -0.10}px;
    height: ${width * 0.7}px;
    width: ${width * 0.7}px;
    align-items: 'center';
    border-radius: ${width * 1}px;
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

const HeaderText = styled.Text`
    color: white;
    font-size: ${width * 0.1}px;
    font-family: 'KochAltschrift';
    position: absolute;
    top: ${height * 0.08}px;
    text-align: center;
`;


export default OutsideHall;