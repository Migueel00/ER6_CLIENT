import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ImageBackground, Modal, StatusBar, StyleSheet, ToastAndroid, TouchableWithoutFeedback, Vibration } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../helpers/context';
import Cauldron from './potions/cauldron';
import Ingredient from './potions/ingredient';
import Potion from './potions/potion';
import FilterModal from './FilterModal';

const backgroundImageURL = require('../assets/png/settingsBackground1.png');
const defaultPotionImage = require('../assets/png/potion.png');
const goBackImage = require('../assets/icons/back-arrow.png');
const createPotionImage = require('../assets/icons/darkButton2.png');
const { width, height } = Dimensions.get('window');



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
    const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);

    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!potionFactory) {
            setPotionFactory(new Cauldron(ingredients, curses));
        }
    }, []);

    const handlePressFilter = () => {
        setFilterModalVisible(true);
    }

    const handleLongPress = (ingredient: Ingredient) => {;

        if (selectedIngredientArray.length < 4) {
            Vibration.vibrate(100);   <Animated.FlatList
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

    const gridItems = Array.from({ length: 4 }, (_, index) => {
        return selectedIngredientArray[index] || null; // Asignamos un objeto del inventario o null si no hay
    });

    return (
        <Container>
            <StatusBar />
            <ImageBackground source={backgroundImageURL} style={styles.backgroundImage}>       
            <FlatListView>
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
                <FilterButton onPress={handlePressFilter} >
                    <FilterButttonText>Filter...</FilterButttonText>
                </FilterButton>
            </FlatListView>
                {selectedIngredient.name && (  //Si existe el nombre de la pocion se imprimira el nombre y el efecto
                    <IngredientInfoContainer>
                        <IngredientName numberOfLines={2}>{selectedIngredient.name}</IngredientName>
                        <IngredientEffects numberOfLines={3}>{selectedIngredient.effects}</IngredientEffects>
                    </IngredientInfoContainer>
                )}
                {/* <SelectedIngredientContainer>
                    {selectedIngredientArray.map((item, index) => (
                        <IngredientListImage key={index} source={defaultPotionImage} />
                    ))}
                </SelectedIngredientContainer> */}
                <Grid>
                    {gridItems.map((item, index) => (
                        <GridItem key={index}>
                        {item ? (
                            <IngredientListImage key={index} source={defaultPotionImage} />
                        ) : (
                            <EmptyIngredient key={index} />
                        )}
                        </GridItem>
                    ))}
                </Grid>
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
                        <CreatePotionButton>
                            <CreatePotionIcon source={createPotionImage} />
                            <PotionCreationText>Potion Creation</PotionCreationText>
                        </CreatePotionButton>
                    </CreatePotionButton>
                )}

                {showBackButton && (
                    <IngredientBackButton onPress={()=> {
                        if(selectedIngredientArray.length > 0) {
                            setSelectedIngredientArray((prev) => prev.slice(0, -1)); // Eliminar el último ingrediente
                            ToastAndroid.show("Ingredient eliminated", ToastAndroid.SHORT);
                        }
                    }}>
                        <BackIcon source={goBackImage} />
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
                <Modal
                    visible={filterModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setFilterModalVisible(false)}
                >
                    <FilterModal/>
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
    border-radius: 10px;
    align-items: center;
    position: absolute;
    padding: 10px;
    bottom: ${height * 0.093}px;
    left: ${((width/2) * 0.16)}px;
`;

const FlatListView = styled.View`
    width: 100%;
    height: ${height * 0.8}px;
`;

const PotionCreationText = styled.Text`
    position: absolute;
    top: ${height * 0.04}px;
    font-size: ${width * 0.10}px;
    font-family: 'KochAltschrift';
    text-align: center;
`;

const IngredientBackButton = styled.TouchableOpacity`
    background-color: transparent;
    border-radius: 10px;
    align-items: center;
    position: absolute;
    bottom: ${height * 0.32}px;
    margin-left: ${width * 0.88}px;
`;

const BackIcon = styled.Image`
    width: ${width * 0.12}px;
    height: ${height * 0.05}px;
`;

const CreatePotionIcon = styled.Image`
    width: ${width * 0.62}px;
    height: ${height * 0.10}px;
`;

const Grid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-left: ${width * 0.08}px;
    width: 80%;
    margin-top: ${height * -0.18}px;
`;

const GridItem = styled.View`
    width: ${width * 0.18}px;
    height: ${width * 0.14}px;
    border-width: 1.5px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    border-radius: ${width * 0.02}px;
    margin-bottom: ${height * 0.004}px;
`;

const EmptyIngredient = styled.View`
    width: ${width * 0.12}px;
    height: ${height * 0.06}px;
`;

const IngredientContainer = styled.View`
    width: ${CONSTANTS.ITEM_SIZE}px;
    margin-top: ${height * - 0.15}px;
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

const FilterButton = styled.TouchableOpacity`
    position: absolute;
    top: ${CONSTANTS.BUTTON_SPACING * CONSTANTS.HEIGHT}px;
    right: ${CONSTANTS.BUTTON_RIGHT * CONSTANTS.WIDTH}px;
    align-items: center;
    justify-content: center;
    width: ${CONSTANTS.WIDTH * 0.18}px;
    height: ${CONSTANTS.HEIGHT * 0.08}px; 
    background-color: rgba(255, 255, 255, 0.8);
    padding: ${CONSTANTS.WIDTH * 0.02}px; 
    border-radius: ${CONSTANTS.WIDTH * 0.05}px; 
`;

const FilterButttonText = styled.Text`
    color: black;
    font-size: ${CONSTANTS.WIDTH * 0.05}px;
    font-family: 'KochAltschrift';
`

export default PotionCreator;