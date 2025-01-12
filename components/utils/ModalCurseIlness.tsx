import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Modal, Text, ScrollView } from "react-native";
import AppContext from "../../helpers/context";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

const tiredBackground = require('./../../assets/backgrounds/tiredBackground.png');
const putridBackground = require('./../../assets/backgrounds/sickBackground.png');
const medularBackground = require('./../../assets/backgrounds/crazyBackground.png');
const weaknessBackground = require('./../../assets/backgrounds/epicWeaknessBackground.png');
const ethaziumBackground = require('./../../assets/backgrounds/ethaziumBackground.png');

// Define un tipo para las claves de los atributos
type AttributeKey =
    | "constitution"
    | "dexterity"
    | "insanity"
    | "strength"
    | "intelligence"
    | "charisma"
    | "resistence";

const ModalCurseIllness: React.FC = () => {
    const appContext = useContext(AppContext);
    const player = appContext?.player;
    const setPlayer = appContext?.setPlayer;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (player?.ethazium || player?.epicWeakness || player?.medularApocalypse || player?.putridPlague || player?.attributes.resistence! <= 30) {
            setVisible(true)
        } else {
            setVisible(false)
        }

    }, [player]);

    useEffect(() => {
        if (player?.ethazium) {
            player.attributes.resistence -= player.attributes.resistence * 0.4;
        }
    }, [player])

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
        } else if (player?.attributes.resistence! <= 30) {
            return ["resistence"];
        }
        return [];
    };

    // Get the disease text based on player's conditions
    const getDiseaseText = (): string | null => {
        if (player?.epicWeakness) return "Suffering from Epic Weakness";
        if (player?.putridPlague) return "Suffering from Putrid Plague";
        if (player?.medularApocalypse) return "Suffering from Medular Apocalypse";
        if (player?.ethazium) return "Suffering from Ethazium";
        if (player?.attributes.resistence! <= 30) return "You are really tired"
        return null;
    };

    const getBackgroundImage = () => {
        if (player?.epicWeakness) return weaknessBackground;
        if (player?.putridPlague) return putridBackground;
        if (player?.medularApocalypse) return medularBackground;
        if (player?.ethazium) return ethaziumBackground;
        if (player?.attributes.resistence! <= 30) return tiredBackground;
        return null;
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
                            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>
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
                                                ? `${player.attributes[key]} / 100`
                                                : player.modifiedAttributes[key] !== undefined
                                                    ? `${player.modifiedAttributes[key]} / ${player.attributes[key]}`
                                                    : `- / ${player.attributes[key]}`}
                                        </AttributeValues>
                                    </AttributeBarContainer>
                                ))}
                            </ScrollView>
                        </>
                    )}
                </ModalContainer>
            </ModalBackground>
        </Modal>
    );
};

export default ModalCurseIllness;

// Styled components (sin cambios)
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
    margin-bottom: 20px;
`;

const Avatar = styled.Image`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: ${width * 0.2}px;
    margin-bottom: 20px;
`;

const DiseaseText = styled.Text`
    font-size: ${width * 0.07}px;
    color: #f00;
    font-family: 'KochAltschrift';
    margin-bottom: 20px;
    text-align: center;
`;

const AttributeBarContainer = styled.View`
    width: 100%;
    margin-bottom: 2px;
`;

const AttributeLabel = styled.Text`
    font-size: ${width * 0.07}px;
    color: white;
    margin-bottom: 2px;
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
    margin-top: 5px;
    text-align: center;
`;
