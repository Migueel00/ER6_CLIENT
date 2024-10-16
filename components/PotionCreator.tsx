import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, StatusBar, Animated, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../helpers/context';
import { Ingredient } from '../interfaces/contextInterface';
import { TouchableWithoutFeedback } from 'react-native';
import { Vibration } from 'react-native';

const backgroundImageURL = require('../assets/png/settingsBackground1.png');
const defaultPotionImage = require('../assets/png/potion.png');
const { width, height } = Dimensions.get('window');

const ITEM_SIZE = width * 0.40;

const CONSTANTS = {
    ITEM_SIZE,
    SPACING: 10,
    WIDTH: width,
    SPACER_ITEM_SIZE: (width - ITEM_SIZE) / 2,
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

const PotionCreator = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredient, setselectedIngredient] = useState<{ name: string, effects: string }>({ name: '', effects: '' });
    const [selectedIngredientArray, setSelectedIngredientArray] = useState<Ingredient[]>([]);
    const context = useContext(AppContext);
    const userRole = context?.player?.role;

    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const response = await fetch('https://kaotika-server.fly.dev/ingredients');
                if (!response.ok) throw new Error('Error en la respuesta de la API');
                
                const jsonData = await response.json();
                const ingredientsData: Ingredient[] = jsonData.data.map(({ id, name, description, value, effects, image, type }: Ingredient) => ({
                    id,
                    name,
                    description,
                    value,
                    effects,
                    image: defaultPotionImage,
                    type,
                }));

                const filteredIngredients = ingredientsData.filter(ingredient => {

                    switch (userRole){
                        case 'ACOLYTE':
                            return ingredient.effects.some(effect => effect.includes('restore') || effect.includes('increase'));

                        case 'VILLAIN':
                            return ingredient.effects.some(effect => effect.includes('damage') || effect.includes('decrease'));
                    }
                });

                setIngredients([{ key: 'left-spacer' }, ...filteredIngredients, { key: 'right-spacer' }]);
            } catch (error) {
                console.log(error);
            }
        };

        getIngredients();
    }, [userRole]);

    const handleLongPress = (ingredient: Ingredient) => {;

        if (selectedIngredientArray.length < 4) {
            Vibration.vibrate(100);
            console.log("Ingrediente seleccionado");
            setSelectedIngredientArray(prev => [...prev, ingredient]);
        }
        else
        {
            Vibration.vibrate(100);
            console.log("Maximo de ingredientes añadidos");
            
        }
    }

    useEffect(() => {
        console.log("Ingredientes seleccionados:", selectedIngredientArray);
    }, [selectedIngredientArray]);

    return (
        <Container>
            <StatusBar />
            <ImageBackground source={backgroundImageURL} style={styles.backgroundImage}>
                <Animated.FlatList
                    snapToInterval={CONSTANTS.ITEM_SIZE}
                    decelerationRate={0}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                    scrollEventThrottle={16}
                    horizontal
                    data={ingredients}
                    keyExtractor={(item) => item.id ? item.id.toString() : item.key}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    renderItem={({ item, index }) => {
                        if (!item.name) return <DummyContainer />;

                        //Por ahora se usara una imagen local
                        const imageSource = defaultPotionImage;
                        const inputRange = [
                            (index - 2) * CONSTANTS.ITEM_SIZE,
                            (index - 1) * CONSTANTS.ITEM_SIZE,
                            index * CONSTANTS.ITEM_SIZE
                        ];
                        const translateY = scrollX.interpolate({
                            inputRange,
                            outputRange: [-20, -50, -20]
                        });

                        return (
                        <TouchableWithoutFeedback onLongPress={() => handleLongPress(item)}>
                            <PotionContainer>
                                <Potion as={Animated.View} style={{ transform: [{ translateY }] }}>
                                    <PotionImage source={{ uri: item.image }}/>
                                </Potion>
                            </PotionContainer>
                        </TouchableWithoutFeedback>
                        );
                    }}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.floor(e.nativeEvent.contentOffset.x / 157);
                    
                        // Asegúrate de que el índice no exceda los límites del arreglo
                        if (index > 0 && index < ingredients.length - 1) {
                            
                            const item = ingredients[index + 1]; // Obtén el ítem seleccionado
                            setselectedIngredient({name: item.name, effects: formatEffects(item.effects)});
                        }
                        else {

                            const item = ingredients[index + 1]; // Obtén el ítem seleccionado
                            setselectedIngredient({name: item.name, effects: formatEffects(item.effects)});
                        }
                    }}
                />

                {selectedIngredient.name && (  //Si existe el nombre de la pocion se imprimira el nombre y el efecto
                    <PotionInfoContainer>
                        <PotionName numberOfLines={2}>{selectedIngredient.name}</PotionName>
                        <PotionEffects numberOfLines={3}>{selectedIngredient.effects}</PotionEffects>
                    </PotionInfoContainer>
                )}
            </ImageBackground>
        </Container>
    );
};

//STYLED COMPONENTS
const Container = styled.View`
    flex: 1;
`

const PotionContainer = styled.View`
    width: ${CONSTANTS.ITEM_SIZE}px;
    margin-top: ${height * - 0.35}px;
`;

const Potion = styled.View`
    margin-horizontal: ${CONSTANTS.SPACING}px;
    padding: ${CONSTANTS.SPACING}px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
`;

const PotionImage = styled.Image`
    width: 80%;
    height: ${CONSTANTS.ITEM_SIZE * 0.50}px;
    resize-mode: cover;
    border-radius: 10px;
`;

const PotionInfoContainer = styled.View`
    position: absolute;
    top: ${height / 2 - 200}px; /* Ajusta esta posición según sea necesario */
    left: ${width / 2 - (width * 0.40) / 2}px;
    width: ${CONSTANTS.ITEM_SIZE}px;
    align-items: center;
`;

const PotionName = styled.Text`
    font-size: 41px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
`;

const PotionEffects = styled.Text`
    font-size: 33px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
`;

const DummyContainer = styled.View`
    width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`;

const styles = StyleSheet.create({
    backgroundImage: {
        width: width,
        height: height,
        justifyContent: 'flex-start'
    },
});

export default PotionCreator;