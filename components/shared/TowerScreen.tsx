import React, { useContext, useEffect, useState} from 'react';
import { Dimensions, StyleSheet, Vibration, View } from 'react-native';
import AcolyteContext from '../../helpers/AcolyteContext';
import OutsideTower from './OutsideTower';
import InsideTower from './InsideTower';
import AppContext from '../../helpers/context';

interface updateEvent {
    playerId: string;
    isInsideTower: boolean;
}

const TowerScreen = () => {
    const appContext = useContext(AppContext);
    const acolyteContext = useContext(AcolyteContext);
    const isInsideTower = acolyteContext?.isInsideTower;
    const socket = useContext(AppContext)?.socket;
    const [player, setPlayer] = useState(appContext?.player);
        
    useEffect(() => {

        socket?.on('updateTower', ({  playerId, isInsideTower }: updateEvent) => {
            
            if (player && setPlayer) {
                
                if(player._id === playerId){
                    
                    const updatedPlayer = { ...player, isInsideTower };
                    setPlayer(updatedPlayer);
                    Vibration.vibrate(100);
                    

                }
                }
        });
    }, []);

    return (
        <View style={styles.container}>
            {isInsideTower ? (
                <InsideTower/>
            ) : (
                <OutsideTower/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default TowerScreen;
