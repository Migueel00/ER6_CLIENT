import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de tenerlo instalado
import styled from 'styled-components/native';
import ScannerScreen from './ScannerScreen';
import SwampScreen from '../shared/SwampScreen';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AnotherComponent: React.FC = () => {
    return (
        <ComponentContainer>
            <ComponentText>Another Component</ComponentText>
        </ComponentContainer>
    );
};

const IstvanToolsScreen: React.FC = () => {
    const [selectedTool, setSelectedTool] = useState<string>('No tool selected');

    const renderSelectedTool = (): JSX.Element => {
        switch (selectedTool) {
            case 'Camera':
                return <ScannerScreen />;
            case 'Geolocalization Map':
                return <SwampScreen />;
            default:
                return <DefaultText>Choose which tool you want to use</DefaultText>;
        }
    };

    return (
        <Container>
            {/* Desplegable */}
            <PickerContainer>
                <Picker
                    selectedValue={selectedTool}
                    onValueChange={(itemValue: string) => setSelectedTool(itemValue)}
                    style={styles.picker}
                    >
                    <Picker.Item label="No tool selected" value="No tool selected" style={styles.pickerItem} />
                    <Picker.Item label="Morghul's Eye" value="Camera" style={styles.pickerItem}/>
                    <Picker.Item label="Geolocalization Map" value="Geolocalization Map" style={styles.pickerItem} />
                </Picker>
            </PickerContainer>

            {/* Contenido dinámico basado en la selección */}
            <ContentContainer>{renderSelectedTool()}</ContentContainer>
        </Container>
    );
};

export default IstvanToolsScreen;

const Container = styled.View`
    flex: 1;
    padding-top: ${height*0.002}px;
    background-color: black;
`;

const ContentContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const DefaultText = styled.Text`
    font-size: 18px;
    color: #333;
    text-align: center;
`;

const ComponentContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

const ComponentText = styled.Text`
    font-size: 16px;
    color: #666;
`;

const PickerContainer = styled.View`
    height: ${height * 0.1}px;
    background-color: black;
    border-top-color: black;
    border-top-width: ${width * 0.01}px;
    width: '100%'; /* Establece un tamaño de contenedor fijo si es necesario */
`;

const styles = StyleSheet.create({
    picker: {
        backgroundColor: 'rgba(0,0,0,0.95)',
        color: 'white',
        borderWidth: 0, // Elimina cualquier borde
    },
    pickerItem: {
        backgroundColor: 'rgba(0,0,0,0.95)',
        fontFamily: 'KochAltschrift',
        fontSize: width * 0.06,
        color: 'white',
        borderColor: 'black',
        borderWidth: 0,
    }
});
