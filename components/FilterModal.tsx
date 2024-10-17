import { Dimensions } from "react-native"
import styled from "styled-components/native"
import * as CONSTANTS from "../src/constants";
import { useState } from "react";

const { width, height } = Dimensions.get('window');

interface FilterModalProps {
    closeModal: () => void;
}

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const FilterContainer = styled.View`
    width: ${width * 0.95}px;
    height: ${height * 0.9}px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: ${CONSTANTS.MODAL_RADIUS * width}px;
    padding: ${CONSTANTS.MODAL_SPACING * width}px;
`;

const FilterTitle = styled.Text`
    font-size: ${width * 0.12}px;
    margin-bottom: ${CONSTANTS.MODAL_SPACING * height}px;
    font-family: 'KochAltschrift';
    text-align: center;
`;

const FilterOption = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

const FilterOptionTouchable = styled.TouchableOpacity<{ selected: boolean }>`
    width: ${CONSTANTS.TOUCHABLE_WIDTH * width}px;
    background-color: ${({ selected }) => (selected ? '#5d6d7e' : 'white')};
    padding: ${width * CONSTANTS.TOUCHABLE_SPACING}px;
    border-radius: ${CONSTANTS.TOUCHABLE_RADIUS * width}px;
`;


const FilterOptionText = styled.Text`
    font-size: ${width * 0.05}px;
    font-family: 'KochAltschrift';
    color: black;
    text-align: center;
`;

const ExitButton = styled.TouchableOpacity`
    width: ${CONSTANTS.TOUCHABLE_WIDTH * width}px;
    background-color: white;
    padding: ${width * CONSTANTS.TOUCHABLE_SPACING}px;
    border-radius: ${CONSTANTS.FILTER_BOTTOM * width}px;
    background-color: orange;
    margin-right: ${CONSTANTS.TOUCHABLE_SPACING * width}px;
`;

const ExitButtonText = styled.Text`
    font-size: ${width * 0.05}px;
    font-family: 'KochAltschrift';
    color: black;
    text-align: center;
`;

const ButtonContainer = styled.View`
    margin-top: auto; 
    align-items: center;
    flex-direction: row;
`;

const FilterModal : React.FC<FilterModalProps>  = ({ closeModal  }) => {
    const [isHpSelected, setIsHpSelected] = useState<boolean>(false);
    const [isLeastSelected, setIsLeastSelected] = useState<boolean>(false);
    const [isIntSelected, setIsIntSelected] = useState<boolean>(false);
    const [isConstitutionSelected, setIsConstitutionSelected] = useState<boolean>(false);
    const [isDexteritySelected, setIsDexteritySelected] = useState<boolean>(false);
    const [isCharismaSelected, setIsCharismaSelected] = useState<boolean>(false);
    const [isInsanitySelected, setIsInsanitySelected] = useState<boolean>(false);
    const [isLesserSelected, setIsLesserSelected] = useState<boolean>(false);
    const [isDefaultSelected, setIsDefaultSelected] = useState<boolean>(false);
    const [isGreaterSelected, setIsGreaterSelected] = useState<boolean>(false);

    const clearAllFilters = () => {
        setIsHpSelected(false);
        setIsLeastSelected(false);
        setIsIntSelected(false);
        setIsConstitutionSelected(false);
        setIsDexteritySelected(false);
        setIsCharismaSelected(false);
        setIsInsanitySelected(false);
        setIsLesserSelected(false);
        setIsDefaultSelected(false);
        setIsGreaterSelected(false);

    }

    return (
        <ModalContainer>
            <FilterContainer>
                <FilterTitle>Filters</FilterTitle>
                <FilterOption>
                    <FilterOptionTouchable
                        selected={isHpSelected}
                        onPress={() => setIsHpSelected(!isHpSelected)}>
                        <FilterOptionText>HP</FilterOptionText>
                    </FilterOptionTouchable>
                    <FilterOptionTouchable
                        selected={isLeastSelected}
                        onPress={() => setIsLeastSelected(!isLeastSelected)}>
                        <FilterOptionText>Least</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <FilterOption>
                    <FilterOptionTouchable
                        selected={isIntSelected}
                        onPress={() => setIsIntSelected(!isIntSelected)}>
                        <FilterOptionText>INT</FilterOptionText>
                    </FilterOptionTouchable>
                    <FilterOptionTouchable
                        selected={isLesserSelected}
                        onPress={() => setIsLesserSelected(!isLesserSelected)}>
                        <FilterOptionText>Lesser</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <FilterOption>
                    <FilterOptionTouchable
                        selected={isConstitutionSelected}
                        onPress={() => setIsConstitutionSelected(!isConstitutionSelected) }>
                        <FilterOptionText>CONS</FilterOptionText>
                    </FilterOptionTouchable>
                    <FilterOptionTouchable
                        selected={isDefaultSelected}
                        onPress={() => setIsDefaultSelected(!isDefaultSelected)}>
                        <FilterOptionText> - </FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <FilterOption>
                    <FilterOptionTouchable
                        selected={isDexteritySelected}
                        onPress={() => setIsDexteritySelected(!isDexteritySelected)}>
                        <FilterOptionText>DEX</FilterOptionText>
                    </FilterOptionTouchable>
                    <FilterOptionTouchable 
                        selected={isGreaterSelected}
                        onPress={() => setIsGreaterSelected(!isGreaterSelected)}>
                        <FilterOptionText>Greater</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <FilterOption>
                    <FilterOptionTouchable
                        selected={isCharismaSelected}
                        onPress={() => setIsCharismaSelected(!isCharismaSelected)}>
                        <FilterOptionText>CHA</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <FilterOption>
                    <FilterOptionTouchable
                        selected={isInsanitySelected}
                        onPress={() => setIsInsanitySelected(!isInsanitySelected)}>
                        <FilterOptionText>INS</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <ButtonContainer>
                    <ExitButton onPress={closeModal}>
                        <ExitButtonText>EXIT</ExitButtonText>
                    </ExitButton>
                    <ExitButton onPress={clearAllFilters}>
                        <ExitButtonText>CLEAR</ExitButtonText>
                    </ExitButton>
                    <ExitButton>
                        <ExitButtonText>APPLY</ExitButtonText>
                    </ExitButton>
                </ButtonContainer>
            </FilterContainer>
        </ModalContainer>
    )
}

export default FilterModal