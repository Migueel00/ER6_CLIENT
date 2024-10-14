import React, { useEffect } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


interface Player {
    socketId:     string,
    email:        string,
    nickname:     string,
    isInsideLab:  boolean,
    avatar:       string,
    id:           string,
    role:         string,
}


type ConnectionScreenProps = {
    players: Player[];
    setPlayers: (players: Player[]) => void;
    socket: any;
}

const ConnectionScreen: React.FC<ConnectionScreenProps> = ({players, setPlayers, socket}) => {
    const {height, width} = Dimensions.get('window')
    useEffect(() => {

        // Escuchar el evento
        socket.on('update', ({ playerId, isInsideLab}) => {
            const updatePlayers = players.map(player => player.id === playerId ? { ...player, isInsideLab} : player);
            
            // Settear players
            setPlayers(updatePlayers);

            console.log("ENTRA AL EVENTO DE UPDATE");

        });

        //limpiar el evento socket
        return () =>{
            socket.off('update');
        }
    }, [players, setPlayers]);

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
                    {players.map((player) => 
                    <View key={player.id} style={styles.playerItem}> 
                        
                        <Image source={{uri: player.avatar }} style={{width: width*0.10, height: height*0.05}}></Image>
                        <Text style={styles.kaotikaFont2}>{player.nickname}</Text>
                        <Icon 
                                name={player.isInsideLab ? 'circle' : 'circle-o'} 
                                size={width*0.07} 
                                color={player.isInsideLab ? 'green' : 'grey'}
                            />
                    </View>)}
                </View>
                </View>
        </ImageBackground>
    );
};  
    const {width, height} = Dimensions.get('window');

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding:    10,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    kaotikaFont2: {
        fontFamily: 'KochAltschrift',
        fontSize: width*0.06,
        color: 'white', 
        marginVertical: 5,
        textAlign: 'left',
        marginLeft: 10,
        width: '90%'
    },
    kaotikaFontHeads: {
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white',
        marginBottom: 0, 
    },
    kaotikaFontHeads2: {
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'red',
        marginBottom: 0, 
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
        flexDirection:  'row',
        alignItems: 'center',
        marginLeft: 10,
        borderBottomColor: 'orange',
        paddingBottom: 20,
        borderBottomWidth: 2,
        marginBottom: 20
    },
});

export default ConnectionScreen;