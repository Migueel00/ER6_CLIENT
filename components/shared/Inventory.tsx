import React from 'react';
import { Image, Dimensions, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../helpers/context';

// Obtén la imagen de fondo de los assets locales
const backgroundImageURL = require('../assets/png/profileBackground.png');

const { width, height } = Dimensions.get('window');

const newHeight = height * 0.96;

const Equipment = () => {
    return (
        <AppContext.Consumer>
            {({ player }: any) => {
                let inventory = player.inventory;

                if(inventory.length <= 0) {
                    return null; // No renderizamos nada si el inventario está vacío
                }

                // Verifica si el inventario está vacío
                const items = [
                    ...inventory.antidote_potions,
                    ...inventory.armors,
                    ...inventory.artifacts,
                    ...inventory.boots,
                    ...inventory.enhancer_potions,
                    ...inventory.healing_potions,
                    ...inventory.helmets,
                    ...inventory.rings,
                    ...inventory.shields,
                    ...inventory.weapons,
                    ...player.ingredients
                ];

                if (items.length === 0) {
                    return null; // No renderizamos nada si el inventario está vacío
                }

                // Inicializamos un array de 64 elementos
                const gridItems = Array.from({ length: 54 }, (_, index) => {
                    return items[index] || null; // Asignamos un objeto del inventario o null si no hay
                });

                return (
                    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)' }}>
                        <Header>Inventory</Header>
                        <Container>
                            <Grid>
                                {gridItems.map((item, index) => (
                                    <GridItem key={index}>
                                        {item ? (
                                            <>
                                                <ItemImage source={{ uri: 'https://kaotika.vercel.app/' + item.image }} />
                                                {item.type === 'ingredient' && (
                                                    <QtyOverlay>
                                                        <QtyNumberContainer>
                                                            <QtyText>{item.qty}</QtyText>
                                                        </QtyNumberContainer>
                                                    </QtyOverlay>
                                                )}
                                            </>
                                        ) : (
                                            <EmptyItem />
                                        )}
                                    </GridItem>
                                ))}
                            </Grid>
                        </Container>
                    </SafeAreaView>
                );
            }}
        </AppContext.Consumer>
    );
};


const Header = styled.Text`
    font-size: ${width * 0.1}px;
    color: white;
    text-align: center;
    margin-bottom: ${newHeight * 0.02}px;
    font-family: KochAltschrift;
    text-decoration-line: underline;
`;

// Styled Components
const BackgroundImage = styled.ImageBackground`
    width: ${width * 1}px;
    height: ${newHeight * 0.8}px;
    padding-bottom: ${width * 0.5}px;
    margin-top: 0px;
`;

const Container = styled.ScrollView`
    padding: 10px;
`;

const Grid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`;

const GridItem = styled.View`
    width: ${width * 0.15}px;
    height: ${width * 0.15}px;
    border-width: 1.5px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    border-radius: ${width * 0.02}px;
    margin-bottom: ${height * 0.004}px;
    position: relative;
`;

const ItemImage = styled.Image`
    width: 80%; 
    height: 80%;
    resize-mode: contain;
`;

const EmptyItem = styled.View`
    width: 80%; 
    height: 80%;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 5px;
`;

const QtyOverlay = styled.View`
    position: absolute;
    top: 60%;
    left: 63%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: ${width * 0.1}px;
    border: white;
    height: ${width * 0.05}px; /* Controla la altura del contenedor */
    width: ${width * 0.05}px;   /* Controla el tamaño del contenedor */
    padding: ${width * 0.01}px;
`;

const QtyNumberContainer = styled.View`
    align-items: center;
    justify-content: center;
    top: -30%;
    left: 2%;
    height: ${width * 0.07}px;
    justify-content: center;
`;

const QtyText = styled.Text`
    color: white;
    font-size: ${width * 0.06}px;
    font-family: KochAltschrift; /* Mantengo el estilo de fuente original */
`;

export default Equipment;