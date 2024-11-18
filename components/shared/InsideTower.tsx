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
    font-size: ${width * 0.14}px;
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
const TouchableButton = styled.TouchableOpacity`
    border-width: 1px;
    border-color: black;
    border-radius: ${width * 0.06}px;
    width: ${width * 0.4}px;
    height: ${height * 0.08}px;
    padding: ${width * 0.01}px;
    margin-top: ${width * 0.06}px;
    justify-content: center;
    align-items: center;

`
const ButtonText = styled.Text`
    color: black;
    font-size: ${width * 0.03}px;
`

const InsideTower = () => {
    const appContext = useContext(AppContext);
    const ingredients = appContext?.ingredients;
    const newIngredients = appContext?.newIngredients;
    const setIngredients = appContext?.setIngredients!;
    const unmodifiedIngredients = appContext?.ingredientsUnmodified;
    const towerIngredientState = appContext?.tower_ingredients;
    const parchmentState = appContext?.parchment;
    const setParchmentState = appContext?.setParchment!;
    const setTowerIngredientState = appContext?.setTowerIngredientsState!;
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [cypherMessage, setCypherMessage] = useState<string>("a,,br e h  - h  ,  a  ,i,,r,,ah c a z/,  s, ,  t, , n e i,d,  ,er,g,  , n ,i /,  ,  v  ed  ,,. y  l,f.,,r  ,,ev,,  r  ,e  s-a,,k  ,it  oa,k//,  :sp,t, , th");
    const [isDecyphered, setIsDecyphered] = useState<boolean>(false);

    const handleBag = () => {
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
        setModalVisible(true);
    }

    const handleModal = () => {
        setCypherMessage("https://kaotika-server.fly.dev/ingredients/zachariah-herbal");
        setIsDecyphered(true);
        ToastAndroid.show("You Decypher the message", ToastAndroid.SHORT);
    }

    const getParchment = () => {
        setModalVisible(false);
        setParchmentState(false);
        ToastAndroid.show("You have get the parchment", ToastAndroid.SHORT);
    }

    return (
        <BackgroundImage source={insideTowerImage}>
            <View style={styles.container}>
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    {/* Contenedor absoluto para centrar el modal */}
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>{cypherMessage}</Text>
                        { !isDecyphered ?       
                            <TouchableButton 
                                onPress={handleModal}>
                                <ButtonText>
                                    Decypher Message
                                </ButtonText>
                            </TouchableButton> 
                        :         
                            <TouchableButton 
                                onPress={getParchment}>
                                <ButtonText>
                                    Get Parchment
                                </ButtonText>
                            </TouchableButton> }
                        </View>
                    </View>
                </Modal>

                <Text style={styles.kaotikaFont}>You are Inside the tower</Text>
                <ImageContainer>
                    {parchmentState ? (
                        <TouchableOpacity onPress={handleScroll}>
                            <TouchableImage source={parchmentImage} />
                        </TouchableOpacity>
                    ) : null}
                    {towerIngredientState ? (
                        <TouchableOpacity onPress={handleBag}>
                            <TouchableImage source={towerIngredientsImage} />
                        </TouchableOpacity>
                    ) : null}
                </ImageContainer>
                {parchmentState || towerIngredientState ? (
                    <TextContainer>
                        <TextHelper>Press the items to get them</TextHelper>
                    </TextContainer>
                ) : (
                    <TextContainer>
                        <TextHelper>Items already obtained</TextHelper>
                    </TextContainer>
                )}
            </View>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    kaotikaFont: {
        paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: width * 0.10,
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',  // Asegura que el modal esté en la parte superior
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContent: {
        width: width * 0.8,
        height: height * 0.8,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.1
    },
    modalText: {
        fontSize: width * 0.08,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'KochAltschrift',
    },
});

export default InsideTower;
