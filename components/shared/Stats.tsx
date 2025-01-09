import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import AppContext from '../../helpers/context';
import { ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';

const { height, width } = Dimensions.get('window');

const Stats = () => {
    const { height, width } = Dimensions.get('window');
    const kaotikaAPI = 'https://kaotika.vercel.app/';
    const fontSize = width * 0.062;
    const appContext = useContext(AppContext);
    const player = appContext?.player;


    const convertAttributesToPercentage = (profileAttributes: any) => {

        const maxAttributeValue = 150;

        return {
            intelligence: profileAttributes.intelligence / maxAttributeValue,
            dexterity: profileAttributes.dexterity / maxAttributeValue,
            insanity: profileAttributes.insanity / maxAttributeValue,
            charisma: profileAttributes.charisma / maxAttributeValue,
            constitution: profileAttributes.constitution / maxAttributeValue,
            strength: profileAttributes.strength / maxAttributeValue,
            hit_points: (profileAttributes.constitution + profileAttributes.dexterity - (profileAttributes.insanity / 2)) / maxAttributeValue,
            attack: (profileAttributes.strength - (profileAttributes.insanity / 2)) / maxAttributeValue,
            defense: (profileAttributes.dexterity + profileAttributes.constitution + (profileAttributes.intelligence / 2)) / maxAttributeValue,
            magic_resistance: (profileAttributes.intelligence + profileAttributes.charisma) / maxAttributeValue,
            cfp: (profileAttributes.insanity) / maxAttributeValue,
            bcfa: (profileAttributes.strength + profileAttributes.insanity) / maxAttributeValue
        };
    };

    return (
        <AppContext.Consumer>
            {({ player }: any) => {

                let attributesToPrint = convertAttributesToPercentage(player.role === 'ACOLYTE' ? player.modifiedAttributes : player.attributes);

                console.log(attributesToPrint);
                const allAtributes = calculateAllAttributes(player);

                console.log("ALL ATRIBUTES");
                console.log(allAtributes);
                attributesToPrint = convertAttributesToPercentage(allAtributes);

                return (
                    <StyledImageBackground
                        source={require('../../assets/png/profileBackground.png')}
                        width={width}
                        height={height}
                    >
                        <Container padding={height * 0.01}>
                            <TitleContainer width={width * 0.9} height={height * 0.08}>
                                <TitleText fontSize={width * 0.08}>{player.nickname}</TitleText>
                            </TitleContainer>

                            <StyledImage
                                source={{ uri: player.avatar }} // Puedes cambiar el source aquí
                                resizeMode="contain"
                            />

                            <ProgressContainer>
                                <Column>
                                    <ProfileText fontSize={fontSize}>Intelligence</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.intelligence}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />

                                    <ProfileText fontSize={fontSize}>Dexterity</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.dexterity}
                                        width={width * 0.3}
                                        color="#C19A6B"

                                    />

                                    <ProfileText fontSize={fontSize}>Insanity</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.insanity}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />
                                    <ProfileText fontSize={fontSize}>Charisma</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.charisma}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />

                                    <ProfileText fontSize={fontSize}>Constitution</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.constitution}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />

                                    <ProfileText fontSize={fontSize}>Strength</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.strength}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />
                                </Column>

                                <Column>
                                    <ProfileText fontSize={fontSize}>Hit Points</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.hit_points}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />

                                    <ProfileText fontSize={fontSize}>Attack</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.attack}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />

                                    <ProfileText fontSize={fontSize}>Defense</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.defense}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />

                                    <ProfileText fontSize={fontSize}>Magic Resistance</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.magic_resistance}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />

                                    <ProfileText fontSize={fontSize}>CFP</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.cfp}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />

                                    <ProfileText fontSize={fontSize}>BCFA</ProfileText>
                                    <Progress.Bar
                                        progress={attributesToPrint.bcfa}
                                        width={width * 0.3}
                                        color="#C19A6B"
                                    />
                                </Column>
                            </ProgressContainer>
                        </Container>
                    </StyledImageBackground>
                );
            }}
        </AppContext.Consumer>
    );
};

const addCurseModifiers = (attributes: any, curses: any[]) => {
    const modifiers = curses.reduce((acc, curse) => {
        Object.keys(acc).forEach(key => {
            acc[key] += curse.modifiers[key] || 0;
        });
        return acc;
    }, {
        constitution: 0,
        charisma: 0,
        dexterity: 0,
        intelligence: 0,
        strength: 0,
        insanity: 0
    });

    return {
        constitution: attributes.constitution + modifiers.constitution,
        charisma: attributes.charisma + modifiers.charisma,
        dexterity: attributes.dexterity + modifiers.dexterity,
        intelligence: attributes.intelligence + modifiers.intelligence,
        strength: attributes.strength + modifiers.strength,
        insanity: attributes.insanity + modifiers.insanity
    };
};

const calculateAllAttributes = (player: any) => {
    if (player) {
        const baseAttributes = player.role === 'ACOLYTE' ? player.modifiedAttributes : player.attributes;

        const attributes = {
            charisma:
                baseAttributes.charisma +
                player.equipment.helmet?.modifiers.charisma! +
                player.equipment.weapon.modifiers.charisma +
                player.equipment.armor.modifiers.charisma +
                player.equipment.shield?.modifiers.charisma! +
                player.equipment.artifact.modifiers.charisma +
                player.equipment.boot?.modifiers.charisma! +
                player.equipment.ring?.modifiers.charisma!,
            constitution:
                baseAttributes.constitution +
                player.equipment.helmet?.modifiers.constitution! +
                player.equipment.weapon.modifiers.constitution +
                player.equipment.armor.modifiers.constitution +
                player.equipment.shield?.modifiers.constitution! +
                player.equipment.artifact.modifiers.constitution +
                player.equipment.boot?.modifiers.constitution! +
                player.equipment.ring?.modifiers.constitution!,
            dexterity:
                baseAttributes.dexterity +
                player.equipment.helmet?.modifiers.dexterity! +
                player.equipment.weapon.modifiers.dexterity +
                player.equipment.armor.modifiers.dexterity +
                player.equipment.shield?.modifiers.dexterity! +
                player.equipment.artifact.modifiers.dexterity +
                player.equipment.boot?.modifiers.dexterity! +
                player.equipment.ring?.modifiers.dexterity!,
            insanity:
                baseAttributes.insanity +
                player.equipment.helmet?.modifiers.insanity! +
                player.equipment.weapon.modifiers.insanity +
                player.equipment.armor.modifiers.insanity +
                player.equipment.shield?.modifiers.insanity! +
                player.equipment.artifact.modifiers.insanity +
                player.equipment.boot?.modifiers.insanity! +
                player.equipment.ring?.modifiers.insanity!,
            intelligence:
                baseAttributes.intelligence +
                player.equipment.helmet?.modifiers.intelligence! +
                player.equipment.weapon.modifiers.intelligence +
                player.equipment.armor.modifiers.intelligence +
                player.equipment.shield?.modifiers.intelligence! +
                player.equipment.artifact.modifiers.intelligence +
                player.equipment.boot?.modifiers.intelligence! +
                player.equipment.ring?.modifiers.intelligence!,
            strength:
                baseAttributes.strength +
                player.equipment.helmet?.modifiers.strength! +
                player.equipment.weapon.modifiers.strength +
                player.equipment.armor.modifiers.strength +
                player.equipment.shield?.modifiers.strength! +
                player.equipment.artifact.modifiers.strength +
                player.equipment.boot?.modifiers.strength! +
                player.equipment.ring?.modifiers.strength!
        };

        return player.curses.length < 0 ? addCurseModifiers(attributes, player.curses) : attributes;
    }
};


const StyledImageBackground = styled(ImageBackground) <{ width: number; height: number }>`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
`;

const Container = styled.View<{ padding: number }>`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding: ${({ padding }) => padding}px;
`;

const TitleText = styled.Text<{ fontSize: number }>`
    color: white;
    font-family: 'KochAltschrift';
    font-size: ${({ fontSize }) => fontSize}px;
`;

const ProfileText = styled.Text<{ fontSize: number }>`
    color: white;
    font-family: 'KochAltschrift';
    font-size: ${({ fontSize }) => fontSize}px;
    padding: 5px;
`;

const TitleContainer = styled.View<{ width: number; height: number }>`
    border-color: #C19A6B;
    border-width: 2px;
    border-radius: 10px;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-bottom: ${height * 0.03}px;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ProgressContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: ${width * 0.9}px;
    height: ${height * 0.41}px;
    background-color: rgba(0, 0, 0, 0.5);
    border-color: #C19A6B;
    border-width: 2px;
    border-radius: 10px;
    bottom: ${height * 0.035}px;
    padding: ${width * 0.025}px;
`;

const Column = styled.View`
    flex: 1;
    align-items: center;
`;

const StyledImage = styled.Image`
    width: ${width * 0.33}px;
    height: ${width * 0.33}px;
    margin-bottom: ${height * 0.03}px;
    border-width: 2px;
    border-radius: ${width * 0.5}px;
    border-color: #C19A6B;
    bottom: ${height * 0.015}px;
`;

export default Stats;
