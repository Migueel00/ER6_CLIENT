import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppContext from '../../helpers/context';
import AcolyteContext from '../../helpers/AcolyteContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const buttonImage = require('../../assets/png/button1.png');
const qrImage = require('../../assets/png/epicQR3.png');
const outsideLabImage = require('../../assets/png/LabEntrance.png');

const { height, width } = Dimensions.get('window');

const OutsideLab = () => {
    const { height, width } = Dimensions.get('window');
    const context = useContext(AppContext);
    const acolyteContext = useContext(AcolyteContext);

    // Inicializa el estado isInsideLab con el valor de player.isInsideLab
    const isInsideLab = context?.player.isInsideLab;
    const setLocation = context?.setLocation;
    const isMenuOldSchoolLoaded = acolyteContext?.isMenuOldSchoolLoaded;
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonText, setButtonText] = useState("Request entrance permission");
    const [screenText, setScreenText] = useState("Angelo's laboratory Door");
    const [labBackgroundImage, setLabBackgroundImage] = useState(outsideLabImage);

    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

    
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleButtonPress = () => {
        if (isInsideLab) {
        setModalVisible(!modalVisible);
        } else {
        toggleModal();
        }
    };

    const handleGoToCorridor = () => {
        console.log("PRESSED SCHOOL BUTTON IN MAP");
        
        setLocation('OLDSCHOOL');
        if(isMenuOldSchoolLoaded){
            console.log("NAVIGATING TO OLDSCHOOL");
            
            navigation.navigate('OLDSCHOOL');
        }
    }   

    const qrValue = {
        userEmail: context?.player.email,
        socketId: context?.socketID,
        playerID: context?.player._id
    };

    return (
        <ImageBackground
        source={labBackgroundImage}
        style={[styles.background, { width: width, height: height }]}
        >
        <View style={styles.container}>
            <Text style={styles.kaotikaFont}>{screenText}</Text>

            <TouchableOpacity onPress={handleButtonPress} style={styles.permissionButton}>
            <ImageBackground
                source={buttonImage}
                style={styles.buttonImageBackground}
                resizeMode="cover"
            >
                <Text style={styles.kaotikaButton}>{buttonText}</Text>
            </ImageBackground>
            </TouchableOpacity>

            <StyledButton onPress={handleGoToCorridor}>
                <StyledButtonText>Go back to the corridor</StyledButtonText>
            </StyledButton>

            <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={toggleModal}
            >
            <View style={styles.modalContainer}>
                <ImageBackground
                source={qrImage}
                style={[styles.qrBackground, { width: width * 0.9, height: height * 0.5 }]}
                resizeMode="cover"
                >
                <QRCode
                    value={qrValue ? JSON.stringify(qrValue) : "No email available"}
                    size={width * 0.43}
                    logoBackgroundColor='transparent'
                    color='#00BFAE'
                    backgroundColor='black'
                />
                </ImageBackground>

                <TouchableOpacity onPress={toggleModal} style={styles.permissionButton}>
                <ImageBackground
                    source={buttonImage}
                    style={styles.buttonImageBackground}
                    resizeMode="cover"
                >
                    <Text style={styles.kaotikaButton}>Hide your medallion</Text>
                </ImageBackground>
                </TouchableOpacity>
            </View>
            </Modal>
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
        padding: 20,
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white',
        top: -20,
    },
});

const StyledButtonText = styled.Text`
    color: white;
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


export default OutsideLab;
