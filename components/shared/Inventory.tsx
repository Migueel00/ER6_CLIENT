import React from 'react';
import { Image, Dimensions, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../helpers/context';

// Obtén la imagen de fondo de los assets locales
const backgroundImageURL = require('../assets/png/profileBackground.png');

const { width, height } = Dimensions.get('window');

const newHeight = height *0.96;

const Equipment = () => {

    return (
        <AppContext.Consumer>
            {({ player }: any) => {
                //console.log(player.inventory);
                const inventory = player.inventory;

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
                ];
                
            // Inicializamos un array de 64 elementos
    const gridItems = Array.from({ length: 54 }, (_, index) => {
        return items[index] || null; // Asignamos un objeto del inventario o null si no hay
    });

    //console.log(gridItems[0].image);
    
    //INSERT BACKGROUNDIMAGE AFTER SAFEAREAVIEW

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)' }}>
            <Header>Inventory</Header>
            <Container>
                <Grid>
                    {gridItems.map((item, index) => (
                        <GridItem key={index}>
                            {item ? (                          
                                <ItemImage source={{ uri: 'https://kaotika.vercel.app/' + item.image }} />
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
    width: ${width  * 1}px;
    height: ${newHeight  * 0.8}px;
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
`;

const ItemImage = styled.Image`
    width: 80%; 
    height: 80%;
    resize-mode: contain;
`;

const EmptyItem = styled.View`
    width: 80%; /* Mismo tamaño que la imagen */
    height: 80%;
    background-color: rgba(255, 255, 255, 0); /* Color de fondo opcional para celdas vacías */
    border-radius: 5px; /* Bordes redondeados para las celdas vacías */
`;


export default Equipment;
