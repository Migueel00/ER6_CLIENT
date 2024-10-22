import { Dimensions, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { Animated } from "react-native";
import { useRef, useEffect } from "react";
import Ingredient from "../../../potions/ingredient";

const { width, height } = Dimensions.get('window');

interface FlatListIngredients {
    ingredients: Ingredient[];
    handleLongPress: (item : Ingredient) => void;
}

const defaultPotionImage = require('../../../../assets/png/ingredients.jpeg');

const ITEM_SIZE = width * 0.60;

const CONSTANTS = {
    ITEM_SIZE,
    SPACING: 10,
    WIDTH: width,
    SPACER_ITEM_SIZE: (width - ITEM_SIZE) / 2,
    HEIGHT: height,
    BUTTON_SPACING: 0.02,
    BUTTON_RIGHT: 0.05
};

// Función para formatear los efectos
const formatEffects = (effects: string[]): string => {
    return effects
        .map(effect =>
            effect
                .split('_') // Divide los guiones bajos
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Primera letra de cada palabra mayúscula
                .join(' ') // Une las palabras con espacios
        )
        .join(', '); // Une los diferentes efectos con comas
};




const FlatListIngredients : React.FC<FlatListIngredients> = ({ ingredients, handleLongPress}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<Animated.FlatList>(null); 

    useEffect(() => {
        console.log("HA ENTRADO A HACER EL SCROLL AL INICIO");
        
        // Desplazar FlatList al índice 0 cuando cambian los ingredientes
        if (flatListRef.current) {
            console.log("CURRENT EXISTE");
            
            flatListRef.current.scrollToIndex({ index: 0, animated: true });
        }
    }, [ingredients]);

    return(
        <FlatListView>
            <Animated.FlatList
                initialNumToRender={ingredients.length}
                maxToRenderPerBatch={ingredients.length}
                updateCellsBatchingPeriod={ingredients.length}
                ref={flatListRef}
                snapToInterval={CONSTANTS.ITEM_SIZE}
                decelerationRate={0}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center'}}
                scrollEventThrottle={16}
                horizontal
                data={ingredients}
                keyExtractor={(item) => item._id ? item._id.toString() : item.key }
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset : { x : scrollX }}}],
                    { useNativeDriver: true }
                )}
                renderItem={({item, index}) => {
                    if(!item.name) return <DummyContainer/>

                    const inputRange = [
                        (index - 2) * CONSTANTS.ITEM_SIZE,
                        (index - 1) * CONSTANTS.ITEM_SIZE,
                        index * CONSTANTS.ITEM_SIZE
                    ];
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [-20, -50, -20]
                    });

                    return(
                        <TouchableWithoutFeedback onLongPress={() => handleLongPress(item)}>
                            <IngredientContainer>
                                <IngredientItem as={Animated.View} style={{ transform: [{ translateY }] }}>
                                    <IngredientName>{item.name}</IngredientName>
                                    <IngredientImage source={ defaultPotionImage }/>

                                    <IngredientEffects>{formatEffects(item.effects)}</IngredientEffects>
                                </IngredientItem>
                            </IngredientContainer>
                        </TouchableWithoutFeedback>
                    )
                }}
                
            />
            
        </FlatListView>
    );
}

const FlatListView = styled.View`
    width: 100%;
    height: ${height * 0.8}px;
`;

const DummyContainer = styled.View`
    width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`;

const IngredientContainer = styled.View`
    width: ${CONSTANTS.ITEM_SIZE}px;
    margin-top: ${height * - 0.10}px;
`;

const IngredientName = styled.Text`
    font-size: ${width * 0.08}px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
    margin-bottom: ${height * 0.01}px;
`;

const IngredientImage = styled.Image`
    width: ${CONSTANTS.ITEM_SIZE * 0.60}px;
    height: ${CONSTANTS.ITEM_SIZE * 0.60}px;
    resize-mode: cover;
    border-width: 1.5px;
    border-color: #FFF;
    border-radius: ${width * 0.02}px;
`;

const IngredientEffects = styled.Text`
    font-size: ${width * 0.06}px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
    margin-top: ${height * 0.005}px;
`;

const IngredientItem = styled.View`
    margin-horizontal: ${CONSTANTS.SPACING}px;
    padding: ${CONSTANTS.SPACING}px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    border-width: 1.5px;
    border-color: #C19A6B;
    border-radius: ${width * 0.02}px;
    height: ${height * 0.385}px;
`;

export default FlatListIngredients;