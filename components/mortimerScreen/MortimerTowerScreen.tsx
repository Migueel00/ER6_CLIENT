import React, { useEffect, useState, useContext} from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';

interface updateTowerEvent {
    playerId: string;
    isInsideTower: boolean;
}

const { height, width } = Dimensions.get('window');

const radius = width * 0.3;

const calculatePlayerPositions = (activePlayers: any[]) => {
    return activePlayers.map((_: any, index: any) => {
        if (activePlayers.length === 1) {
            return { x: 0, y: 0 };
        } else {
            const angle = ((2 * Math.PI) / activePlayers.length) * index + Math.PI / 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            return { x, y };
        }
    });
}

const MortimerTowerScreen = () => {
    const socket = useContext(AppContext)?.socket;
    const players = useContext(AppContext)?.players!;
    const setPlayers = useContext(AppContext)?.setPlayers;
    const [activePlayers, setActivePlayers] = useState(players.filter(player => player.isInsideTower));
    const [playerPositions, setPlayerPositions] = useState(calculatePlayerPositions(activePlayers));
    const [hasEmitted, setHasEmitted] = useState(false); // Estado para controlar el emit

    useEffect(() => {
        console.log("ENTRA AL USEFFECT");

        // Escuchar el evento
        socket.on('updateTower', ({ playerId, isInsideTower }: updateTowerEvent) => {
            const updatePlayers = players.map(player =>
                player.id === playerId ? { ...player, isInsideTower } : player
            );

            console.log(updatePlayers);
            setPlayers(updatePlayers);

            console.log("PLAYER ID" + playerId);
            console.log("IS INSIDE TOWER " + isInsideTower);
            console.log("ENTRA AL EVENTO DE UPDATE");

            const newActivePlayers = updatePlayers.filter(player => player.isInsideTower);
            setActivePlayers(newActivePlayers);

            // if (!hasEmitted) { // Verifica si ya se hizo emit
            //     socket.emit("CloseDoor", "Close the door");
            //     setHasEmitted(true); // Marca el emit como hecho
            // }
        });

        // Limpiar el evento socket
        return () => {
            socket.off('updateTower');
        };
    }, [socket, players, setPlayers]);

    // useEffect(() => {
    //     // Resetear el emit después de 5 segundos si no se ha vuelto a emitir
    //     const resetEmit = setTimeout(() => {
    //         setHasEmitted(false);
    //     }, 5000);

    //     // Limpiar el timeout si el componente se desmonta o se actualiza
    //     return () => clearTimeout(resetEmit);
    // }, [hasEmitted]);

    useEffect(() => {
        setPlayerPositions(calculatePlayerPositions(activePlayers));
    }, [activePlayers]);

    console.log("ACTIVE PLAYERS IN THE TOWER");
    console.log(activePlayers);
    
    console.log("PLAYERS POSITIONS");
    console.log(playerPositions);
    
    

    return (
        <AppContext.Consumer>
            {({ players}: any) => {

                return (
                    <ImageBackground
                        source={require('../../assets/png/insideTower.png')}
                        style={[styles.background, { width: width, height: height }]}
                    >
                        <View style={styles.container}>
                            <Text style={styles.kaotikaFontHeads}>Check what the Acolytes'</Text>
                            <Text style={styles.kaotikaFontHeads}>are doing with your</Text>
                            <Text style={styles.kaotikaFontHeads2}>GODLY EYE</Text>
                           
                            <PlayerContainer>
                                {activePlayers.map((player, index) => {
                                    const position = playerPositions[index]; // Get the position for the current player
                                    if (!position) return null; // Check if the position is undefined; if so, skip rendering

                                    return (
                                        <AvatarWrapper
                                            key={player.id}
                                            style={{
                                                transform: [
                                                    { translateX: position.x }, // Use the x coordinate for translation
                                                    { translateY: position.y }  // Use the y coordinate for translation
                                                ]
                                            }}
                                        >
                                            <Avatar source={{ uri: player.avatar }} />
                                        </AvatarWrapper>
                                    );
                                })}
                            </PlayerContainer>
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

// Styled components
const PlayerContainer = styled.View`
    position: relative;
    width: ${width}px;
    height: ${width}px;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0);
`;

const AvatarWrapper = styled.View`
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border-width: 2px;
    border-color: white;
    overflow: hidden;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 30px;
`;

export default MortimerTowerScreen;
