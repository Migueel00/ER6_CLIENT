import { Dimensions } from "react-native"
import styled from "styled-components/native"
import * as CONSTANTS from "../src/constants";
import { useEffect, useState } from "react";
import Ingredient from "./potions/ingredient";

const { width, height } = Dimensions.get('window');

interface FilterModalProps {
    closeModal: () => void;
    ingredients: Ingredient[];
    setIngredients: any;
    filterBooleans: boolean[];
    setFilterBooleans: any;
    ingredientsCopy: Ingredient[];
    setIngredientsCopy: any;
}

interface filterBooleans {
    isHpSelected: boolean;
    isLeastSelected: boolean;
    isIntSelected: boolean;
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

const FilterModal : React.FC<FilterModalProps>  = ({ closeModal, ingredients, setIngredients, filterBooleans, setFilterBooleans, setIngredientsCopy, ingredientsCopy}) => {
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
    const [filters, setFilters] = useState<string[]>([]);

    useEffect(() => {
        if(filterBooleans.length > 0)
        {
            setIsHpSelected(filterBooleans[CONSTANTS.IS_HP]);
            setIsLeastSelected(filterBooleans[CONSTANTS.IS_LEAST]);
            setIsIntSelected(filterBooleans[CONSTANTS.IS_INTELLIGENCE]);
            setIsConstitutionSelected(filterBooleans[CONSTANTS.IS_CONSTITUTION]);
            setIsDexteritySelected(filterBooleans[CONSTANTS.IS_DEXTERITY]);
            setIsCharismaSelected(filterBooleans[CONSTANTS.IS_CHARISMA]);
            setIsInsanitySelected(filterBooleans[CONSTANTS.IS_INSANITY]);
            setIsLesserSelected(filterBooleans[CONSTANTS.IS_LESSER]);
            setIsDefaultSelected(filterBooleans[CONSTANTS.IS_DEFAULT]);
            setIsGreaterSelected(filterBooleans[CONSTANTS.IS_GREATER]);
        }

    }, [filterBooleans]); 

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

    const CONSTANTS = {
        IS_HP: 0,
        IS_LEAST: 1,
        IS_INTELLIGENCE: 2,
        IS_CONSTITUTION: 3,
        IS_DEXTERITY: 4,
        IS_CHARISMA: 5,
        IS_INSANITY: 6,
        IS_LESSER: 7,
        IS_DEFAULT: 8,
        IS_GREATER: 9
    }

    const handleApplyFilters = () => {
        const filtersBoolean : boolean[] = [isHpSelected, isLeastSelected, isIntSelected, isConstitutionSelected, isDexteritySelected, isCharismaSelected,
            isInsanitySelected, isLesserSelected, isDefaultSelected, isGreaterSelected
        ];

        setFilterBooleans(filtersBoolean);

        const filtersString : string[] =  [];

        console.log(filtersString);

        for(let i = 0; i < filtersBoolean.length; i++){
            const filterBoolean = filtersBoolean[i];

            switch(i){
                case CONSTANTS.IS_HP:
                    filterBoolean ? filtersString.push('hit_points') : filterBoolean;
                    break;
                    
                case CONSTANTS.IS_LEAST:
                    filterBoolean ? filtersString.push('least') : filterBoolean;
                    break;

                case CONSTANTS.IS_INTELLIGENCE:
                    filterBoolean ? filtersString.push('intelligence') : filterBoolean;
                    break;

                case CONSTANTS.IS_CONSTITUTION:
                    filterBoolean ? filtersString.push('constitution') : filterBoolean;
                    break;

                case CONSTANTS.IS_DEXTERITY:
                    filterBoolean ? filtersString.push('dexterity') : filterBoolean;
                    break

                case CONSTANTS.IS_CHARISMA:
                    filterBoolean ? filtersString.push('charisma') : filterBoolean;
                    break;

                case CONSTANTS.IS_INSANITY:
                    filterBoolean ? filtersString.push('insanity') : filterBoolean;
                    break;

                case CONSTANTS.IS_LESSER:
                    filterBoolean ? filtersString.push('lesser') : filterBoolean;
                    break;

                case CONSTANTS.IS_DEFAULT:
                    filterBoolean ? filtersString.push('') : filterBoolean;

                    break;

                case CONSTANTS.IS_GREATER:
                    filterBoolean ? filtersString.push('greater') : filterBoolean;

                    break;

                default:

                    break;
            }
        }
        console.log(filtersString);
        setFilters(filtersString);

        if(filtersString.length > 0)
        {
            const filteredIngredients = ingredients.filter(ingredient => {
                if (Array.isArray(ingredient.effects)) {
                    return filtersString.some(filter => 
                        ingredient.effects.some(effect => effect.includes(filter))
                    );
                }
                return false; 
            });

            setIngredientsCopy([{ key: 'left-spacer' }, ...(filteredIngredients || []), { key: 'right-spacer' }]);
        }
        else
        {
            console.log("HA ENTRADO AQIWHHAIUDAAOKLSHADOHAK");
            
            setIngredientsCopy(ingredients);
            console.log(ingredientsCopy);
            
        }

        closeModal();  

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
                    <ExitButton onPress={handleApplyFilters}>
                        <ExitButtonText>APPLY</ExitButtonText>
                    </ExitButton>
                </ButtonContainer>
            </FilterContainer>
        </ModalContainer>
    )
}

export default FilterModal