import React, { useState, useContext } from 'react';
import { ImageBackground, Dimensions } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';

const outsideTowerImage = require('../../assets/png/outsideTower.png');

const { height, width } = Dimensions.get('window');

// Definir factores de escala basados en el tamaño de la pantalla
const scaleWidth = width / 375; // Suponiendo que la referencia sea una pantalla de 375px de ancho (típico en iPhone 6)
const scaleHeight = height / 667; // Suponiendo que la referencia sea una pantalla de 667px de alto (iPhone 6)

// Función para obtener tamaño dinámico basado en la escala
const scale = (size: number) => size * scaleWidth; // O puedes hacer una combinación de scaleWidth y scaleHeight dependiendo de tus necesidades

const OutsideTower = () => {
    const context = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [towerBackgroundImage, setTowerBackgroundImage] = useState(outsideTowerImage);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <TowerBackground source={towerBackgroundImage}>
            <Container>
                <TopText>You're outside the tower</TopText>
                <TextContainer>
                    <CenterText>Place your ID card near the RFID reader to confirm your identity.</CenterText>
                </TextContainer>
            </Container>
        </TowerBackground>
    );
};

// Styled components con tamaño dinámico
const TowerBackground = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: ${width}px;
    height: ${height}px;
`;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: ${scale(20)}px;
    background-color: rgba(0, 0, 0, 0.5); 
`;

const TopText = styled.Text`
    font-family: 'KochAltschrift';
    font-size: ${scale(40)}px;
    color: white;
    text-align: center;
    position: absolute;
    top: ${scale(50)}px;  
    width: 100%;
`;

const TextContainer = styled.View`
    background-color: rgba(0, 0, 0, 0.8);  
    border-radius: ${scale(15)}px;  
    border: 2px solid white; 
    padding: ${scale(20)}px;
    margin-top: ${scale(80)}px;
    width: 80%; 
    align-items: center;
`;

const CenterText = styled.Text`
    font-family: 'KochAltschrift';
    font-size: ${scale(30)}px;
    color: white;
    text-align: center;
`;

export default OutsideTower;
