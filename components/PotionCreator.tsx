import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ImageBackground, Modal, StatusBar, StyleSheet, ToastAndroid, TouchableWithoutFeedback, Vibration } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../helpers/context';
import Cauldron from './potions/cauldron';
import Ingredient from './potions/ingredient';
import Potion from './potions/potion';

const backgroundImageURL = require('../assets/png/settingsBackground1.png');
const defaultPotionImage = require('../assets/png/potion.png');
const { width, height } = Dimensions.get('window');

interface IngredientInterface {
    _id: string;
    name: string;
    description: string;
    value: number;
    effects: string[];
    image: string;
    type: string;
    key: string;
}

type IngredientOrSpacer = Ingredient | { key: string };

const ITEM_SIZE = width * 0.60;

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
    const [selectedIngredient, setSelectedIngredient] = useState<{ name: string, effects: string }>({ name: '', effects: '' });
    const [selectedIngredientArray, setSelectedIngredientArray] = useState<Ingredient[]>([]);
    const context = useContext(AppContext);
    const userRole = context?.player?.role;
    const [potionFactory, setPotionFactory] = useState<Cauldron| null>();
    const [curses, setCurses] = useState(require('./../fakedata/fake-curses.json'));
    const [createdPotion, setCreatedPotion] = useState<Potion | null>();
    const [ingredients, setIngredients] = useState<Ingredient[] | any>(context?.ingredients || []);
    const [potionModalVisible, setPotionModalVisible] = useState(false);
    const [showBackButton, setShowBackButton] = useState(false);
    const [showCreatePotionButton, setShowCreatePotionButton] = useState(false)
    const toggleModal = () => {
        setPotionModalVisible(!potionModalVisible);
    };

    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!potionFactory) {
            setPotionFactory(new Cauldron(ingredients, curses));
        }
    }, []);

    useEffect(() => {
        const ingredientsData = ingredients;
    
        const filteredIngredients: Ingredient[] = ingredientsData.filter((ingredient: Ingredient) => {
            switch (userRole) {
                case 'ACOLYTE':
                    return ingredient.effects.some(effect => effect.includes('restore') || effect.includes('increase'));
    
                case 'VILLAIN':
                    return ingredient.effects.some(effect => effect.includes('damage') || effect.includes('decrease'));
                default:
                    return false; // Optional: handle any other user roles
            }
        });
    
        setIngredients([{ key: 'left-spacer' }, ...filteredIngredients, { key: 'right-spacer' }]);
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
            ToastAndroid.show("Maximum ingredients", ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        //Apareceran los botones si se cumple
        setShowBackButton(selectedIngredientArray.length >= 1);
        setShowCreatePotionButton(selectedIngredientArray.length >= 2);
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
                    keyExtractor={(item) => item._id ? item._id.toString() : item.key}
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
                                <IngredientContainer>
                                    <IngredientItem as={Animated.View} style={{ transform: [{ translateY }] }}>
                                    <IngredientName>{item.name}</IngredientName>
                                        <IngredientImage source={imageSource} />

                                        <IngredientEffects>{formatEffects(item.effects)}</IngredientEffects>
                                    </IngredientItem>
                                </IngredientContainer>
                            </TouchableWithoutFeedback>
                        );
                    }}
                />
                {selectedIngredient.name && (  //Si existe el nombre de la pocion se imprimira el nombre y el efecto
                    <IngredientInfoContainer>
                        <IngredientName numberOfLines={2}>{selectedIngredient.name}</IngredientName>
                        <IngredientEffects numberOfLines={3}>{selectedIngredient.effects}</IngredientEffects>
                    </IngredientInfoContainer>
                )}
                <SelectedIngredientContainer>
                    {selectedIngredientArray.map((item, index) => (
                        <IngredientListImage key={index} source={defaultPotionImage} />
                    ))}
                </SelectedIngredientContainer>
                {showCreatePotionButton && (  // Condición para mostrar el botón
                    <CreatePotionButton 
                        onPress={() => {
                        if (potionFactory && typeof potionFactory.createPotion === 'function') {

                            const potion = potionFactory.createPotion(selectedIngredientArray);
                            setCreatedPotion(potion);
                            console.log("Potion created successfully");
                            console.log(potion);
                        
                            if (potion) { // Si la poción se ha creado correctamente
                                console.log("Potion created successfully");
                                console.log(potion);
                                setCreatedPotion(potion);
                                toggleModal(); // Mostrar el modal
                            }
                            
                        } else {
                            console.log("PotionFactory or createPotion method is not available");
                        }
                    }}>
                        <CreatePotionButtonText>Create Potion</CreatePotionButtonText>
                    </CreatePotionButton>
                )}

                {showBackButton && (
                    <IngredientBackButton onPress={()=> {
                        if(selectedIngredientArray.length > 0) {
                            setSelectedIngredientArray((prev) => prev.slice(0, -1)); // Eliminar el último ingrediente
                            ToastAndroid.show("Ingredient eliminated", ToastAndroid.SHORT);
                        }
                    }}>
                        <BackIcon>Back</BackIcon>
                    </IngredientBackButton>
                )}

               <Modal
                    visible={potionModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={toggleModal}
                > 
                    <ModalContainer>
                        {/* Contenido del modal */}
                        {createdPotion && (
                            <PotionMessage>
                                You created the {createdPotion.name} potion
                            </PotionMessage>
                        )}
                        <CloseButton onPress={toggleModal}>
                            <CloseButtonText>Close</CloseButtonText>
                        </CloseButton>
                    </ModalContainer>
                </Modal>

            </ImageBackground>
        </Container>
    );
};

//STYLED COMPONENTS
const Container = styled.View`
    flex: 1;
`
const CreatePotionButton = styled.TouchableOpacity`
    background-color: #6200ee;
    border-radius: 10px;
    align-items: center;
    position: absolute;
    padding: 10px;
    bottom: ${height * 0.20}px;
    left: ${((width/2) - 65)}px;
`;

const CreatePotionButtonText = styled.Text`
    color: #ffffff;
    font-size: 30px;
    font-family: 'KochAltschrift';
`;

const IngredientBackButton = styled.TouchableOpacity`
    background-color: #6200ee;
    border-radius: 10px;
    align-items: center;
    position: absolute;
    padding: 10px;
    bottom: ${height * 0.31}px;
    left: ${((width) - 60)}px;
`;

const BackIcon = styled.Text`
    font-size: ${width*0.06}px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
`;

const SelectedIngredientContainer = styled.View`
    position: absolute;
    flex-direction: row; /* Establece la dirección de los elementos en fila */
    align-items: center; /* Alinea verticalmente al centro */
    padding: 10px; /* Espaciado interno para el contenedor */
    bottom: ${height * 0.30}px;
    left: ${width * 0.15}px;

    border-width: ${width * 0.002}px;
    border-color: #8b4513;

    width: ${width * 0.69}px;
    height: ${height * 0.08}px;
`;

const IngredientContainer = styled.View`
    width: ${CONSTANTS.ITEM_SIZE}px;
    margin-top: ${height * - 0.35}px;
`;

const IngredientItem = styled.View`
    margin-horizontal: ${CONSTANTS.SPACING}px;
    padding: ${CONSTANTS.SPACING}px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
`;

const IngredientImage = styled.Image`
    width: ${CONSTANTS.ITEM_SIZE * 0.60}px;
    height: ${CONSTANTS.ITEM_SIZE * 0.60}px;
    resize-mode: cover;
    border-radius: 10px;
`;

const IngredientListImage = styled.Image`
    width: ${width * 0.12}px;
    height: ${height * 0.06}px;
    border-radius: 10px;
    margin-right: 20px;
`;

const IngredientInfoContainer = styled.View`
    position: absolute;
    top: ${height / 2 - 200}px; /* Ajusta esta posición según sea necesario */
    left: ${width / 2 - (width * 0.40) / 2}px;
    width: ${CONSTANTS.ITEM_SIZE}px;
    align-items: center;
`;

const IngredientName = styled.Text`
    font-size: ${width*0.08}px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
`;

const IngredientEffects = styled.Text`
    font-size: ${width*0.06}px;
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    permissionButton: {
        padding: 10,
        borderRadius: 5,
    },
});

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
`;

const PotionMessage = styled.Text`
    color: #ffffff;
    font-size: 24px;
    font-family: 'KochAltschrift';
    margin-bottom: 20px;
    text-align: center;
`;

const CloseButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: #6200ee;
    border-radius: 5px;
    align-items: center;
`;

const CloseButtonText = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-family: 'KochAltschrift';
`;

export default PotionCreator;