import React, { useContext } from 'react';
import { Dimensions, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../../helpers/context';

const { width } = Dimensions.get('window');

interface ModalComponentProps {
    visible: boolean;
    onClose: () => void;
}

const MortimerArrestingModal: React.FC<ModalComponentProps> = ({ visible, onClose }) => {

    const appContext = useContext(AppContext);
    const socket = appContext?.socket;
    const players = appContext?.players!;

    const angelo = players?.find(player => player.role === 'ANGELO');

    const handleArrestAngelo = () => {

        const values = {
            playerID: angelo?._id,
            isArrested: angelo?.isArrested,
        };

        socket.emit('UpdateArrested', values)
        onClose();
    };

    const handleFreeAngelo = () => {
        console.log('Reset Search');
        onClose();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <ModalBackground>
                <ButtonsWrapper>
                    <ValidateButton onPress={handleArrestAngelo}>
                        <ValidateButtonText>Arrest Angelo</ValidateButtonText>
                    </ValidateButton>
                    <ResetButton onPress={handleFreeAngelo}>
                        <ResetButtonText>Free Angelo</ResetButtonText>
                    </ResetButton>
                </ButtonsWrapper>
            </ModalBackground>
        </Modal>
    );
};

export default MortimerArrestingModal;

const ModalBackground = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
`;

const ButtonsWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
`;

const ValidateButton = styled(TouchableOpacity)`
    background-color: green;
    padding: ${width * 0.04}px ${width * 0.05}px;
    border-radius: ${width * 0.02}px;
`;

const ValidateButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    text-align: center;
`;

const ResetButton = styled(TouchableOpacity)`
    background-color: red;
    padding: ${width * 0.04}px ${width * 0.05}px;
    border-radius: ${width * 0.02}px;
`;

const ResetButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    text-align: center;
`;