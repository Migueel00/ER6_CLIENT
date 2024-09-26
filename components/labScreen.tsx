import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type LabScreenProps = {

}

const LabScreen: React.FC<LabScreenProps> = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to Kaotika's Laboratory</Text>
        {/* Agrega más contenido o componentes aquí */}
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray', // Personaliza el fondo
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default LabScreen;
