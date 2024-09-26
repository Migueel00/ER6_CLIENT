import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ConnectionScreenProps = {

}

const ConnectionScreen: React.FC<ConnectionScreenProps> = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>I salute you mortimer! Check out what your acolytes are doing here!</Text>
        {/* Agrega más contenido o componentes aquí */}
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green', // Personaliza el fondo
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default ConnectionScreen;
