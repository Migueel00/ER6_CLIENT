import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppContext from '../../helpers/context';
import AcolyteContext from '../../helpers/AcolyteContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MortimerContext from '../../helpers/MortimerContext';
import VillainContext from '../../helpers/VillainContext';

const buttonImage = require('../../assets/png/button1.png');
const qrImage = require('../../assets/png/epicQR3.png');
const outsideLabImage = require('../../assets/backgrounds/exitLabBG.png');

const { height, width } = Dimensions.get('window');

const ExitLab = () => {
    const { height, width } = Dimensions.get('window');
    const context = useContext(AppContext);
    const mortimerContext = useContext(MortimerContext);
    const villainContext = useContext(VillainContext);

    // Inicializa el estado isInsideLab con el valor de player.isInsideLab
    const isInsideLab = context?.player.isInsideLab;
    const setLocation = context?.setLocation;
    const isMenuOldSchoolLoadedVillain = villainContext?.isMenuOldSchoolLoaded;
    const isMenuOldSchoolLoadedMortimer = mortimerContext?.isMenuOldSchoolLoaded;
    const [modalVisible, setModalVisible] = useState(false);
    const [screenText, setScreenText] = useState("Angelo's Laboratory Door");
    const [labBackgroundImage, setLabBackgroundImage] = useState(outsideLabImage);

    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

    const handleGoToCorridor = () => {
        console.log("PRESSED SCHOOL BUTTON IN MAP");
        
        setLocation('OLDSCHOOL');
        if(isMenuOldSchoolLoadedVillain){
            console.log("VILLAIN NAVIGATING TO OLDSCHOOL");
            
            navigation.navigate('OLDSCHOOL');
        } else if (isMenuOldSchoolLoadedMortimer) {
            console.log("VILLAIN NAVIGATING TO OLDSCHOOL");
            navigation.navigate('OLDSCHOOL');
        }
    }   

    return (
        <ImageBackground
        source={labBackgroundImage}
        style={[styles.background, { width: width, height: height }]}
        >
        <View style={styles.container}>
            <Text style={styles.kaotikaFont}>{screenText}</Text>



            <StyledButton onPress={handleGoToCorridor}>
                <StyledButtonText>Go back to the corridor</StyledButtonText>
            </StyledButton>

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
        paddingTop: 20
    },
    permissionButton: {
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: '75%',
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
        padding: width * 0.03,
        fontFamily: 'KochAltschrift',
        fontSize: width * 0.08,
        color: 'white',
        top: height * 0.02,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: width * 0.02,
        textDecorationLine: 'underline'
    },
});

const StyledButtonText = styled.Text`
    color: orange;
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    padding: 10px;
`;

const StyledButton = styled(TouchableOpacity)`
    backgroundColor: 'rgba(0, 0, 0, 0.8)';
    height: ${height * 0.1}px;
    width: ${width * 0.65}px;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: ${width * 0.4}px;
    bottom: ${height * 0.03}px;
`;


export default ExitLab;
