import React, { useEffect, useContext, useState } from 'react';
import { Dimensions, Modal, TouchableOpacity, Image, Animated} from 'react-native';
import styled from 'styled-components/native';
import DeviceInfo from 'react-native-device-info';
import AppContext from '../../../helpers/context';
import funFacts from './InterestingFacts';

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
    const isValidating = appContext?.isValidating;

    const [validatingText, setValidatingText] = useState<string>('Waiting for validation');
    const [dots, setDots] = useState<string>('');
    const [currentFunFact, setCurrentFunFact] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1)); // Controla el fade

    const changeFunFact = (direction: 'next' | 'prev') => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setCurrentFunFact((prev) => {
                if (direction === 'next') {
                    return (prev + 1) % funFacts.length;
                } else {
                    return (prev - 1 + funFacts.length) % funFacts.length;
                }
            });
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Animación de fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                // Cambiar al siguiente fun fact después del fade out
                setCurrentFunFact((prev) => (prev + 1) % funFacts.length);

                // Animación de fade in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
        }, 8000); //Change every 10 seconds

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [fadeAnim]);

    const funFact = funFacts[currentFunFact];
    

    useEffect(() => {
        if (validatingText === 'Waiting for validation') {
            const interval = setInterval(() => {
                setDots((prevDots) => {
                    if (prevDots === '...') return '';
                    return prevDots + '.';
                });
            }, 500); // Cambiar cada 300ms
            return () => clearInterval(interval); // Limpiar intervalo al desmontar
        }
    }, [validatingText]);

    if(!isValidating){
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
                        <ModalText>
                                {validatingText}
                                <DotsWrapper>
                                    <TextWrapper>{dots}</TextWrapper>
                                </DotsWrapper>
                        </ModalText>

                        <Header>FUN FACTS ABOUT KAOTIKA</Header>
                        
                        <InterestingFactsContainer> 
                            <AnimatedFunFactContainer style={{ opacity: fadeAnim }}>
                                <FunFactImage source={{ uri: funFact.image }} />
                                <FunFactTextsContainer>
                                    <FunFactTitle>{funFact.title}</FunFactTitle>
                                    <FunFactDescription>{funFact.description}</FunFactDescription>
                                </FunFactTextsContainer>
                            </AnimatedFunFactContainer>
                        </InterestingFactsContainer>

                        <ButtonsContainer>
                            <NavButton onPress={() => changeFunFact('prev')}>
                                <NavButtonText>Previous</NavButtonText>
                            </NavButton>
                            <NavButton onPress={() => changeFunFact('next')}>
                                <NavButtonText>Next</NavButtonText>
                            </NavButton>
                        </ButtonsContainer>

                    </ModalContainer>

            </ModalBackground>
        </Modal>
    );
};

export default AcolyteValidatingModal;

const DotsWrapper = styled.View`
    display: inline-flex;
    width: ${width * 0.09 * 3}px; /* Espacio suficiente para 3 puntos */
    height: ${width * 0.09}px; /* Asegura que el alto sea consistente */
    overflow: hidden; 
`;

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

const ModalContainer = styled.View`
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
    align-items: center;
    justify-content: center;
    left: ${width * 0.11}px;
`;


const Header = styled.Text`
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    color: orange;
    text-align: center;
    margin-top: ${height * 0.02}px;
    position: absolute;
    top: ${height * 0.16}px;
    width: 100%; /* Para centrar correctamente */
    text-decoration-line: underline;
`;

const AnimatedFunFactContainer = styled(Animated.View)`
    flex-direction: column;
    align-items: center;
`;

const FunFactImage = styled.Image`
    width: ${imageSize}px;
    height: ${imageSize}px;
    border-radius: ${imageSize * 0.5}px;
    margin-bottom: ${height * 0.02}px;
    border-width: ${width * 0.005}px;
    border-color: #C19A6B;
`;

const FunFactTextsContainer = styled.View`
    align-items: center;
    justify-content: center;
    height: ${height * 0.25}px;
    max-height: ${height * 0.25}px; 
    overflow: hidden;
`;


const FunFactTitle = styled.Text`
    font-size: ${width * 0.09}px;
    font-family: 'KochAltschrift';
    color: #C19A6B;
    text-align: center;
    margin-bottom: ${height * 0.01}px;
`;

const FunFactDescription = styled.Text`
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    color: white;
    text-align: center;
`;

const InterestingFactsContainer = styled.View`
    align-items: center;
`;

const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-top: ${height * 0.03}px;
    width: 100%;
    bottom: ${height * 0.05}px;
`;

const NavButton = styled.TouchableOpacity`
    background-color: #C19A6B;
    padding: ${width * 0.03}px;
    border-radius: ${width * 0.02}px;
`;

const NavButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.05}px;
    font-family: 'KochAltschrift';
    text-align: center;
`;