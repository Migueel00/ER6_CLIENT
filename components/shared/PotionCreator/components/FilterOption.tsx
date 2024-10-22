import styled from "styled-components/native";
import * as CONSTANTS from "../../../../src/constants";
import { Dimensions } from "react-native";
import { useState } from "react";

const { width, height } = Dimensions.get('window');
interface FilterOption {
    selected: boolean;
    name: string;
    func: () => void;
}

const FilterOption: React.FC<FilterOption> = ({func, name, selected}) => {

    return (
        <FilterOptionTouchable
            selected={selected}
            onPress={func}
        >
            <FilterOptionText> {name} </FilterOptionText>
        </FilterOptionTouchable>
    )
}   

export default FilterOption;

const FilterOptionTouchable = styled.TouchableOpacity<{ selected: boolean }>`
    width: ${CONSTANTS.TOUCHABLE_WIDTH * width}px;
    background-color: ${({ selected }) => (selected ? '#5d6d7e' : 'white')};
    padding: ${width * CONSTANTS.TOUCHABLE_SPACING}px;
    border-radius: ${CONSTANTS.TOUCHABLE_RADIUS * width}px;
    margin-bottom: ${width * 0.04}px;
`;

const FilterOptionText = styled.Text`
    font-size: ${width * 0.05}px;
    font-family: 'KochAltschrift';
    color: black;
    text-align: center;
`;

