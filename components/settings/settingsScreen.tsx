import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../button';
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

    const onPress = () => {
        setIsLoggedIn(false);
        AsyncStorage.clear();
        signOut();
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Your are in settings!</Text>
        {/* Agrega más contenido o componentes aquí */}
        <Button onPress={onPress} title='Log out'></Button>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue', // Personaliza el fondo
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default SettingsScreen;
