import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, Modal, Vibration, TouchableOpacity } from "react-native";
import AppContext from "../../helpers/context";
import { Player } from "../../interfaces/contextInterface";

const { height, width } = Dimensions.get('window');

const CustomBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
    background-color: black;
    padding: ${height * 0.02}px;
    border-radius: ${width * 0.05}px;
    align-items: center;
    width: 80%;
`;

const ModalText = styled.Text`
    font-size: ${width * 0.08}px;
    color: white;
    font-family: KochAltschrift;
    text-align: center;
    margin-bottom: ${height * 0.02}px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: ${height * 0.01}px;
`;

const RedButton = styled.TouchableOpacity`
    background-color: red;
    padding: 10px 20px;
    border-radius: ${width * 0.02}px;
    margin-right: ${width * 0.1}px;
`;

const GreenButton = styled.TouchableOpacity`
    background-color: green;
    padding: 10px 20px;
    border-radius: ${width * 0.02}px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.08}px;
    text-align: center;
    font-family: KochAltschrift;
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

const background = require('../../assets/backgrounds/inn.png');

const InnScreen = () => {
    const appContext = useContext(AppContext);
    const player = appContext?.player;
    const socket = appContext?.socket;
    const setPlayer = appContext?.setPlayer;
    const players = appContext?.players;

    const [isModalVisible, setModalVisible] = useState(false);
    const [isBetrayer, setIsBetrayer] = useState(player?.isBetrayer);
    const [showAngelo, setShowAngelo] = useState(false);

    const angelo = players?.find(player => player.role === 'ANGELO');

    useEffect(() => {
        socket.on('IsBetrayer', (updatedPlayer: Player) => {

            // Update local isBetrayer
            setIsBetrayer(updatedPlayer.isBetrayer);

            // Set Player to update
            setPlayer({ ...player, isBetrayer: updatedPlayer.isBetrayer });
        });

        return () => {
            socket.off('IsBetrayer');
        };
    }, [socket, player, setPlayer]);

    useEffect(() => {
        if (isBetrayer === false) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
            setShowAngelo(true);
        }
    }, [isBetrayer]);

    const handleBetray = () => {
        setModalVisible(false);
        Vibration.vibrate(200);

        const value = {
            playerID: player?._id,
            isBetrayer: player?.isBetrayer
        };

        socket.emit("UpdateBetrayer", value);
    };

    const handleLoyal = () => {
        setModalVisible(false);
        console.log("Remains Loyal");
    };

    const handleAngeloPress = () => {
        console.log("Angelo clicked!");
        setShowAngelo(false);
        Vibration.vibrate(200);

        const value = {
            playerID: player?._id,
            isBetrayer: player?.isBetrayer
        };

        socket.emit("UpdateCaptured", value)
    };


    return (
        <CustomBackground source={background}>
            <Modal
                transparent
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <ModalContainer>
                    <ModalContent>
                        <ModalText>
                            To the wanderer
                            who dares to defy their bloodline: forsake your kin and pledge your
                            loyalty to the Brotherhood of Shadows. In return, claim 10,000 gold coins
                            and the coveted Rotten Set of the Decrepit Betrayer. Your destiny awaits.
                        </ModalText>
                        <ButtonContainer>
                            <RedButton onPress={handleBetray}>
                                <ButtonText>Betray</ButtonText>
                            </RedButton>
                            <GreenButton onPress={handleLoyal}>
                                <ButtonText>Loyal</ButtonText>
                            </GreenButton>
                        </ButtonContainer>
                    </ModalContent>
                </ModalContainer>
            </Modal>

            {showAngelo && angelo?.avatar && (
                <AvatarWrapper>
                    <TouchableOpacity onPress={handleAngeloPress}>
                        <Avatar source={{ uri: `https://kaotika-server.fly.dev${angelo.avatar}` }} />
                    </TouchableOpacity>
                </AvatarWrapper>
            )}
        </CustomBackground>
    );
}

export default InnScreen;