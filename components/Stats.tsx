import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import AppContext from '../helpers/context';
import { ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';

const { height, width } = Dimensions.get('window');

const Stats = () => {
    const { height, width } = Dimensions.get('window');
    const kaotikaAPI = 'https://kaotika.vercel.app/';
    const fontSize = width * 0.070;

    const convertAttributesToPercentage = (profileAttributes: any) => {
        return {
            intelligence: profileAttributes.intelligence / 100,
            dexterity: profileAttributes.dexterity / 100,
            insanity: profileAttributes.insanity / 100,
            charisma: profileAttributes.charisma / 100,
            constitution: profileAttributes.constitution / 100,
            strength: profileAttributes.strength / 100,
            hit_points: (profileAttributes.constitution + profileAttributes.dexterity - (profileAttributes.insanity / 2))/ 100,
            attack: (profileAttributes.strength - (profileAttributes.insanity / 2))/ 100,
            defense: (profileAttributes.dexterity + profileAttributes.constitution +  (profileAttributes.intelligence / 2)) / 100,
            magic_resistance: (profileAttributes.intelligence + profileAttributes.charisma)/ 100,
            cfp: (profileAttributes.insanity) / 100,
            bcfa: (profileAttributes.strength + profileAttributes.insanity)/ 100
        };
    };

    return (
        <AppContext.Consumer>
            {({ profileAttributes, player }: any) => {
                const attributesToPrint = convertAttributesToPercentage(player.attributes);
                console.log(attributesToPrint);
                
                return (
                    <StyledImageBackground
                        source={require('../assets/png/profileBackground.png')}
                        width={width}
                        height={height}
                    >
                        <Container padding={height * 0.01}>
                            <TitleContainer width={width * 0.9} height={height * 0.1}>
                                <TitleText fontSize={width * 0.1}>{player.nickname}</TitleText>
                            </TitleContainer>

                            <StyledImage
                                source={{ uri: player.avatar}} // Puedes cambiar el source aquí
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

const StyledImageBackground = styled(ImageBackground)<{ width: number; height: number }>`
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
    margin-bottom: 20px;
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
    width: ${width * 0.43}px;
    height: ${width * 0.43}px;
    margin-bottom: ${height * 0.03}px;
    border-width: 2px;
    border-radius: 100px;
    border-color: #C19A6B;
    bottom: ${height * 0.015}px;
`; 

export default Stats;
