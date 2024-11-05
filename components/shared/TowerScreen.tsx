import React, { useContext, useEffect, useState} from 'react';
import { Dimensions, StyleSheet, Vibration, View } from 'react-native';
import AcolyteContext from '../../helpers/AcolyteContext';
import OutsideTower from './OutsideTower';
import InsideTower from './InsideTower';

const TowerScreen = () => {
    const acolyteContext = useContext(AcolyteContext);
    const isInsideTower = acolyteContext?.isInsideTower;

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
    }

});

export default TowerScreen;
