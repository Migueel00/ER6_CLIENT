import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface ModalComponentProps {
    visible: boolean;
    onClose: () => void;
}

const MortimerValidatingModal: React.FC<ModalComponentProps> = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <ModalBackground>
                <ModalContainer>
                    <ModalText>Hello Mortimer!</ModalText>
                    <CloseButton onPress={onClose}>
                        <CloseButtonText>Close</CloseButtonText>
                    </CloseButton>
                </ModalContainer>
            </ModalBackground>
        </Modal>
    );
};

export default MortimerValidatingModal;

// Estilos con styled-components
const ModalBackground = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
    width: 80%;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    align-items: center;
    shadow-color: #000;
    shadow-offset: { width: 0, height: 2 };
    shadow-opacity: 0.5;
    shadow-radius: 4px;
    elevation: 5;
`;

const ModalText = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
    color: black;
`;

const CloseButton = styled(TouchableOpacity)`
    background-color: #2196f3;
    padding: 10px;
    border-radius: 5px;
`;

const CloseButtonText = styled.Text`
    color: white;
    font-size: 16px;
`;
