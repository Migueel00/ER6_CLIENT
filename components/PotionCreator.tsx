import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ImageBackground, StyleSheet, StatusBar, Animated, FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../helpers/context';

const backgroundImageURL = require('../assets/png/settingsBackground1.png');
const defaultPotionImage = require('../assets/png/potion.png');
const { width, height } = Dimensions.get('window');

const ITEM_SIZE = width * 0.50;

const CONSTANTS = {
    ITEM_SIZE,
    SPACING: 10,
    WIDTH: width,
    SPACER_ITEM_SIZE: (width - ITEM_SIZE) / 2,
};

const PotionCreator = () => {
    const [ingredients, setIngredients] = useState([]);
    const context = useContext(AppContext);
    const userRole = context?.player?.role;

    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const response = await fetch('https://kaotika-server.fly.dev/ingredients');
                if (!response.ok) throw new Error('Error en la respuesta de la API');
                
                const jsonData = await response.json();
                const ingredientsData = jsonData.data.map(({ _id, name, description, value, effects, type }: any) => ({
                    id: _id,
                    name,
                    description,
                    value,
                    effects,
                    type
                }));

                const filteredIngredients = ingredientsData.filter(ingredient => {

                    switch (userRole){
                        case 'ACOLYTE':
                            return ingredient.effects.some(effect => effect.includes('restore'));

                        case 'VILLAIN':
                            return ingredient.effects.some(effect => effect.includes('damage'));
                    }
                });

                setIngredients([{ key: 'left-spacer' }, ...filteredIngredients, { key: 'right-spacer' }]);
            } catch (error) {
                console.log(error);
            }
        };

        getIngredients();
    }, [userRole]);

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
                            <PotionContainer>
                                <Potion as={Animated.View} style={{ transform: [{ translateY }] }}>
                                    <PotionImage source={imageSource} />
                                    <PotionTitle numberOfLines={1}>{item.name}</PotionTitle>
                                    <PotionDescription numberOfLines={3}>{item.description}</PotionDescription>
                                </Potion>
                            </PotionContainer>
                        );
                    }}
                />
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

const PotionTitle = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

const PotionDescription = styled.Text`
    font-size: 12px;
    color: #FFF;
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