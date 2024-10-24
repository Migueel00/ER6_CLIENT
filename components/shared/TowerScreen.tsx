import React, { useContext} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import AcolyteContext from '../../helpers/AcolyteContext';
import OutsideTower from './OutsideTower';
import InsideTower from './InsideTower';

const TowerScreen = () => {
    const acolyteContext = useContext(AcolyteContext);
    const isInsideLab = acolyteContext?.isInsideTower;

    return (
        <View style={styles.container}>
            {isInsideLab ? (
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
