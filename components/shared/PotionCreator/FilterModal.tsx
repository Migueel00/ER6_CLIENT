import { Dimensions } from "react-native"
import styled from "styled-components/native"
import * as CONSTANTS from "../../../src/constants";
import React, { useEffect, useState } from "react";
import Ingredient from "../../potions/ingredient";
import FilterOption from "./components/FilterOption";

const { width, height } = Dimensions.get('window');

interface FilterModalProps {
    closeModal: () => void;
    ingredients: Ingredient[];
    setIngredients: any;
    filterBooleans: boolean[];
    setFilterBooleans: any;
    ingredientsCopy: Ingredient[];
    setIngredientsCopy: any;
    setShowNotFoundText: (loaded: boolean) => void;
}

interface filters {
    func: () => void,
    name: string,
    selected: boolean 
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


const ExitButton = styled.TouchableOpacity`
    width: ${CONSTANTS.CONFIRM_TOUCHABLE_WIDTH * width}px;
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

const FilterOptionsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 0;
`;

const ColumnContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    margin: 20px;
`;

const ColumnContainer2 = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 20px;
`;



const FilterModal : React.FC<FilterModalProps>  = ({ closeModal, ingredients, setIngredients, filterBooleans, setFilterBooleans, setIngredientsCopy, ingredientsCopy, setShowNotFoundText}) => {
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
    const [isCalmSelected, setIsCalmSelected] = useState<boolean>(false);
    const [isFrenzySelected, setIsFrenzySelected] = useState<boolean>(false);
    const [isCleanseSelected, setIsCleanseSelected] = useState<boolean>(false);
    const [filters, setFilters] = useState<string[]>([]);

    const filtersBoolean : boolean[] = [
        isHpSelected,
        isLeastSelected,
        isIntSelected,
        isConstitutionSelected,
        isDexteritySelected,
        isCharismaSelected,
        isInsanitySelected,
        isLesserSelected,
        isGreaterSelected,
        isCalmSelected,
        isFrenzySelected,
        isDefaultSelected,
        isCleanseSelected,

    ];
    
    const filterSetters: ((value: boolean) => void)[] = [
        setIsHpSelected,
        setIsLeastSelected,
        setIsIntSelected,
        setIsConstitutionSelected,
        setIsDexteritySelected,
        setIsCharismaSelected,
        setIsInsanitySelected,
        setIsLesserSelected,
        setIsGreaterSelected,
        setIsCalmSelected,
        setIsFrenzySelected,
        setIsDefaultSelected,
        setIsCleanseSelected
    ];

    const CONSTANTS = {
        IS_HP: 0,
        IS_LEAST: 1,
        IS_INTELLIGENCE: 2,
        IS_CONSTITUTION: 3,
        IS_DEXTERITY: 4,
        IS_CHARISMA: 5,
        IS_INSANITY: 6,
        IS_LESSER: 7,
        IS_GREATER: 8,
        IS_CALM: 9,
        IS_FRENZY: 10,
        IS_DEFAULT: 11,
        IS_CLEANSE: 12,
    }

    useEffect(() => {
        if(filterBooleans.length > 0) filterSetters.map((filterSetter, index) => filterSetter(filterBooleans[index]));
        
    }, [filterBooleans]); 

    const clearAllFilters = () => {
        filterSetters.map(filterSetter => filterSetter(false));
    }



    const handleApplyFilters = () => {
        setFilterBooleans(filtersBoolean);

        const filtersString : string[] =  [];7

        console.log(filtersString);

        // Arrays para los strings de atributos y rareza
        const attributeFilterString: string[] = []; 
        const rarityFilterString: string[] = [];

        for(let i = 0; i < filtersBoolean.length; i++){
            const filterBoolean = filtersBoolean[i];

            switch(i){
                case CONSTANTS.IS_HP:
                    filterBoolean ? attributeFilterString.push('hit_points') : filterBoolean;
                    break;
                    
                case CONSTANTS.IS_LEAST:
                    filterBoolean ? rarityFilterString.push('least') : filterBoolean;
                    break;

                case CONSTANTS.IS_INTELLIGENCE:
                    filterBoolean ? attributeFilterString.push('intelligence') : filterBoolean;
                    break;

                case CONSTANTS.IS_CONSTITUTION:
                    filterBoolean ? attributeFilterString.push('constitution') : filterBoolean;
                    break;

                case CONSTANTS.IS_DEXTERITY:
                    filterBoolean ? attributeFilterString.push('dexterity') : filterBoolean;
                    break

                case CONSTANTS.IS_CHARISMA:
                    filterBoolean ? attributeFilterString.push('charisma') : filterBoolean;
                    break;

                case CONSTANTS.IS_INSANITY:
                    filterBoolean ? attributeFilterString.push('insanity') : filterBoolean;
                    break;

                case CONSTANTS.IS_LESSER:
                    filterBoolean ? rarityFilterString.push('lesser') : filterBoolean;
                    break;

                case CONSTANTS.IS_GREATER:
                    filterBoolean ? rarityFilterString.push('greater') : filterBoolean;
                    break;

                case CONSTANTS.IS_CALM:
                    filterBoolean ? attributeFilterString.push('calm') : filterBoolean;
                    break;

                case CONSTANTS.IS_FRENZY:
                    filterBoolean ? attributeFilterString.push('frenzy') : filterBoolean;
                    break;

                case CONSTANTS.IS_DEFAULT:
                    filterBoolean ? rarityFilterString.push('default') : filterBoolean;
                    break;

                case CONSTANTS.IS_CLEANSE:
                    filterBoolean ? attributeFilterString.push('cleanse') : filterBoolean;
                    break;

                default:

                    break;
            }
        }


        
        //console.log(filtersString);
        setFilters(filtersString);

        //console.log(attributeFilterString);
        console.log("RARITY FILTERS:");    
        console.log(rarityFilterString);
        

        // COMBINE FILTERS
        const filteredIngredients = ingredients.filter(ingredient => {
            if (!Array.isArray(ingredient.effects)) {
                return false; // Aseguramos que effects sea un array
            }
        
            // VERIFY ATTRIBUTE MATCHING
            const matchesAttribute = attributeFilterString.length > 0 && 
                attributeFilterString.some(attrFilter => 
                    ingredient.effects.some(effect => effect.includes(attrFilter))
                );
        
            // VERIFY RARITYS MATCHING
            const matchesRarity = rarityFilterString.length > 0 &&
                rarityFilterString.some(rarityFilter => {
                    if (rarityFilter === "default") {
                        //DEFAULT FILTER LOGIC
                        return ingredient.effects.some(effect => 
                            !effect.startsWith("least") && 
                            !effect.startsWith("lesser") && 
                            !effect.startsWith("greater")
                        );
                    } else {
                        // Lógica estándar para rarezas (least, lesser, greater)
                        return ingredient.effects.some(effect => effect.includes(rarityFilter));
                    }
            });
        
            // Devuelve ingredientes que cumplen al menos uno de los filtros

            if(attributeFilterString.length > 0 && rarityFilterString.length > 0){
                return matchesAttribute && matchesRarity;
            }
            return matchesAttribute || matchesRarity;
        });

        console.log("FILTERED INGREDIENTS");
        console.log(filteredIngredients);
        
        

        // Si hay filtros aplicados, se actualiza la lista de ingredientes filtrados
        if (filteredIngredients.length > 0 && (rarityFilterString.length > 0 || attributeFilterString.length > 0)) {
            console.log("FILTERS APPLIED AND RESULTS");
            
            setShowNotFoundText(false);
            setIngredientsCopy([{ key: 'left-spacer' }, ...filteredIngredients, { key: 'right-spacer' }]);
        } else if (filteredIngredients.length === 0 && rarityFilterString.length > 0 || attributeFilterString.length > 0){
            // Si no hay filtros aplicados o no hay resultados, se muestra la lista completa
            console.log("FILTERS APPLIED BUT NO RESULTS");
            setShowNotFoundText(true);
        }
        else {
            console.log("NO INGREDIENTS AND NO FILTERS");
            console.log("INGREDIENTS BASE");
            console.log(ingredients);
            
            
            setShowNotFoundText(false);
            setIngredientsCopy(ingredients);
        }
        
        closeModal();  
    }

    const filtersColumn: filters[] = [
        {
            func: () => setIsHpSelected(prevState => !prevState), // Envuelve el setter en una función
            name: 'HP',
            selected: isHpSelected
        },
        {
            func: () => setIsIntSelected(prevState => !prevState),
            name: 'INT',
            selected: isIntSelected
        },
        {
            func: () => setIsConstitutionSelected(prevState => !prevState),
            name : 'CONS',
            selected: isConstitutionSelected
        },
        {
            func: () => setIsDexteritySelected(prevState => !prevState),
            name: 'DEX',
            selected: isDexteritySelected
        },
        {
            func: () => setIsCharismaSelected(prevState => !prevState),
            name : "CHA",
            selected: isCharismaSelected
        },
        {
            func: () => setIsInsanitySelected(prevState => !prevState),
            name: "INS",
            selected: isInsanitySelected
        }
    ];

    const filtersColumn2 : filters[] = [{
            func: () => setIsLeastSelected(prevState => !prevState),
            name: 'LEAST',
            selected: isLeastSelected
        },
        {
            func: () => setIsLesserSelected(prevState => !prevState),
            name: 'LESSER',
            selected: isLesserSelected
        },
        {
            func: () => setIsDefaultSelected(prevState => !prevState),
            name: 'NORMAL',
            selected: isDefaultSelected
        },
        {
            func: () => setIsGreaterSelected(prevState => !prevState),
            name: 'GREATER',
            selected: isGreaterSelected
        },
        {
            func: () => setIsCalmSelected(prevState => !prevState),
            name: 'CALM',
            selected: isCalmSelected
        },
        {
            func: () => setIsFrenzySelected(prevState => !prevState),
            name: 'FRENZY',
            selected: isFrenzySelected
        },
        {
            func: () => setIsCleanseSelected(prevState => !prevState),
            name: 'CLEANSE',
            selected: isCleanseSelected
        }   

    ];

    return (
        <ModalContainer>
            <FilterContainer>
                <FilterTitle>Filters</FilterTitle>
                
                {/* Contenedor que agrupa las dos columnas */}
                <FilterOptionsContainer>

                    {/* Columna izquierda (atributos) */}
                    <ColumnContainer>
                        { filtersColumn.map(filter => 
                            <FilterOption 
                                selected={filter.selected}
                                name={filter.name}
                                func={filter.func}
                            />
                        )} 
                    </ColumnContainer>

                    {/* Columna derecha (rareza) */}
                    <ColumnContainer2>
                        { filtersColumn2.map(filter => 
                            <FilterOption
                                selected={filter.selected}
                                name={filter.name}
                                func={filter.func}
                            />
                        )}
                    </ColumnContainer2>

                </FilterOptionsContainer>

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