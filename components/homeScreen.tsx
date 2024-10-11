import React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AppContext from '../helpers/context';

const HomeScreen = () => {
    const {height, width} = Dimensions.get('window');

    return (
        <AppContext.Consumer>
            {({userRole}: any) => (
                <ImageBackground 
                    source={require('../assets/png/HomeScreen.png')} // Cambia esta ruta a la imagen que desees
                    style={[styles.background, { width: width, height: height }]}
            >
                        <View style={styles.container}>
                            <Text style={styles.kaotikaFont}>
                            Welcome to <Text style={styles.kaotika}>KA<Text style={styles.o}>O</Text>TIKA</Text>
                            </Text>
                            <Text style={styles.kaotikaFont2}>
                                {userRole}
                            </Text>
                        </View>
                </ImageBackground>
            )}

        </AppContext.Consumer>
    )
}
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
