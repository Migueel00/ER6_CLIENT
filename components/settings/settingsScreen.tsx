import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import Button from '../button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type SettingScreenProps = {
    setIsLoggedIn: any;
}

const SettingsScreen: React.FC<SettingScreenProps> = ({setIsLoggedIn}) => {
    const {height, width} = Dimensions.get('window')
    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        }
        catch (error){

            console.error(error);
        }
    }

    const onPress = () => {
        setIsLoggedIn(false);
        AsyncStorage.clear();
        signOut();
    }

    return (
        <ImageBackground 
            source={require('../../assets/png/settingsBackground1.png')}
            style={[styles.background, { width: width, height: height }]}
        >
        <View style={styles.container}>
            <ImageBackground 
                source={require('../../assets/png/button1.png')}
                style={[styles.buttonImageBackground, { width: width * 0.6, height: height * 0.1 }]}
            >
                <Text style={styles.kaotikaFont2}>SETTINGS</Text>
            </ImageBackground>
            {/* Agrega más contenido o componentes aquí */}
                <ImageBackground 
                source={require('../../assets/png/button1.png')}
                style={[styles.buttonImageBackground, { width: width * 0.6, height: height * 0.1 }]} 
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
