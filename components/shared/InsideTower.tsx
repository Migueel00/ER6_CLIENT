import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../helpers/context';

const insideTowerImage = require('../../assets/png/insideTower.png');
const parchmentImage = require('../../assets/png/scroll.png');
const towerIngredientsImage = require('../../assets/png/bag.png');
const { width, height } = Dimensions.get('window');

const TouchableImage = styled.Image`
    width: ${width * 0.30}px;
    height: ${width * 0.65}px;
    margin-top: ${width * 0.2}px;
`;  

const BackgroundImage = styled.ImageBackground`
    width: ${width}px;
    height: ${height}px;
`;

const ImageContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

const InsideTower = () => {
    const appContext = useContext(AppContext);
    const [showParchmentImage, setShowParchmentImage] = useState<boolean>(true);
    const [showIngredientsImage, setShowIngredientsImage] = useState<boolean>(true);
    const ingredients = appContext?.ingredients;
    const newIngredients = appContext?.newIngredients;
    const setIngredients = appContext?.setIngredients!;
    const towerIngredientState = appContext?.tower_ingredients;
    const parchmentState = appContext?.parchment;
    const setParchmentState = appContext?.setParchment!;
    const setTowerIngredientState = appContext?.setTowerIngredientsState!;


    const handleBag = () => {
        setShowIngredientsImage(false);
        console.log("Ingredientes nuevos sin añadir : ");
        console.log(ingredients![0]);
        
        // Crear el array con los ingredientes, sin incluir el último elemento vacío
        const ingredientsWithoutLast = ingredients?.slice(0, -1) || [];
        
        // Añadir los nuevos ingredientes en la penúltima posición
        const updatedIngredients = [...ingredientsWithoutLast, ...(newIngredients || []), { key: 'right-spacer' }];
        
        console.log("Ingredientes nuevos añadidos " + updatedIngredients.length);
        
        setTowerIngredientState(false);
        setIngredients([{ key: 'left-spacer' }, ...updatedIngredients]);    
        
        console.log("INGREDIENTS UPDATED");
        console.log(ingredients);
        
        
    }

    const handleScroll = () => {
        setShowParchmentImage(false);
        setParchmentState(false);
    }
    
    return (
        <BackgroundImage
        source={insideTowerImage}
        >
        <View style={styles.container}>
            <Text style={styles.kaotikaFont}>Inside the tower</Text>
            <ImageContainer>
                { parchmentState &&
                    showParchmentImage ?    
                    <TouchableOpacity onPress={handleScroll}>
                        <TouchableImage source={parchmentImage}/>
                    </TouchableOpacity> 
                : null}
                { towerIngredientState && showIngredientsImage ? 
                    <TouchableOpacity onPress={handleBag}>
                        <TouchableImage source={towerIngredientsImage}/>
                    </TouchableOpacity> 
                : null}
            </ImageContainer>
        </View>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    kaotikaFont: {
        paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white',
    },
});

export default InsideTower;
