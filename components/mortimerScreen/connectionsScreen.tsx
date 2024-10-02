import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { socket } from '../../App';

interface Player {
    socketId:     string,
    email:        string,
    nickname:     string,
    isInsideLab:  boolean,
    avatar:       string,
    id:           string
}


type ConnectionScreenProps = {
    players: Player[];
    setPlayers: (players: Player[]) => void;
}

const ConnectionScreen: React.FC<ConnectionScreenProps> = ({players, setPlayers}) => {
    useEffect(() => {

        // Escuchar el evento
        socket.on('update', ({ playerId, isInsideLab}) => {
            const updatePlayers = players.map(player => player.id === playerId ? { ...player, isInsideLab} : player);
            
            // Settear players
            setPlayers(updatePlayers);

            console.log("ENTRA AL EVENTO DE UPDATE")

        });

        //limpiar el evento socket
        return () =>{
            socket.off('update');
        }
    }, [players, setPlayers]);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>I salute you mortimer! Check out what your acolytes are doing here!</Text>
        {/* Agrega más contenido o componentes aquí */}
        {players.map((player) => <Text key={player.id}>{player.nickname} - {player.isInsideLab ? "inside"  : "out" }</Text>)}
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
