import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

interface Player {
    socketId:       String,
    email:          String,
    nickname:       String,
    isInsideLab:    Boolean
}


type ConnectionScreenProps = {
    players: [Player]
}

const ConnectionScreen: React.FC<ConnectionScreenProps> = ({players}) => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>I salute you mortimer! Check out what your acolytes are doing here!</Text>
        {/* Agrega más contenido o componentes aquí */}
        {players.map((player) => <Text>{player.nickname} - {player.isInsideLab ? "inside"  : "out" }</Text>)}
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
