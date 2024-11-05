import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ImageBackground, Modal, StatusBar, StyleSheet, ToastAndroid, Vibration} from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../../helpers/context';
import Cauldron from '../../potions/cauldron';
import Ingredient from '../../potions/ingredient';
import Potion from '../../potions/potion';
import FilterModal from './FilterModal';
import PotionModal from './components/PotionModal';
import FlatListIngredients from './components/FlatListIngredients';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import HelpModal from './HelpModal';
import RecipeModal from './RecipeModal';

const backgroundImageURL = require('../../../assets/png/settingsBackground1.png');
const defaultPotionImage = require('../../../assets/png/ingredients.jpeg');
const goBackImage = require('../../../assets/icons/back-arrow.png');
const createPotionImage = require('../../../assets/icons/darkButton2.png');
const gridImage = require('../../../assets/png/gridImage.jpeg');
const { width, height } = Dimensions.get('window');
const filterIconImage = require('../../../assets/icons/filterIcon.png');  // Añade la ruta de tu icono


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

const PotionCreator = () => {
    const [selectedIngredient, setSelectedIngredient] = useState<{ name: string, effects: string }>({ name: '', effects: '' });
    const [selectedIngredientArray, setSelectedIngredientArray] = useState<Ingredient[]>([]);
    const context = useContext(AppContext);
    const [potionFactory, setPotionFactory] = useState<Cauldron | null>();
    const [curses, setCurses] = useState(require('../../../fakedata/fake-curses.json'));

    const [createdPotion, setCreatedPotion] = useState<Potion | null>();
    const [ingredients, setIngredients] = useState<Ingredient[] | any>(context?.ingredients || []);
    const [ingredientsCopy, setIngredientCopy] = useState<Ingredient[] | any>(context?.ingredients || []);
    const [potionModalVisible, setPotionModalVisible] = useState(false);
    const [showBackButton, setShowBackButton] = useState(false);
    const [showCreatePotionButton, setShowCreatePotionButton] = useState(true);
    const [filterBooleans, setFilterBooleans] = useState<boolean[]>([]);
    const [helpModalVisible, setHelpModalVisible] = useState<boolean>(false);
    const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
    const [recipeModalVisible, setRecipeModalVisible] = useState<boolean>(false);
    const [createText, setCreateText] = useState<string>("Create Potion");
    const parchmentState = context?.parchment;
    const towerIngredientsState = context?.tower_ingredients;

    const toggleModal = () => {
        console.log("ENTRA A TOGGLE MODAL");
        
        setPotionModalVisible(!potionModalVisible);
        setSelectedIngredientArray([]); 
    };

    useEffect(() => {
        if (!potionFactory) {
            setPotionFactory(new Cauldron(ingredients, curses.data));
        }
    }, []);

    useEffect(() => {
        if (selectedIngredientArray.length === 2 &&
            selectedIngredientArray.some(ingredient => ingredient.name === "Dragon's Blood Resin") &&
            selectedIngredientArray.some(ingredient => ingredient.name === "Gloomshade Moss") && 
            parchmentState && 
            towerIngredientsState) {
            setCreateText("Create Potion of Purification");
        } else {
            setCreateText("Create Potion");
        }

    }, selectedIngredientArray);


    const handlePressFilter = () => {
        setFilterModalVisible(true);
    }

    const handlePressHelp = () => {
        setHelpModalVisible(true);
    }

    const handlePressRecipe = () => {
        setRecipeModalVisible(true);
    }

    const handleLongPress = (ingredient: Ingredient) => {
        
        if (selectedIngredientArray.length < 4) {
            ToastAndroid.show(ingredient.name + " added", ToastAndroid.SHORT);
            Vibration.vibrate(100); 
            // Preguntar si esta linea es realmente necesaria??
            // <FlatListIngredients ingredients={ingredients} handleLongPress={handleLongPress}/>
            console.log("Ingrediente seleccionado");
            setSelectedIngredientArray(prev => [...prev, ingredient]);
        }
        else {
            Vibration.vibrate(100);
            console.log("Maximo de ingredientes añadidos");
            ToastAndroid.show("Maximum ingredients", ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        //Apareceran los botones si se cumple
        setShowBackButton(selectedIngredientArray.length >= 1);
    }, [selectedIngredientArray]);

    const gridItems = Array.from({ length: 4 }, (_, index) => {
        return selectedIngredientArray[index] || null; // Asignamos un objeto del inventario o null si no hay
    });

    return (
        <Container>
            <StatusBar />
            <ImageBackground source={backgroundImageURL} style={styles.backgroundImage}>
                {/* Flalist de los ingredientes */}
                <FlatListIngredients ingredients={ingredientsCopy} handleLongPress={handleLongPress}/>
                <FilterButton onPress={handlePressFilter}>
                    <MaterialCommunityIcons name='filter-menu' size={35} color={'white'}></MaterialCommunityIcons>
                </FilterButton>
                <HelpButton onPress={handlePressHelp}>
                    <Octicons name='question' size={35} color={'white'}></Octicons>
                </HelpButton>
                <RecipeButton onPress={handlePressRecipe}>
                    <MaterialCommunityIcons name='book-open-variant' size={35} color={'white'}></MaterialCommunityIcons>
                </RecipeButton>
                {selectedIngredient.name && (  //Si existe el nombre de la pocion se imprimira el nombre y el efecto
                    <IngredientInfoContainer>
                        <IngredientName numberOfLines={2}>{selectedIngredient.name}</IngredientName>
                        <IngredientEffects numberOfLines={3}>{selectedIngredient.effects}</IngredientEffects>
                    </IngredientInfoContainer>
                )}
                <Grid>
                    {gridItems.map((item, index) => (
                        <GridItem key={index}>
                            {item ? (
                                <IngredientListImage key={index} source={defaultPotionImage} />
                            ) : (
                                <IngredientListImage key={index} source ={gridImage}/>
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
                        <CreatePotionButton
                        onPress={() => {
                            if (potionFactory && typeof potionFactory.createPotion === 'function' && selectedIngredientArray.length >= 2) {
                                const potion = potionFactory.createPotion(selectedIngredientArray);
                                
                                if (potion) {
                                    console.log("Potion created successfully:", potion);
                                    setCreatedPotion(potion); // Asigna la poción creada
                                    toggleModal(); // Muestra el modal
                                } else {
                                    console.log("Potion creation failed");
                                }
                            } else {
                                console.log("PotionFactory or createPotion method is not available");
                                ToastAndroid.show("Not enough Ingredients", ToastAndroid.SHORT);
                            }
                        }}> 

                            <CreatePotionIcon source={createPotionImage} />
                            <PotionCreationText>{createText}</PotionCreationText>
                        </CreatePotionButton>
                    </CreatePotionButton>
                )}

                {showBackButton && (
                    <IngredientBackButton onPress={() => {
                        if (selectedIngredientArray.length > 0) {
                            setSelectedIngredientArray((prev) => prev.slice(0, -1)); // Eliminar el último ingrediente
                            ToastAndroid.show("Ingredient eliminated", ToastAndroid.SHORT);
                        }
                    }}>
                        <BackIcon source={goBackImage} />
                    </IngredientBackButton>
                )}
                
                {/* Potion created Modal */}
                <PotionModal
                    visible={potionModalVisible}
                    onClose={toggleModal}
                    createdPotion={createdPotion}
                />
                <Modal
                    visible={filterModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setFilterModalVisible(false)}
                >
                    <FilterModal 
                        closeModal={() => setFilterModalVisible(false)}
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        filterBooleans={filterBooleans}
                        setFilterBooleans={setFilterBooleans}
                        ingredientsCopy={ingredientsCopy}
                        setIngredientsCopy={setIngredientCopy}
                    />
                </Modal>
                <HelpModal 
                    visible={helpModalVisible}
                    onClose={() => setHelpModalVisible(false)}
                    onOpenRecipeModal={handlePressRecipe}  // Pass the function to open the RecipeModal
                />
                <RecipeModal 
                    visible={recipeModalVisible}
                    onClose={() => setRecipeModalVisible(false)}
                    curses={curses.data}
                />
            </ImageBackground>
        </Container>
    );
};

//STYLED COMPONENTS
const FilterIcon = styled.Image`
    width: ${CONSTANTS.WIDTH * 0.15}px; 
    height: ${CONSTANTS.WIDTH * 0.13}px; 
    tint-color: white;
    resize-mode: contain;
`;

const Container = styled.View`
    flex: 1;
    padding-bottom: 50px;
`
const CreatePotionButton = styled.TouchableOpacity`
    border-radius: 10px;
    align-items: center;
    position: relative;
    padding: 10px;
    bottom: ${height * 0.035}px;
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
    position: relative;
    bottom: ${height * 0.275}px;
    margin-left: ${width * 0.85}px;
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
    justify-content: space-between;
    margin-left: ${width * 0.15}px;
    width: 70%;
    margin-top: ${height * -0.18}px;
    bottom: ${height * 0.06}px;
`;

const GridItem = styled.View`
    width: ${width * 0.13}px;
    height: ${width * 0.14}px;
    border-width: 1.5px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    border-radius: ${width * 0.02}px;
    margin-bottom: ${height * 0.004}px;
`;


const IngredientListImage = styled.Image`
    width: ${width * 0.12}px;
    height: ${height * 0.06}px;
    border-radius: ${width * 0.01}px;
`;

const IngredientInfoContainer = styled.View`
    position: absolute;
    top: ${height / 2 - 200}px; /* Ajusta esta posición según sea necesario */
    left: ${width / 2 - (width * 0.40) / 2}px;
    width: ${CONSTANTS.ITEM_SIZE}px;
    align-items: center;
`;

const IngredientName = styled.Text`
    font-size: ${width * 0.08}px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
    margin-bottom: ${height * 0.01}px;
`;

const IngredientEffects = styled.Text`
    font-size: ${width * 0.06}px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
    margin-top: ${height * 0.005}px;
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

const FilterButton = styled.TouchableOpacity`
    position: absolute;
    top: ${CONSTANTS.BUTTON_SPACING * CONSTANTS.HEIGHT}px;
    right: ${CONSTANTS.BUTTON_RIGHT * CONSTANTS.WIDTH}px;
    align-items: center;
    justify-content: center;
    width: ${CONSTANTS.WIDTH * 0.14}px;
    height: ${CONSTANTS.WIDTH * 0.14}px; 
    background-color: rgba(0, 0, 0, 0.8); 
    border-radius: ${CONSTANTS.WIDTH * 0.04}px; 
    border-width: 2px;
    border-color:  #C19A6B;
`;

const HelpButton = styled.TouchableOpacity`
    position: absolute;
    top: ${CONSTANTS.BUTTON_SPACING * CONSTANTS.HEIGHT}px;
    left: ${CONSTANTS.BUTTON_RIGHT * CONSTANTS.WIDTH}px;
    align-items: center;
    justify-content: center;
    width: ${CONSTANTS.WIDTH * 0.14}px;
    height: ${CONSTANTS.WIDTH * 0.14}px; 
    background-color: rgba(0, 0, 0, 0.8); 
    border-radius: ${CONSTANTS.WIDTH * 0.04}px; 
    border-width: 2px;
    border-color:  #C19A6B;
`;

const RecipeButton = styled.TouchableOpacity`
    position: absolute;
    top: ${CONSTANTS.BUTTON_SPACING * CONSTANTS.HEIGHT}px;
    left: ${CONSTANTS.WIDTH * 0.43}px;
    align-items: center;
    justify-content: center;
    width: ${CONSTANTS.WIDTH * 0.14}px;
    height: ${CONSTANTS.WIDTH * 0.14}px; 
    background-color: rgba(0, 0, 0, 0.8); 
    border-radius: ${CONSTANTS.WIDTH * 0.04}px; 
    border-width: 2px;
    border-color:  #C19A6B;
`;



export default PotionCreator;