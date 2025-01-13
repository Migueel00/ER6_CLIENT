import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, Modal, Vibration, TouchableOpacity, Animated } from "react-native";
import AppContext from "../../helpers/context";
import { Player } from "../../interfaces/contextInterface";

const { height, width } = Dimensions.get('window');

const CustomBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
    background-color: black;
    padding: ${height * 0.02}px;
    border-radius: ${width * 0.05}px;
    align-items: center;
    width: 80%;
`;

const ModalText = styled.Text`
    font-size: ${width * 0.08}px;
    color: white;
    font-family: KochAltschrift;
    text-align: center;
    margin-bottom: ${height * 0.02}px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: ${height * 0.01}px;
`;

const RedButton = styled.TouchableOpacity`
    background-color: red;
    padding: 10px 20px;
    border-radius: ${width * 0.02}px;
    margin-right: ${width * 0.1}px;
`;

const GreenButton = styled.TouchableOpacity`
    background-color: green;
    padding: 10px 20px;
    border-radius: ${width * 0.02}px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.08}px;
    text-align: center;
    font-family: KochAltschrift;
`;

const AvatarWrapper = styled.View`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: ${width * 0.5}px;
    border-width: ${width * 0.004}px;
    border-color: white;
    overflow: hidden;
    margin: 0 ${width * 0.05}px;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: ${width * 0.4}px;
`;

const background = require('../../assets/backgrounds/inn.png');
const angeloAvatar = require('../../assets/icons/angelo.png');

const MessageContainer = styled(Animated.View)`
    position: absolute;
    top: 20%;
    padding: ${height * 0.02}px;
    border-radius: ${width * 0.05}px;
    width: 80%;
    align-items: center;
`;

const MessageText = styled.Text`
    font-size: ${width * 0.1}px;
    color: red;
    font-family: KochAltschrift;
    text-align: center;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9);
`;

const InnScreen = () => {
    const appContext = useContext(AppContext);
    const player = appContext?.player;
    const socket = appContext?.socket;
    const setPlayer = appContext?.setPlayer;
    const players = appContext?.players;
    const setPlayers = appContext?.setPlayers;

    const [isModalVisible, setModalVisible] = useState(false);
    const [isBetrayer, setIsBetrayer] = useState(player?.isBetrayer);
    const [showAngelo, setShowAngelo] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showBetrayMessage, setShowBetrayMessage] = useState(false);
    const [showLoyalMessage, setShowLoyalMessage] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    const angelo = players?.find(player => player.role === 'ANGELO');

  

    useEffect(() => {
        socket.on('IsCaptured', (updatedPlayer: Player) => {
            const updatedPlayers = players?.map(player =>
                player.role === 'ANGELO' ? { ...player, isCaptured: updatedPlayer.isCaptured } : player
            );
            setPlayers(updatedPlayers);
        });

        return () => {
            socket.off('IsCaptured');
        };
    }, [socket, players, setPlayers]);

    useEffect(() => {
        if (!player?.isBetrayer && player?.role === 'ACOLYTE') {
            setModalVisible(true);
        }
    }, [player]);

    const handleBetray = () => {
        setModalVisible(false);
        setShowBetrayMessage(true);
        Vibration.vibrate(200);

        const value = {
            playerID: player?._id,
            isBetrayer: player?.isBetrayer
        };

        socket.emit("UpdateBetrayer", player);

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => setShowBetrayMessage(false));
        }, 2000);
    };

    const handleLoyal = () => {
        setModalVisible(false);
        setShowLoyalMessage(true);

        if (!angelo?.isCaptured) {
            setShowAngelo(true);
        }
        console.log("Remains Loyal");

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => setShowLoyalMessage(false));
        }, 2000);
    };

    const handleAngeloPress = () => {
        console.log("Angelo clicked!");
        setShowAngelo(false);
        Vibration.vibrate(200);

        const value = {
            playerID: angelo?._id,
            isBetrayer: angelo?.isCaptured
        };

        socket.emit("UpdateCaptured", value);

        setShowMessage(true);

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => setShowMessage(false));
        }, 2000);
    };

    return (
        <CustomBackground source={background}>
            <Modal
                transparent
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <ModalContainer>
                    <ModalContent>
                        <ModalText>
                            To the wanderer
                            who dares to defy their bloodline: forsake your kin and pledge your
                            loyalty to the Brotherhood of Shadows. In return, claim 10,000 gold coins
                            and the coveted Rotten Set of the Decrepit Betrayer. Your destiny awaits.
                        </ModalText>
                        <ButtonContainer>
                            <RedButton onPress={handleBetray}>
                                <ButtonText>Betray</ButtonText>
                            </RedButton>
                            <GreenButton onPress={handleLoyal}>
                                <ButtonText>Loyal</ButtonText>
                            </GreenButton>
                        </ButtonContainer>
                    </ModalContent>
                </ModalContainer>
            </Modal>

            {showAngelo && angelo?.avatar && (
                <AvatarWrapper>
                    <TouchableOpacity onPress={handleAngeloPress}>
                        <Avatar source={angeloAvatar} />
                    </TouchableOpacity>
                </AvatarWrapper>
            )}

            {showMessage && (
                <MessageContainer style={{ opacity: fadeAnim }}>
                    <MessageText>Angelo has been captured!</MessageText>
                </MessageContainer>
            )}

            {showBetrayMessage && (
                <MessageContainer style={{ opacity: fadeAnim }}>
                    <MessageText>You have decided to betray kaotika. Beware, for such actions come with dire consequences!</MessageText>
                </MessageContainer>
            )}

            {showLoyalMessage && (
                <MessageContainer style={{ opacity: fadeAnim }}>
                    <MessageText>You have chosen to be loyal to kaotika, for now...</MessageText>
                </MessageContainer>
            )}
        </CustomBackground>
    );
};

export default InnScreen;