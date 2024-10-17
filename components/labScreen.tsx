import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import AppContext from '../helpers/context';
import InsideLab from './InsideLab';
import OutsideLab from './OutsideLab';
import AcolyteContext from '../helpers/AcolyteContext';

const LabScreen = () => {
    const { height, width } = Dimensions.get('window');
    const acolyteContext = useContext(AcolyteContext);
    const isInsideLab = acolyteContext?.isInsideLab;
    
    return (
        <View style={styles.container}>
            {isInsideLab ? (
                <InsideLab/>
            ) : (
                <OutsideLab/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrBackground: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        height: '100%',
    },
    permissionButton: {
        padding: 10,
        borderRadius: 5,
    },
    buttonImageBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 315,
        height: 80,
    },
    kaotikaButton: {
        backgroundColor: 'transparent',
        fontFamily: 'KochAltschrift',
        fontSize: 30
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    kaotikaFont: {
        paddingTop: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white',
    },
});

export default LabScreen;
