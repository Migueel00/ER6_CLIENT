import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import AppContext from "../../helpers/context";
import * as Progress from 'react-native-progress';
import { Player } from "../../interfaces/contextInterface";



const { width, height } = Dimensions.get('screen');

const RestScreen = () => {
    const appContext = useContext(AppContext);
    const player = appContext?.player;
    const socket = appContext?.socket;
    const setPlayer = appContext?.setPlayer;

    const progress = player?.attributes.resistence! / 100;

    useEffect(() => {
        socket.on('changeResistence' , (value : Player) => {
            console.log("VALUE CHANGE RESISTENCE: ");
            console.log(value);


            setPlayer(value);

        });
    }, []);

    const handleRestButton = async() => {

        const values = {
            playerID: player?._id,
            resistence: 100

        }

        socket.emit('rest', values);        
    }


    return (
        <Container>
            <ProfileText fontSize={width * 0.1}>Resistence</ProfileText>
            <Progress.Bar
                progress={progress}
                width={width * 0.8}
                color="#C19A6B"
            />
            <RestButtons 
                onPress={handleRestButton}
            >
                <ProfileText fontSize={width * 0.05}> Rest</ProfileText>
            </RestButtons>
        </Container>
    )
}

const Container = styled.View`
    width: ${width}px;
    height: ${height}px;
    background-color: black;
    display: flex;
    z-index: -1;
    padding: ${width * 0.01}px;
    align-items: center;
`

const ProfileText = styled.Text<{ fontSize: number }>`
    color: white;
    font-family: 'KochAltschrift';
    font-size: ${({ fontSize }) => fontSize}px;
    padding: 5px;
`;

const RestButtons = styled.TouchableOpacity`
    background-color: orange;
    width: ${width * 0.4}px;
    height: ${width * 0.1}px;
    border-radius: ${width * 0.2}px;
    margin-top: ${width * 0.05}px;
    display: flex;
    align-items: center;
`


export default RestScreen;