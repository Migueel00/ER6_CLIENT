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
                    <ModalText>Validating artifact search...</ModalText>
                    
                    <GridContainer>
                        <GridRow>
                            <GridItem><GridText>1</GridText></GridItem>
                            <GridItem><GridText>2</GridText></GridItem>
                        </GridRow>
                        <GridRow>
                            <GridItem><GridText>3</GridText></GridItem>
                            <GridItem><GridText>4</GridText></GridItem>
                        </GridRow>
                    </GridContainer>


                    <BottomButtonContainer>
                        <CloseButtonBottomLeft onPress={onClose}>
                            <CloseButtonText>Validate Search</CloseButtonText>
                        </CloseButtonBottomLeft>
                        <CloseButtonBottomRight onPress={onClose}>
                            <CloseButtonText>Reset Search</CloseButtonText>
                        </CloseButtonBottomRight>
                    </BottomButtonContainer>

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
    font-size: ${width * 0.09}px;
    margin-bottom: ${width * 0.03}px;
    margin-top: ${height * 0.03}px;
    top: ${height * 0.06}px;
    text-align: center;
    color: white;
    font-family: 'KochAltschrift';
`;

const BottomButtonContainer = styled.View`
    position: absolute;
    bottom: ${width * 0.05}px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 ${width * 0.05}px;
`;

const CloseButtonBottomLeft = styled(TouchableOpacity)`
    background-color: green;
    padding: ${width * 0.03}px;
    border-radius: ${width * 0.02}px;
`;

const CloseButtonBottomRight = styled(TouchableOpacity)`
    background-color: red;
    padding: ${width * 0.03}px;
    border-radius: ${width * 0.02}px;
`;

const CloseButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.08}px;
    font-family: 'KochAltschrift';
    text-align: center;
`;

const GridContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const GridRow = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: ${width * 0.08}px;
    width: 100%;
`;

const GridItem = styled.View`
    width: ${width*0.4}px;
    aspect-ratio: 1;
    background-color: rgba(0,0,0,0.95);
    justify-content: center;
    align-items: center;
    border-radius: ${width * 0.02}px;
    border-width: ${width * 0.005}px;
    border-color: white;
`;

const GridText = styled.Text`
    font-size: ${width * 0.1}px;
    color: white;
    font-family: 'KochAltschrift';
`;