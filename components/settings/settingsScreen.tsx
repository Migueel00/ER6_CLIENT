import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type SettingScreenProps = {
    setIsLoggedIn: any;
}

const SettingsScreen: React.FC<SettingScreenProps> = ({setIsLoggedIn}) => {
    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        }
        catch (error){

            console.error(error);
        }
    }

    const onPress = async () => {
        await setIsLoggedIn(false);
        await AsyncStorage.clear();
        await signOut();
    }

    return (
        <ImageBackground 
            source={require('../../assets/png/settingsBackground1.png')} // Cambia esta ruta a la imagen que desees
            style={styles.background}
            resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
        >
        <View style={styles.container}>
            <ImageBackground 
                source={require('../../assets/png/button1.png')} // Cambia esta ruta a la imagen que desees
                style={styles.buttonImageBackground}
                resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
            >
                <Text style={styles.kaotikaFont2}>SETTINGS</Text>
            </ImageBackground>
            {/* Agrega más contenido o componentes aquí */}
                <ImageBackground 
                source={require('../../assets/png/button1.png')} // Cambia esta ruta a la imagen que desees
                style={styles.buttonImageBackground}
                resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
                >
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.kaotikaFont2}>LOG OUT</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
        </ImageBackground>
    );
    };

    const styles = StyleSheet.create({
    buttonImageBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 315,  // Tamaño real en pixeles del botón (habrá que refactorizar a full responsive?)
        height: 80,     // Tamaño real en pixeles del botón (habrá que refactorizar a full responsive?)
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent', // Personaliza el fondo
        width: '100%', 
        height: '100%', 
        paddingTop: 20,
        paddingBottom: 50
    },
    kaotikaFont2: {
        //paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white', // Color blanco para el texto principal
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default SettingsScreen;
