import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppContext from '../helpers/context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Equipment from './Equipment';
import PotionCreator from './PotionCreator';
import OutsideLab from './OutsideLab';
import InsideLab from './InsideLab';
import ProfileScreen3 from './ProfileScreen3';

const LabScreen = () => {
    const context = useContext(AppContext);

    // Inicializa el estado isInsideLab con el valor de player.isInsideLab
    const [isInsideLab, setIsInsideLab] = useState(context?.player.isInsideLab);

    useEffect(() => {
        // Escucha el mensaje del servidor para cambiar isInsideLab
        context?.socket.on('ScanSuccess', (message: string) => {
            console.log("Mensaje del servidor:", message);
    
            // Usa la forma funcional de setState para asegurarte de obtener el valor más reciente de isInsideLab
            setIsInsideLab(!isInsideLab);
        });
    
        return () => {
            context?.socket.off('ScanSuccess');
        };
    }, [isInsideLab]);

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
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
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
