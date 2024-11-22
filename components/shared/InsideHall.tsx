import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';
import { Player } from '../../interfaces/contextInterface';
import MortimerValidatingModal from '../mortimerScreen/components/MortimerValidatingModal';
import AcolyteValidatingModal from '../acolyteScreen/menu/AcolyteValidatingModal';
import Artifact from '../../interfaces/ArtifactsInterface';

const insideHall = require('./../../assets/backgrounds/insideHall.png');
const watchingEyes = require('./../../assets/png/watchingEyes.png');
const callingBell = require('./../../assets/icons/callBell.png');
const { height, width } = Dimensions.get('window');

const InsideHall = () => {

    const appContext = useContext(AppContext);
    const player = appContext?.player!;
    const socket = appContext?.socket;
    const players = appContext?.players!;
    const artifacts = appContext?.artifacts;
    const setAreArtifactsValidated = appContext?.setAreArtifactsValidated!;
    const [insidePlayers, setInsidePlayers] = useState<Player[]>([]);
    const [callMortimerButton, setCallMortimerButton] = useState(false);
    const isValidating = appContext?.isValidating;
    const setIsValidating = appContext?.setIsValidating!;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAcolyteModalVisible, setIsAcolyteModalVisible] = useState(false);
    const [showArtifacts, setShowArtifacts] = useState(false);
    const [retrievedArtifacts, setRetrievedArtifacts] = useState<Artifact[]>([]);
    const areArtifactsValidated = appContext?.areArtifactsValidated;


    useEffect(() => {
        socket.on('changeIsValidating' , (isValidating : boolean) => {
            
            console.log(isValidating);
            setIsValidating(isValidating);
        });
    }, []);

    useEffect(() => {
        console.log("IS VALIDATING " + isValidating);
    }, [isValidating])

    // Update insidePlayers when someone is inside the hall
    useEffect(() => {
        setInsidePlayers(players.filter(player => player.isInsideHall));
    }, [players]);

    // Update Retrieved artifacts
    useEffect(() => {
        if (artifacts) {
            const retrieved = artifacts.filter(artifact => artifact.isRetrieved);
            setRetrievedArtifacts(retrieved);

            console.log("RETRIEVED ARTIFACTS");
            retrievedArtifacts?.map(artifact => console.log(artifact.title));
        }
    }, [artifacts]);

    useEffect(() => {
        const acolytesInside = insidePlayers.filter(player => player.role === 'ACOLYTE');
        const isMortimerInside = insidePlayers.some(player => player.role === 'MORTIMER');
    
        if(!areArtifactsValidated){
            if (acolytesInside.length === 2 && !isMortimerInside && retrievedArtifacts.length === 4) {
                console.log("HALL IS FULL");
                setCallMortimerButton(true);
                setShowArtifacts(false);
            } else if (acolytesInside.length === 2 && isMortimerInside && retrievedArtifacts.length === 4){
                setCallMortimerButton(false);
                setShowArtifacts(true);
            } else if (retrievedArtifacts.length < 4){
                setShowArtifacts(false);
            } else {
                setShowArtifacts(false);
                setCallMortimerButton(false);
            }
        }
      
        
        console.log("ACOLYTES INSIDE HALL:");
        insidePlayers.map(player => player.role === 'ACOLYTE', console.log(player.nickname));
    }, [insidePlayers, retrievedArtifacts, artifacts]);

    useEffect(() => {
        socket.on('setArtifacts', () => {
            setAreArtifactsValidated(true);
            console.log("Cambia el estado de areArtifactsValidated por socket ");
        });
    }, []);

    const callButton = () => {
        console.log("Call Button Pressed");
        socket.emit("CallMortimer", "Everyone is inside");
    };

    useEffect(() => {
        if (isValidating && player.role === 'MORTIMER') {
            setModalVisible(!isModalVisible);
        }

        if(isValidating && player.role === 'ACOLYTE') {
            setIsAcolyteModalVisible(!isAcolyteModalVisible);
        }

    }, [isValidating]);

    const handleCloseModal = () => setModalVisible(false);

    const handleCloseAcolyteModal = () => setIsAcolyteModalVisible(false);

    const handleExitHall = () => {
        console.log("EXITING HALL");
        console.log(player.isInsideHall);

        const values = {
            socketId: appContext?.socketID,
            playerID: appContext?.player._id,
            isInsideHall: player?.isInsideHall,
        };

        socket.emit("HallDoorPressed", values);
    };

    const handleShowArtifacts = () => {
        console.log("Button pressed");
        console.log("Handle show artifact")
        socket.emit('changeIsValidatingTrue');
    };

    return (
        <InsideHallBackground source={insideHall}>

            <MortimerValidatingModal visible={isModalVisible} onClose={handleCloseModal}/>

            <AcolyteValidatingModal visible={isAcolyteModalVisible} onClose={handleCloseAcolyteModal}/>

            {showArtifacts && player.role === 'ACOLYTE' &&(
                <ShowArtifactsButton onPress={handleShowArtifacts}>
                    <ShowArtifactsText>Show Artifacts</ShowArtifactsText>
                </ShowArtifactsButton>
                )
                }

            <ContainerTopLeft>
                {players
                    .filter(player => player.isInsideHall && player.role === 'MORTIMER')
                    .map(player => (
                        <AvatarWrapper key={player._id}>
                            <Avatar source={{ uri: player.avatar }} />
                        </AvatarWrapper>
                    ))
                }
            </ContainerTopLeft>

            {callMortimerButton && player.role === 'ACOLYTE' && (
            <BellIconContainer>
                <TouchableOpacity onPress={callButton}>
                    <CallBellIcon source={callingBell} />
                </TouchableOpacity>
            </BellIconContainer>
            )}

            <ContainerTopRight>
                {player.role !== 'MORTIMER' && player.role !== 'VILLAIN' && (
                    <WatchingText>Someone might be watching...</WatchingText>
                )}

                {player.role === 'MORTIMER' || player.role === 'VILLAIN' ? (
                    players
                        .filter(player => player.isInsideHall && player.role === 'VILLAIN')
                        .map(player => (
                            <AvatarWrapper key={player._id}>
                                <Avatar source={{ uri: player.avatar }} />
                            </AvatarWrapper>
                        ))
                ) : (
                    <AvatarWrapper>
                        <Avatar source={watchingEyes} />
                    </AvatarWrapper>
                )}
            </ContainerTopRight>

            <ContainerBottom>
                {players
                    .filter(player => player.isInsideHall && player.role === 'ACOLYTE'
                    )
                    .map(p => (
                        <AvatarWrapper key={p._id}>
                            <Avatar source={{ uri: p.avatar }} />
                        </AvatarWrapper>
                    ))
                }
            </ContainerBottom>

            <StyledButton onPress={handleExitHall}>
                <StyledButtonText>Exit from the Hall</StyledButtonText>
            </StyledButton>
        </InsideHallBackground>
    );    
};

// Estilo del texto "Someone might be watching..."
const WatchingText = styled.Text`
    color: red;
    font-size: ${width * 0.05}px;
    font-family: 'KochAltschrift';
    position: absolute;
    bottom: ${height * 0.11}px;
    right: ${width * -0.04}px;
    text-align: center;
`;

const StyledButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    padding: 10px;
`;

const StyledButton = styled(TouchableOpacity)`
    backgroundColor: 'rgba(0, 0, 0, 0.8)';
    height: ${height * 0.1}px;
    width: ${width * 0.5}px;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: ${width * 0.4}px;
    bottom: ${height * 0.05}px;
`;

const InsideHallBackground = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: ${width}px;
    height: ${height}px;
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

// Estilos de contenedores
const ContainerTopLeft = styled.View`
    position: absolute;
    top: ${height * 0.1}px;
    left: ${width * 0.1}px;
    flex-direction: row;
`;

const ContainerTopRight = styled.View`
    position: absolute;
    top: ${height * 0.1}px;
    right: ${width * 0.1}px;
    flex-direction: row;
`;

const ContainerBottom = styled.View`
    position: absolute;
    bottom: ${height * 0.3}px;
    align-self: center;
    flex-direction: row;
`;

const BellIconContainer = styled.View`
    position: absolute;
    top: ${height * 0.03}px;
    left: ${width * 0.04}px;
`;

const CallBellIcon = styled.Image`
    width: ${width * 0.15}px;
    height: ${width * 0.15}px;
`;

const ShowArtifactsButton = styled(TouchableOpacity)`
    backgroundColor: 'rgba(0, 0, 0, 0.8)';
    height: ${height * 0.1}px;
    width: ${width * 0.5}px;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: ${width * 0.04}px;
    bottom: ${height * 0.5}px;
`;

const ShowArtifactsText = styled.Text`
    color: white;
    font-size: ${width * 0.08}px;
    font-family: 'KochAltschrift';
`;

export default InsideHall;