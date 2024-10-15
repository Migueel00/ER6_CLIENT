import React, { useEffect, useState, useContext} from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from '../../helpers/context'; // Asegúrate de ajustar esta ruta

interface updateEvent {
    playerId: string;
    isInsideLab: boolean;
}

const ConnectionScreen = () => {
    const { height, width } = Dimensions.get('window');
    
    const socket = useContext(AppContext)?.socket;
    const players = useContext(AppContext)?.players!;
    const setPlayers = useContext(AppContext)?.setPlayers;


    useEffect(() => {

        console.log("ENTRA AL USEFFECT")
        // Escuchar el evento
        socket.on('update', ({ playerId  , isInsideLab } : updateEvent) => {
            const updatePlayers = players.map(player  => player.id === playerId ? { ...player, isInsideLab } : player );
            
            console.log(updatePlayers);
            
            // Settear players
            setPlayers(updatePlayers);
            console.log("PLAYER ID" + playerId);
            console.log("IS INSIDE LAB " + isInsideLab);
            console.log("ENTRA AL EVENTO DE UPDATE");
        });

        // Limpiar el evento socket
        return () => {
            socket.off('update');
        };
    }, [players, setPlayers]);

    // useEffect(() => {
    //     // Escuchar el evento
    //     socket.on('update', ({ playerId, isInsideLab }: updateEvent) => {
    //         setPlayers(prevPlayers => 
    //             prevPlayers.map(player => player.id === playerId ? { ...player, isInsideLab } : player)
    //         );
    
    //         console.log("ENTRA AL EVENTO DE UPDATE");
    //         console.log("PLAYER ID" + playerId);
    //         console.log("IS INSIDE LAB " + isInsideLab);
    //     });
    
    //     // Limpiar el evento socket
    //     return () => {
    //         socket.off('update');
    //     };
    // }, [players, socket]);

    return (
        <AppContext.Consumer>
            {({ players}: any) => {

                return (
                    <ImageBackground
                        source={require('../../assets/png/connectionsBackground.png')}
                        style={[styles.background, { width: width, height: height }]}
                    >
                        <View style={styles.container}>
                            <Text style={styles.kaotikaFontHeads}>Check what the Acolytes'</Text>
                            <Text style={styles.kaotikaFontHeads}>are doing with your</Text>
                            <Text style={styles.kaotikaFontHeads2}>GODLY EYE</Text>
                            <View style={styles.playersList}>
                                {players.map((player: any) => (
                                    <View key={player.id} style={styles.playerItem}>
                                        <Image source={{ uri: player.avatar }} style={{ width: width * 0.13, height: height * 0.06, borderRadius: 50 }} />
                                        <Text style={styles.kaotikaFont2}>{player.nickname}</Text>
                                        <Icon
                                            name={player.isInsideLab ? 'circle' : 'circle-o'}
                                            size={width * 0.07}
                                            color={player.isInsideLab ? 'green' : 'grey'}
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </ImageBackground>
                );
            }}
        </AppContext.Consumer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    kaotikaFont2: {
        fontFamily: 'KochAltschrift',
        color: 'white',
        marginVertical: 5,
        textAlign: 'left',
        marginLeft: 10,
        width: '90%',
        fontSize: Dimensions.get('window').width * 0.08
    },
    kaotikaFontHeads: {
        fontFamily: 'KochAltschrift',
        fontSize: Dimensions.get('window').width * 0.11,
        color: 'white',
        marginBottom: 0,
    },
    kaotikaFontHeads2: {
        fontFamily: 'KochAltschrift',
        fontSize: Dimensions.get('window').width * 0.12,
        color: 'red',
        marginBottom: 20,
    },
    playersList: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
        width: '90%',
    },
    playerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        borderBottomColor: 'orange',
        paddingBottom: 20,
        borderBottomWidth: 2,
        marginBottom: 20,
    },
});

export default ConnectionScreen;
