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
            animationType="slide"
            onRequestClose={onClose}
        >
            <ModalContainer>
                <ModalContent>
                    <Title>INSTRUCTIONS</Title>
                    
                    {/* Sección superior: ELIXIR y ESSENCE */}
                    <Section>
                        <Column>
                            <SectionTitle>ELIXIR</SectionTitle>
                            <SectionText>Elixir</SectionText>
                        </Column>
                        <Column>
                            <SectionTitle>ESSENCE</SectionTitle>
                            <SectionText>Essence</SectionText>
                        </Column>
                    </Section>

                    {/* Sección inferior: ANTIDOTE */}
                    <Section>
                        <SingleColumn>
                            <SectionTitle>ANTIDOTE</SectionTitle>
                            <SectionText>Antidote</SectionText>
                        </SingleColumn>
                    </Section>

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
    background-color: #fff;
    width: 80%;
    padding: 20px;
    border-radius: 10px;
    align-items: center;
`;

const Title = styled.Text`
    font-size: ${width * 0.08}px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Section = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Column = styled.View`
    width: 45%;
    align-items: center;
`;

const SingleColumn = styled.View`
    width: 100%;
    align-items: center;
`;

const SectionTitle = styled.Text`
    font-size: ${width * 0.06}px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const SectionText = styled.Text`
    font-size: ${width * 0.05}px;
    color: #555;
`;

const CloseButton = styled.TouchableOpacity`
    background-color: #C19A6B;
    padding: 10px 20px;
    border-radius: 5px;
`;

const CloseButtonText = styled.Text`
    font-size: ${width * 0.05}px;
    color: white;
`;

export default HelpModal;
