import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, Modal } from "react-native";
import AppContext from "../../helpers/context";

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
    background-color: white;
    padding: ${height * 0.02}px;
    border-radius: ${width * 0.05}px;
    align-items: center;
    width: 80%;
`;

const ModalText = styled.Text`
    font-size: 25px;
    color: black;
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
    font-size: 24px;
    text-align: center;
    font-family: KochAltschrift;
`;

const background = require('../../assets/backgrounds/inn.png');

const InnScreen = () => {
    const appContext = useContext(AppContext);
    const player = appContext?.player;
    const socket = appContext?.socket;

    const [isModalVisible, setModalVisible] = useState(!player?.isBetrayer);

    useEffect(() => {
        if (!player?.isBetrayer) {
            setModalVisible(true);
        }
    }, []);

    const handleBetray = () => {
        setModalVisible(false);

        const value = {
            playerID: appContext?.player._id,
            isBetrayer: appContext?.player.isBetrayer
        };
        
        socket.emit("UpdateBetrayer", value);
    };

    const handleLoyal = () => {
        setModalVisible(false);
        console.log("Remains Loyal");
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
        </CustomBackground>
    );
}

export default InnScreen;