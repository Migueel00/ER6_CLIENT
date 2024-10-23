import React from 'react';
import { Modal, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

interface RecipeModalProps {
    visible: boolean;
    onClose: () => void;
    curses: any[];
}

const RecipeModal: React.FC<RecipeModalProps> = ({ visible, onClose, curses }) => {

    const formatEffectText = (effect: string): string => {
        return effect
            .split('_')  // Divide el string por las barras bajas
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitaliza la primera letra de cada palabra
            .join(' ');  // Une las palabras con un espacio
    };
    

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

                    {/* Scrollable list of curses */}
                    <ScrollViewContainer>
                        <ScrollView 
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={true}
                        horizontal={false}>
                            {curses.map((curse, index) => (
                                <CurseCard key={index}>
                                    <CurseName>{curse.name}</CurseName>
                                    <CurseDescription>{curse.description}</CurseDescription>
                                    
                                    <SectionTitle>Needed Effects</SectionTitle>
                                    {curse.antidote_effects.map((effect: string, idx: number) => (
                                          <EffectText key={idx}>{idx + 1 + "- "}{formatEffectText(effect)}</EffectText>
                                    ))}

                                </CurseCard>
                            ))}
                        </ScrollView>
                    </ScrollViewContainer>

                    {/* Close button always at the bottom */}
                    <CloseButtonContainer>
                        <CloseButton onPress={onClose}>
                            <CloseButtonText>Close Recipe Book</CloseButtonText>
                        </CloseButton>
                    </CloseButtonContainer>
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
    height: 90%; /* Cambiar esto */
    padding: 20px;
    border-radius: 20px;
    justify-content: flex-start;
    align-items: center;
    flex: 1; /* Añadir esta línea */
`;

const ScrollViewContainer = styled.View`
    flex: 1;
    width: 100%;
`;

const ScrollViewContent = styled.ScrollView`
    flex-grow: 1;
    flex-shrink: 1; /* Asegura que el contenido pueda reducirse si es necesario */
`;

const CurseCard = styled.View`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 15px;
`;

const CurseName = styled.Text`
    font-size: ${width * 0.07}px;
    color: #C19A6B;
    font-family: 'KochAltschrift';
`;

const CurseDescription = styled.Text`
    font-size: ${width * 0.06}px;
    color: white;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'KochAltschrift';
`;

const SectionTitle = styled.Text`
    font-size: ${width * 0.07}px;
    color: #C19A6B;
    margin-top: 10px;
    font-family: 'KochAltschrift';
`;

const EffectText = styled.Text`
    font-size: ${width * 0.06}px;
    color: white;
    font-family: 'KochAltschrift';
`;

const CloseButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    margin-top: 10px;
    padding-bottom: 10px;
`;

const CloseButton = styled.TouchableOpacity`
    background-color: #C19A6B;
    padding: 10px 20px;
    border-radius: 5px;
    align-items: center;
`;

const CloseButtonText = styled.Text`
    font-size: ${width * 0.06}px;
    color: white;
    font-family: 'KochAltschrift';
`;

const TitleModal = styled.Text`
    font-size: ${width * 0.1}px;
    color: white;
    font-family: 'KochAltschrift';
    text-decoration: underline;
    text-align: center;
    margin-bottom: 20px;
`;

export default RecipeModal;

