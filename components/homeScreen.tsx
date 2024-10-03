import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type HomeScreenProps = {
    role: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ role }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.roboto}>Welcome to Kaotika, {role}</Text>
        {/* Agrega más contenido o componentes aquí */}
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightcoral', // Personaliza el fondo
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Roboto-Thin'
    },
    roboto: {
        fontFamily: 'Roboto-thin',
        fontSize: 20
    }
});

export default HomeScreen;
