import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../helpers/context';

const insideTowerImage = require('../../assets/png/insideTower.png');
const parchmentImage = require('../../assets/png/scroll.png');
const towerIngredientsImage = require('../../assets/png/bag.png');
const { width, height } = Dimensions.get('window');

const TouchableImage = styled.Image`
    width: ${width * 0.40}px;
    height: ${width * 0.75}px;
    margin-right: ${width * 0.05}px
`;  

const BackgroundImage = styled.ImageBackground`
    width: ${width}px;
    height: ${height}px;
`;

const ImageContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const InsideTower = () => {
    const appContext = useContext(AppContext);
    const [showParchmentImage, setShowParchmentImage] = useState<boolean>(true);
    const [showIngredientsImage, setShowIngredientsImage] = useState<boolean>(true);
    const ingredients = appContext?.ingredients;
    const newIngredients = appContext?.newIngredients;
    const setIngredients = appContext?.setIngredients;

    const handleBag = () => {
        setShowIngredientsImage(false);
        console.log("Ingredientes nuevos sin añadir : " + ingredients?.length);

        newIngredients?.map(newIngredient => {
            ingredients?.push(newIngredient);
        });

        console.log("Ingredientes nuevos añadidos " + ingredients?.length);
    }

    const handleScroll = () => {
        setShowParchmentImage(false);
    }
    
    return (
        <BackgroundImage
        source={insideTowerImage}
        >
        <View style={styles.container}>
            <Text style={styles.kaotikaFont}>Inside the tower</Text>
            <ImageContainer>
                { showParchmentImage ?    
                    <TouchableOpacity onPress={handleScroll}>
                        <TouchableImage source={parchmentImage}/>
                    </TouchableOpacity> 
                : null}
                { showIngredientsImage ? 
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
