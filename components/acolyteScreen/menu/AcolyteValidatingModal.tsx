import React, { useEffect, useContext, useState } from 'react';
import { Dimensions, Modal, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components/native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle, withRepeat, ReduceMotion, runOnJS } from 'react-native-reanimated'; 
import DeviceInfo from 'react-native-device-info';
import AppContext from '../../../helpers/context';
import { updateArtifact } from '../../../src/API/artifacts';

const { height, width } = Dimensions.get('window');

const isTablet = DeviceInfo.isTablet();

const imageSize = isTablet ? height * 0.22 : height*0.17;

interface ModalComponentProps {
    visible: boolean;
    onClose: () => void;
}

const AcolyteValidatingModal: React.FC<ModalComponentProps> = ({ visible, onClose }) => {
    const appContext = useContext(AppContext);
    const artifacts = appContext?.artifacts;

    const [validatingText, setValidatingText] = useState<string>('Waiting for validation');
    const [dots, setDots] = useState<string>('');

    useEffect(() => {
        if (validatingText === 'Waiting for validation') {
            const interval = setInterval(() => {
                setDots((prevDots) => {
                    if (prevDots === '...') return '';
                    return prevDots + '.';
                });
            }, 300); // Cambiar cada 300ms
            return () => clearInterval(interval); // Limpiar intervalo al desmontar
        }
    }, [validatingText]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <ModalBackground>

                    <ModalContainer>
                        <ModalText>
                                {validatingText}
                                <TextWrapper>{dots}</TextWrapper>
                        </ModalText>


                    </ModalContainer>

            </ModalBackground>
        </Modal>
    );
};

export default AcolyteValidatingModal;

const TextWrapper = styled.Text`
    font-size: ${width * 0.09}px;
    color: white;
    font-family: 'KochAltschrift';
    display: inline-flex; /* Esto asegura que los puntos se mantengan en línea */
`;

const ModalBackground = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled(Animated.View)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: ${width * 0.05}px;
    padding: ${width * 0.003}px;
    justify-content: space-between;
    width: 95%;
    height: 50%;
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

