import React from "react";
import { Dimensions, Modal, Text} from "react-native";
import styled from "styled-components/native";
import Potion from "../../../potions/potion";

interface PotionModal {
    visible: boolean;
    createdPotion?: Potion | null;
    onClose: () => void;
}

const { width, height } = Dimensions.get('window');
const backgroundImage = require('./../../../../assets/png/darkModal.png');
const createdPotionImage = require('./../../../../assets/png/createdPotion.png');
const cleansedParchmentImage = require('./../../../../assets/png/cleanParchment.png');

const PotionModal : React.FC<PotionModal> = ({visible, onClose, createdPotion}) => {

    return (
        <Modal 
            visible = {visible}
            transparent = {true}
            animationType = "fade"
            onRequestClose = {onClose}>
            <ModalContainer>
                {/* Imagen de fondo */}
                {createdPotion?.name !== "Potion of Purification" ? (
                    <PotionImageBackground source={backgroundImage}>
                        <PotionCreatedMessage>
                            Potion Created
                        </PotionCreatedMessage>

                        <CenteredPotionImage source={createdPotionImage} />

                        <PotionMessage>
                            {createdPotion?.name}
                        </PotionMessage>

                        <CloseButton onPress={onClose}>
                            <CloseButtonText>ADD TO INVENTORY</CloseButtonText>
                        </CloseButton>
                    </PotionImageBackground>
                ) : (
                    <PotionImageBackground source={backgroundImage}>
                        <PotionCreatedMessage>
                            Parchment Cleansed
                        </PotionCreatedMessage>

                        <CenteredPotionImage source={cleansedParchmentImage} />

                        <PotionMessage>
                            {createdPotion?.name}
                        </PotionMessage>

                        <CloseButton onPress={onClose}>
                            <CloseButtonText>ADD TO INVENTORY</CloseButtonText>
                        </CloseButton>
                    </PotionImageBackground>
                )}
            </ModalContainer>

        </Modal>
    );
}

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
`;

const PotionImageBackground = styled.ImageBackground` 
    width: 100%;
    height: 80%;
    align-items: center;
    position: relative;
    margin-top: ${height*0.05}px;  
    top: ${height * 0.03}px;
`;

const PotionCreatedMessage = styled.Text`
    position: relative;
    color: #ffffff;
    font-size: ${width * 0.13}px;
    font-family: 'KochAltschrift';
    text-align: center;
    top: ${height*0.02}px;
`;

const CenteredPotionImage = styled.Image`
    width: ${width * 0.75}px;
    height: ${width * 0.75}px;
    position: relative;
    resize-mode: contain;
    margin-top: ${height * 0.04}px;
`;

const PotionMessage = styled.Text`
    position: relative;
    top: ${width * 0.03}px; /* Alinea el texto en la parte superior de la imagen */
    color: #ffffff;
    font-size: ${width * 0.09}px;
    font-family: 'KochAltschrift';
    text-align: center;
`;

const CloseButton = styled.TouchableOpacity`
    padding:${height * 0.01}px;
    background-color: #800000;
    border-radius: ${width * 0.01}px;
    align-items: center;
    bottom: ${height * -0.1}px;
`;

const CloseButtonText = styled.Text`
    color: #ffffff;
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
`;

export default PotionModal;