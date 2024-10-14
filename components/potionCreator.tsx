import React from 'react';
import { Dimensions, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';

// Obtén la imagen de fondo de los assets locales
const backgroundImageURL = require('../assets/png/settingsBackground1.png');

const { width, height } = Dimensions.get('window');

const PotionCreator = () => {
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