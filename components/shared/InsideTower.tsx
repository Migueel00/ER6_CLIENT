import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions, ToastAndroid } from 'react-native';
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
    margin-right: ${width * 0.10}px;
    margin-left: ${width * 0.10}px;
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

const TextContainer = styled.View`  
    width: ${width * 0.80}px;
    height: ${width * 0.55}px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: ${width * 0.08}px;
    margin-top: ${width * 0.05}px;
    padding: ${width * 0.06}px;
`;

const TextHelper = styled.Text`
    font-size: ${width * 0.10}px;
    font-family: 'KochAltschrift';
    color: white;
    text-align: center;
`
const TextTitle = styled.Text`
    font-size: ${width * 0.06}px;
    font-family: 'KochAltschrift';
    color: white;
    text-align: left;
`


const InsideTower = () => {
    const appContext = useContext(AppContext);
    const [showParchmentImage, setShowParchmentImage] = useState<boolean>(true);
    const [showIngredientsImage, setShowIngredientsImage] = useState<boolean>(true);
    const ingredients = appContext?.ingredients;
    const newIngredients = appContext?.newIngredients;
    const setIngredients = appContext?.setIngredients!;
    const unmodifiedIngredients = appContext?.ingredientsUnmodified;
    const towerIngredientState = appContext?.tower_ingredients;
    const parchmentState = appContext?.parchment;
    const setParchmentState = appContext?.setParchment!;
    const setTowerIngredientState = appContext?.setTowerIngredientsState!;


    const handleBag = () => {
        setShowIngredientsImage(false);
        console.log("Ingredientes nuevos sin añadir : ");
        console.log(newIngredients![1]);
        
        // Crear el array con los ingredientes, sin incluir el último elemento vacío
        const ingredientsWithoutLast = ingredients?.slice(0, -1) || [];
        
        // Añadir los nuevos ingredientes en la penúltima posición
        const updatedIngredients = [...ingredientsWithoutLast, ...(newIngredients || [])];
        
        console.log("NEW INGREDIENTS TO ADD");
        
        for(let i = 0; i < newIngredients?.length!; i++) {
            unmodifiedIngredients!.push(newIngredients![i])
        }

        console.log("UNMODIFIED INGREDIENTS AFTER PUSH");
        console.log(unmodifiedIngredients);
        

        console.log("Ingredientes nuevos añadidos " + updatedIngredients.length);
        
        setTowerIngredientState(false);
        setIngredients([{ key: 'left-spacer' }, ...(unmodifiedIngredients || []), { key: 'right-spacer' }]);    
        
        console.log("INGREDIENTS UPDATED");
        console.log(ingredients);
        
        ToastAndroid.show("New ingredients obtained!!", ToastAndroid.SHORT);
    }

    const handleScroll = () => {
        setShowParchmentImage(false);
        setParchmentState(false);
        ToastAndroid.show("Scroll obtained!!", ToastAndroid.SHORT);
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
            { parchmentState || towerIngredientState ?          
                <TextContainer>
                    <TextTitle>Info: </TextTitle>    
                    <TextHelper>Press The items to get its</TextHelper>
                </TextContainer> : 
                <TextContainer>
                    <TextHelper>Items already obtained</TextHelper>
                </TextContainer>
            }
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
