import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppContext from '../../helpers/context';

const insideTowerImage = require('../../assets/png/insideTower.png');

const InsideTower = () => {
    const { height, width } = Dimensions.get('window');
    const context = useContext(AppContext);

    // Inicializa el estado isInsideLab con el valor de player.isInsideLab
    const isInsideTower = context?.player.isInsideTower;
    const [modalVisible, setModalVisible] = useState(false);
    const [towerBackgroundImage, setTowerBackgroundImage] = useState(insideTowerImage);

    
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <ImageBackground
        source={towerBackgroundImage}
        style={[styles.background, { width: width, height: height }]}
        >
        <View style={styles.container}>
            <Text style={styles.kaotikaFont}>Inside the tower</Text>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 20
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

export default InsideTower;
