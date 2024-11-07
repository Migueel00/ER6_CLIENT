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
const parchmentText = "This scroll contains the story of the legendary epic armor: a golden artifact necessary to access the Spectral Tomb, the place where the four horsemen reside." + 
"The armor was lost in the 2nd Era, but manuals detailing how it was forged still remain. Each of the pieces required for its construction rests within a tomb in the Obituary. The problem is that the entrance remains sealed by the rosette of the four arcane artifacts necessary to unlock it." + 
"The artifacts were lost throughout the swamp, but little more is known. The only available material is an old manuscript with a map of the area; however, apart from some strange symbols, it lacks any relevant details. No one has been able to understand their meaning, but they might indicate the whereabouts of each artifact.";

const PotionModal : React.FC<PotionModal> = ({visible, onClose, createdPotion}) => {

    return (
        <Modal 
            visible = {visible}
            transparent = {true}
            animationType = "fade"
            onRequestClose = {onClose}>
            <ModalContainer>
                {/* Imagen de fondo */}
                {createdPotion?.name === "Potion of Purification" ? (
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
                    <ParchmentImageBackground source={cleansedParchmentImage}>
                        <ParchmentCleansedMessage>
                            Parchment Cleansed
                        </ParchmentCleansedMessage>


                        <ParchmentMessage>
                            {parchmentText}
                        </ParchmentMessage>

                        <CloseButton2 onPress={onClose}>
                            <CloseButtonText2>ADD TO INVENTORY</CloseButtonText2>
                        </CloseButton2>
                    </ParchmentImageBackground>
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

const ParchmentImageBackground = styled.ImageBackground` 
    width: 100%;
    height: 92%;
    align-items: center;
    justify-content: space-between;
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

const ParchmentCleansedMessage = styled.Text`
    position: relative;
    color: #ffffff;
    font-size: ${width * 0.13}px;
    font-family: 'KochAltschrift';
    text-align: center;
    top: ${-height*0.05}px;
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

const ParchmentMessage = styled.Text`
    position: relative;
    top: ${width * 0.03}px; /* Alinea el texto en la parte superior de la imagen */
    color: #ffffff;
    font-size: ${width * 0.07}px;
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

const CloseButton2 = styled.TouchableOpacity`
    position: relative;
    padding:${height * 0.01}px;
    background-color: #800000;
    border-radius: ${width * 0.01}px;
    align-items: center;
    bottom: ${height * 0.03}px;
`;

const CloseButtonText2 = styled.Text`
    color: #ffffff;
    font-size: ${width * 0.05}px;
    font-family: 'KochAltschrift';
`;

export default PotionModal;