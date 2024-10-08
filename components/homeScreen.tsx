import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

type HomeScreenProps = {
    role: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ role }) => {
    return (
        <ImageBackground 
            source={require('../assets/png/HomeScreen.png')} // Cambia esta ruta a la imagen que desees
            style={styles.background}
            resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
        >
            <View style={styles.container}>
                <Text style={styles.kaotikaFont}>
                    Welcome to <Text style={styles.kaotika}>KA<Text style={styles.o}>O</Text>TIKA</Text>
                </Text>
                <Text style={styles.kaotikaFont2}>
                    {role}
                </Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%', 
        height: '100%', 
        paddingTop: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Roboto-Thin'
    },
    kaotikaFont: {
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white', // Color blanco para el texto principal
    },
    kaotikaFont2: {
        paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white', // Color blanco para el texto principal
    },
    kaotika: {
        color: 'white', // Color blanco para "Kati" y "ka"
    },
    o: {
        color: 'orange', // Color naranja para la "o"
    }
});

export default HomeScreen;
