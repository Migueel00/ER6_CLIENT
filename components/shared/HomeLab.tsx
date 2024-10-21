import React, {useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppContext from '../../helpers/context';

const buttonImage = require('../../assets/png/button1.png');
const qrImage = require('../../assets/png/epicQR3.png');
const insideLabImage = require('../../assets/png/insideLab.png');


const HomeLab = () => {
    const { height, width } = Dimensions.get('window');
    const context = useContext(AppContext);

    // Inicializa el estado isInsideLab con el valor de player.isInsideLab
    const isInsideLab = context?.player.isInsideLab;
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonText, setButtonText] = useState("Request exit permission");
    const [screenText, setScreenText] = useState("You are inside lab");
    const [labBackgroundImage, setLabBackgroundImage] = useState(insideLabImage);
    
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

export default HomeLab;
