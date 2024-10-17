import { Dimensions } from "react-native"
import styled from "styled-components/native"
import * as CONSTANTS from "../src/constants";

const {width, height} = Dimensions.get('window');

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

const FilterOptionTouchable = styled.TouchableOpacity`
    width: ${CONSTANTS.TOUCHABLE_WIDTH * width}px;
    background-color: white;
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

const FilterModal = () => {

    return (
        <ModalContainer>
            <FilterContainer>
                <FilterTitle>Filters</FilterTitle>
                <FilterOption>
                    <FilterOptionTouchable>
                        <FilterOptionText>HP</FilterOptionText>
                    </FilterOptionTouchable>
                    <FilterOptionTouchable>
                        <FilterOptionText>Least</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <FilterOption>
                    <FilterOptionTouchable>
                        <FilterOptionText>INT</FilterOptionText>
                    </FilterOptionTouchable>
                    <FilterOptionTouchable>
                        <FilterOptionText>Lesser</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <FilterOption>
                    <FilterOptionTouchable>
                        <FilterOptionText>CONS</FilterOptionText>
                    </FilterOptionTouchable>
                    <FilterOptionTouchable>
                        <FilterOptionText> - </FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <FilterOption>
                    <FilterOptionTouchable>
                        <FilterOptionText>DEX</FilterOptionText>
                    </FilterOptionTouchable>
                    <FilterOptionTouchable>
                        <FilterOptionText>Greater</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption> 
                <FilterOption>
                    <FilterOptionTouchable>
                        <FilterOptionText>CHA</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>
                <FilterOption>
                    <FilterOptionTouchable>
                        <FilterOptionText>INS</FilterOptionText>
                    </FilterOptionTouchable>
                </FilterOption>   
                <ButtonContainer>
                    <ExitButton>
                        <ExitButtonText>EXIT</ExitButtonText>
                    </ExitButton>
                    <ExitButton>
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