import React from 'react';
import { Dimensions, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const { height, width } = Dimensions.get('window');

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

const ModalBackground = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.View`
    width: 95%;
    height: 90%;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: ${width * 0.05}px;
    padding: ${width * 0.003}px;
    align-items: center;
`;

const ModalText = styled.Text`
    font-size: ${width * 0.08}px;
    margin-bottom: ${width * 0.03}px;
    margin-top: ${width * 0.03}px;
    text-align: center;
    color: white;
    font-family: 'KochAltschrift';
`;

const CloseButton = styled(TouchableOpacity)`
    background-color: #2196f3;
    padding: ${width * 0.02}px;
    border-radius: 5px;
`;

const CloseButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.08}px;
    font-family: 'KochAltschrift';
`;
