import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Modal, Text } from "react-native";
import AppContext from "../../helpers/context";
import styled from "styled-components/native";
import { Player } from "../../interfaces/contextInterface";
import { URL } from "../../src/API/urls";
import LoadSpinner from "../utils/loadSpinner";


const closeIconImg = require('../../assets/icons/close_icon.png');
const healButtonImg = require('../../assets/icons/heal_button.png');
const tiredBackground = require('./../../assets/backgrounds/tiredBackground.png');
const putridBackground = require('./../../assets/backgrounds/sickBackground.png');
const medularBackground = require('./../../assets/backgrounds/crazyBackground.png');
const weaknessBackground = require('./../../assets/backgrounds/epicWeaknessBackground.png');
const ethaziumBackground = require('./../../assets/backgrounds/ethaziumBackground.png');
const healthyAcolyte = require('./../../assets/backgrounds/healthy_acolyte.png');

const { width, height } = Dimensions.get("screen");

// Define un tipo para las claves de los atributos
type AttributeKey =
    | "constitution"
    | "dexterity"
    | "insanity"
    | "strength"
    | "intelligence"
    | "charisma"
    | "resistence";

interface ModalInfoProps {
    player : Player | null;
    visible: boolean;
    handleCloseModal: () => void;
    handleHealButton: () => void;
}

const ModalInfo: React.FC<ModalInfoProps> = ({player, visible, handleCloseModal, handleHealButton}) => {
    const [isSick, setIsSick] = useState<boolean>(false);

    useEffect(() => {
        setIsSick(checkIfPlayerIsSick());

    }, [player])

    const checkIfPlayerIsSick = () => {
        if (player?.epicWeakness) return true;
        if (player?.putridPlague) return true;
        if (player?.medularApocalypse) return true;
        if (player?.ethazium) return true;
        return false;
    }

    const calculateBarWidth = (attribute: number, modifiedAttribute?: number, key?: AttributeKey): number => {
        if (key === "resistence") {
            return Math.max((attribute / 100) * 100, 0); // Use 100 as max for resistence
        }
        if (modifiedAttribute === undefined) return 0;
        return Math.max((modifiedAttribute / attribute) * 100, 0);
    };


    // Filter the attributes to display based on the player's conditions
    const getFilteredAttributes = (): AttributeKey[] => {
        if (player?.ethazium) {
            return Object.keys(player.attributes) as AttributeKey[];
        } else if (player?.epicWeakness) {
            return ["strength"];
        } else if (player?.putridPlague) {
            return ["intelligence"];
        } else if (player?.medularApocalypse) {
            return ["constitution"];
        }
        return [];
    };

    // Get the disease text based on player's conditions
    const getDiseaseText = (): string | null => {
        if (player?.epicWeakness) return "Suffering from Epic Weakness";
        if (player?.putridPlague) return "Suffering from Putrid Plague";
        if (player?.medularApocalypse) return "Suffering from Medular Apocalypse";
        if (player?.ethazium) return "Suffering from Ethazium";
        if (player?.attributes.resistence! <= 30) return "This player is tired!";
        return "This acolyte is healthy";
    };


    const getBackgroundImage = () => {
        if (player?.epicWeakness) return weaknessBackground;
        if (player?.putridPlague) return putridBackground;
        if (player?.medularApocalypse) return medularBackground;
        if (player?.ethazium) return ethaziumBackground;
        if (player?.attributes.resistence! <= 30) return tiredBackground;
        return healthyAcolyte;
    };

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <ModalBackground source={getBackgroundImage()}>
                <ModalContainer>
                    {player && (
                        <>
                            <Avatar source={{ uri: player.avatar }} />
                            <StyledText>{player.nickname}</StyledText>

                            {/* Display the disease text */}
                            {getDiseaseText() && (
                                <DiseaseText>{getDiseaseText()}</DiseaseText>
                            )}

                            {/* Display the filtered attributes */}
                            {getFilteredAttributes().map((key) => (
                                <AttributeBarContainer key={key}>
                                    <AttributeLabel>{capitalizeFirstLetter(key)}</AttributeLabel>
                                    <BarBackground>
                                        <BarForeground
                                            style={{
                                                width: `${calculateBarWidth(
                                                    player.attributes[key],
                                                    player.modifiedAttributes[key],
                                                    key
                                                )}%`,
                                            }}
                                        />
                                    </BarBackground>
                                    <AttributeValues>
                                        {key === "resistence"
                                            ? `${player.attributes[key]} / 100` // Custom display for resistence
                                            : player.modifiedAttributes[key] !== undefined
                                            ? `${player.modifiedAttributes[key]} / ${player.attributes[key]}`
                                            : `- / ${player.attributes[key]}`}
                                    </AttributeValues>
                                </AttributeBarContainer>
                            ))}
                        </>
                    )}
                    <ContainerRow>
                        <CloseModalButton 
                            onPress={handleCloseModal}>
                            <ButtonImage
                                source={closeIconImg}
                            />
                        </CloseModalButton>
                        {isSick ? 
                            <HealButton 
                                onPress={handleHealButton}    
                            >      
                                <ContainerRow>
                                    <ButtonImage
                                        source={healButtonImg}
                                    />
                                    <StyledText>Heal</StyledText>
                                </ContainerRow>
                            </HealButton> 
                        : null}
                    </ContainerRow>
                </ModalContainer>
            </ModalBackground>
        </Modal>
    );
};

export default ModalInfo;


const ModalBackground = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.View`
    width: ${width * 1}px;
    height: 100%;
    padding: 20px;
    background-color: rgba(0,0,0,0.8);
    align-items: center;
`;

const StyledText = styled.Text`
    font-size: ${width * 0.07}px;
    color: white;
    font-family: 'KochAltschrift';
    margin-left: ${width * 0.02}px;
`;

const Avatar = styled.Image`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: ${width * 0.2}px;
`;

const ButtonImage = styled.Image `
    width: ${width * 0.12}px;
    height: ${width * 0.12}px;
    border-radius: ${width * 0.12}px;
`

const ButtonHealImg = styled.Image `
    width: ${width * 0.15}px;
    height: ${width * 0.15}px;
    border-radius: ${width * 0.15}px;
`

const DiseaseText = styled.Text`
    font-size: ${width * 0.07}px;
    color: #f00;
    font-family: 'KochAltschrift';
    text-align: center;
`;

const AttributeBarContainer = styled.View`
    width: 100%;
`;

const AttributeLabel = styled.Text`
    font-size: ${width * 0.06}px;
    color: white;
    font-family: 'KochAltschrift';
`;

const BarBackground = styled.View`
    width: 100%;
    height: 15px;
    background-color: #444;
    border-radius: 7.5px;
    overflow: hidden;
`;

const BarForeground = styled.View`
    height: 100%;
    background-color: orange;
`;

const AttributeValues = styled.Text`
    font-size: ${width * 0.04}px;
    color: white;
    text-align: center;
    font-family: 'KochAltschrift';
`;

const CloseModalButton = styled.TouchableOpacity`
    width: ${width * 0.3}px;
    border-radius: ${width * 0.2}px;
`

const HealButton = styled.TouchableOpacity`
    width: ${width * 0.3}px;
    border-radius: ${width * 0.2}px;
    margin-top: ${width * 0.03}px;
`
const ContainerRow = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
`