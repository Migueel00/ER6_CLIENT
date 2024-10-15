import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';

// Obtén la imagen de fondo de los assets locales
const backgroundImageURL = require('../assets/png/settingsBackground1.png');

const { width, height } = Dimensions.get('window');

const PotionCreator = () => {

    const [ingredientsData, setIngredientsData] = useState(null);

    // Se hara un get cada vez que se monte el PotionCreator
    useEffect(() => {
        const getIngredients = async () => {
            try {
                const response = await fetch ('https://kaotika-server.fly.dev/ingredients')

                if (!response.ok){
                    throw new Error('Error en la respuesta de la API');
                }

                const jsonData = await response.json();

                setIngredientsData(jsonData);
                
            } catch (error){
                console.log(error);
            }
        }

        getIngredients();
    }, [])
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                source={backgroundImageURL}
                style={styles.backgroundImage}
            >
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: width,
        height: height,
    },
});

export default PotionCreator;