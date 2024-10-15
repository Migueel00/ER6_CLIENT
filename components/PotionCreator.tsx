import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import AppContext from '../helpers/context';

// Obtén la imagen de fondo de los assets locales
const backgroundImageURL = require('../assets/png/settingsBackground1.png');

const { width, height } = Dimensions.get('window');

const PotionCreator = () => {

    const [ingredientsData, setIngredientsData] = useState(null);
    const context = useContext(AppContext);

    const userRole = context?.player.role

    // Se hara un get cada vez que se monte el PotionCreator
    useEffect(() => {
        const getIngredients = async () => {
            try {
                const response = await fetch ('https://kaotika-server.fly.dev/ingredients')

                if (!response.ok){
                    throw new Error('Error en la respuesta de la API');
                }

                let jsonData = await response.json();

                // Mapeo
                const ingredients = jsonData.data.map(({ _id, name, description, value, effects, image, type }: any) => ({
                    id: _id,
                    name,
                    description,
                    value,
                    effects,
                    image,
                    type
                }));

                setIngredientsData(ingredients);

                if (userRole === 'ACOLYTE') {

                    const acolyteIngredients = ingredients.filter(ingredient =>
                        ingredient.effects.some(effect => effect.includes('restore'))
                    );

                    console.log("INGREDIENTES ACOLYTE:");
                    
                    console.log(acolyteIngredients);
                    
                    
                }
                
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