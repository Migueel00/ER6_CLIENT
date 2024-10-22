import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

interface RecipeModalProps {
    visible: boolean;
    onClose: () => void;
    curses: any;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ visible, onClose, curses }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <ModalContainer>
                <ModalContent>
                    <TitleModal>RECIPE BOOK</TitleModal>
                

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
    justify-content: flex-start;
`;

const TitleModal = styled.Text`
    font-size: ${width * 0.1}px;
    color: white;
    font-family: 'KochAltschrift';
    text-decoration: underline;
`;


const CloseButton = styled.TouchableOpacity`
    background-color: #C19A6B;
    padding: 10px 20px;
    border-radius: 5px;
`;

const CloseButtonText = styled.Text`
    font-size: ${width * 0.05}px;
    color: white;
    font-family: 'KochAltschrift';
`;

export default RecipeModal;
