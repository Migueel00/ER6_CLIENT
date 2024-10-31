import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions, Vibration } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppContext from '../../helpers/context';

const outsideTowerImage = require('../../assets/png/outsideTower.png');

const OutsideTower = () => {
    const { height, width } = Dimensions.get('window');
    const context = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [towerBackgroundImage, setTowerBackgroundImage] = useState(outsideTowerImage);

    
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <ImageBackground
        source={towerBackgroundImage}
        style={[styles.background, { width: width, height: height }]}
        >
        <View style={styles.container}>
            <Text style={styles.kaotikaFont}>Outside the tower</Text>
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

export default OutsideTower;
