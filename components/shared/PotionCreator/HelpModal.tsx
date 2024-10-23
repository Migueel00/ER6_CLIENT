import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

interface HelpModalProps {
    visible: boolean;
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ visible, onClose }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <ModalContainer>
                <ModalContent>
                    <TitleModal>INSTRUCTIONS</TitleModal>
                    
                    {/* Main Section Container */}
                    <SectionContainer>
                        {/* Sección superior: ELIXIR y ESSENCE */}
                        <Section>
                            <Column>
                                <ModalSectionTitle>ELIXIR</ModalSectionTitle>
                                <SectionText>Ingredients that "Boost", "Calm" or "Frenzy" the SAME attribute.</SectionText>
                            </Column>
                            <Column>
                                <ModalSectionTitle>ESSENCE</ModalSectionTitle>
                                <SectionText>Ingredients that INCREASE "Hit Points".</SectionText>
                            </Column>
                        </Section>

                        {/* Sección inferior: ANTIDOTE */}
                        <Section>
                            <SingleColumn>
                                <ModalSectionTitle>ANTIDOTE</ModalSectionTitle>
                                <SectionText>Antidotes have their own recipe which are combinations of RESTORE effects. Refer to the recipe book for more information.</SectionText>
                            </SingleColumn>
                        </Section>
                    </SectionContainer>

                    <CloseButton onPress={onClose}>
                        <CloseButtonText>Close</CloseButtonText>
                    </CloseButton>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
};

// STYLED COMPONENTS

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.View`
    background-color: rgba(0,0,0,0.85);
    width: 95%;
    height: 90%;
    padding: 20px;
    border-radius: 20px;
    align-items: center;
`;

const TitleModal = styled.Text`
    font-size: ${width * 0.1}px;
    color: white;
    font-family: 'KochAltschrift';
    text-decoration: underline;
`;

/* New SectionContainer for both sections */
const SectionContainer = styled.View`
    width: 100%;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    margin-top: ${height * 0.1}px;
`;

const Section = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: ${height * 0.1}px;
`;

const Column = styled.View`
    width: 45%;
    align-items: center;
`;

const SingleColumn = styled.View`
    width: 100%;
    align-items: center;
`;

const ModalSectionTitle = styled.Text`
    font-size: ${width * 0.08}px;
    margin-bottom: 10px;
    color: white;
    font-family: 'KochAltschrift';
    font-weigth: 500;
    text-decoration: underline;
    color: #C19A6B;
`;

const SectionText = styled.Text`
    font-size: ${width * 0.06}px;
    color: white;
    flex-wrap: wrap;
    align-content: center;
    text-align: center;    
    text-justify: inter-word;
    font-family: 'KochAltschrift';
`;

const CloseButton = styled.TouchableOpacity`
    background-color: #C19A6B;
    padding: 10px 20px;
    border-radius: 5px;
`;

const CloseButtonText = styled.Text`
    font-size: ${width * 0.07}px;
    color: white;
    font-family: 'KochAltschrift';
`;

export default HelpModal;
