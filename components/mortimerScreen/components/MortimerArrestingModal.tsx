import React, { useEffect, useContext, useState } from 'react';
import { Dimensions, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info';
import AppContext from '../../../helpers/context';

const { height, width } = Dimensions.get('window');

const isTablet = DeviceInfo.isTablet();
const imageSize = isTablet ? height * 0.22 : height * 0.17;

interface ModalComponentProps {
    visible: boolean;
    onClose: () => void;
}

const MortimerArrestingModal: React.FC<ModalComponentProps> = ({ visible, onClose }) => {
    const appContext = useContext(AppContext);
    const artifacts = appContext?.artifacts;

    const [buttonsOpacity, setButtonsOpacity] = useState<number>(0);

    // if(isTablet){
    //     console.log("ESTAS EN UNA TABLET");

    // } else {
    //     console.log("ESTAS EN UN MOVIL");

    // }

    // Validates the artifacts
    const validateSearch = () => {
        onClose();
    }

    // Validates the artifacts
    const resetSearch = () => {
        onClose();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <ModalBackground>
                <ModalContainer>
                    <BottomButtonContainer style={{ opacity: buttonsOpacity }}>
                        <CloseButtonBottomLeft onPress={validateSearch}>
                            <CloseButtonText>Validate Search</CloseButtonText>
                        </CloseButtonBottomLeft>
                        <CloseButtonBottomRight onPress={resetSearch}>
                            <CloseButtonText>Reset Search</CloseButtonText>
                        </CloseButtonBottomRight>
                    </BottomButtonContainer>
                </ModalContainer>
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

const ModalContainer = styled(Animated.View)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: ${width * 0.05}px;
    padding: ${width * 0.003}px;
    justify-content: space-between;
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

const CloseButtonBottomRight = styled.TouchableOpacity`
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