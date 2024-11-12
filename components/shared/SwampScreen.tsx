import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';
import MapView from 'react-native-maps';


const swampImage = require('./../../assets/backgrounds/swampBackground.png');
const { height, width } = Dimensions.get('window');

const SwampScreen = () => {

    const context = useContext(AppContext);
    const [swampBackgroundImage, setLabBackgroundImage] = useState(swampImage);


    return (

        <SwampBackground source={swampBackgroundImage}>
        <MapView
            style={{ width: '100%', height: '100%' }}  // Asigna el tamaño completo del mapa
            initialRegion={{
                latitude: 43.309682,
                longitude: -2.002456,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }}
        />
    </SwampBackground>

    );
};
const SwampBackground = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: ${width}px;
    height: ${height}px;
`;
const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 20px;
`;

const PermissionButton = styled(TouchableOpacity)`
    padding: 10px;
    border-radius: 5px;
`;

const ButtonImageBackground = styled.ImageBackground`
    justify-content: center;
    align-items: center;
    width: 315px;
    height: 80px;
`;

const KaotikaButton = styled.Text`
    background-color: transparent;
    font-family: 'KochAltschrift';
    font-size: 30px;
`;

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
`;

const KaotikaFont = styled.Text`
    padding-top: 20px;
    font-family: 'KochAltschrift';
    font-size: 40px;
    color: white;
`;

export default SwampScreen;
