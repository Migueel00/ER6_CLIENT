import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

type HomeScreenProps = {
    role: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ role }) => {
    return (

        <ImageBackground 
            source={require('../assets/png/LabEntrance.png')} // Cambia esta ruta a la imagen que desees
            style={styles.background}
            resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
        >
            <View style={styles.container}>
                <Text style={styles.roboto}>Welcome to Kaotika, {role}</Text>
            </View>
        </ImageBackground>
    );
    };

    const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        height: '100%', 
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Roboto-Thin'
    },
    roboto: {
        fontFamily: 'KochAltschrift',
        fontSize: 30
    }
});

export default HomeScreen;
