import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ImageBackground, Dimensions} from 'react-native';
import { socket } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome'

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
    // circle-dot
    
    return (
        <ImageBackground
            source={require('../../assets/png/connectionsBackground.png')} // Cambia esta ruta a la imagen que desees
            style={styles.background}
            resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
            >
                <View style={styles.container}>
                <Text style={styles.kaotikaFontHeads}>I salute you mortimer! Check out what your acolytes are doing here!</Text>
                <View style={styles.playersList}>
                    {players.map((player) => 
                    <View key={player.id} style={styles.playerItem}> 
                        <Icon 
                            name="user" 
                            size={20} 
                            color="white" 
                            style={styles.userIcon} 
                        />
                        <Text style={styles.kaotikaFont2}>{player.nickname}</Text>
                        <Icon 
                                name={player.isInsideLab ? 'circle' : 'circle-o'} 
                                size={20} 
                                color={player.isInsideLab ? 'green' : 'grey'}
                            />
                    </View>)}
                </View>
                {/* Agrega más contenido o componentes aquí */}
                </View>
        </ImageBackground>
    );
};  

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
        //paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 20,
        color: 'white', 
        marginVertical: 5,
        textAlign: 'left',
        marginLeft: 10,
        width: '90%'
    },
    kaotikaFontHeads: {
        //paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white',
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
        flexDirection:  'row',
        alignItems: 'center',
        marginVertical: 5,
        marginLeft: 10
    },
    userIcon: {
        marginRight: 10, // Espacio entre el ícono de estado y el ícono de usuario
    },
});

export default ConnectionScreen;
