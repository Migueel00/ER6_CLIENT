import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Modal, View, Text, Button } from "react-native";
import { Dimensions } from "react-native";
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

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    align-items: center;
    width: 80%;
`;

const background = require('../../assets/backgrounds/inn.png');

const InnScreen = () => {
    const appContext = useContext(AppContext);
    const player = appContext?.player;

    const [isModalVisible, setModalVisible] = useState(!player?.isBetrayer);

    useEffect(() => {
        if (!player?.isBetrayer) {
            setModalVisible(true);
        }
    }, []);

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
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>Hola</Text>
                        <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                    </ModalContent>
                </ModalContainer>
            </Modal>
        </CustomBackground>
    );
}

export default InnScreen;