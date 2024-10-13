import React from 'react';
import { Image, Dimensions, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../helpers/context';

// Obtén la imagen de fondo de los assets locales
const backgroundImageURL = require('../assets/png/profileBackground.png');

const { width, height } = Dimensions.get('window');

const newHeight = height * 0.96;

const Equipment = () => {

    return (
        <AppContext.Consumer>
            {({ player }: any) => {

                
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                <BackgroundImage source={backgroundImageURL}>
                    <Container>

                        <Header>Equipment</Header>

                        <ProfileSection>
                            <TextContainer>
                                <ProfileText>Profile</ProfileText>
                                <ProfileSubText>Juggler</ProfileSubText>
                            </TextContainer>
                            <EquipmentContainer>
                                <EquipmentImage source={backgroundImageURL} />
                            </EquipmentContainer>
                            <TextContainer>
                                <ProfileText>Level</ProfileText>
                                <ProfileSubText>11</ProfileSubText>
                            </TextContainer>
                        </ProfileSection>


                        <MainEquipment>
                        <CircularEquipmentContainer>
                                <EquipmentImage source={backgroundImageURL} />
                            </CircularEquipmentContainer>

                            <LargeEquipmentContainer>
                                <LargeEquipmentImage source={backgroundImageURL} />
                            </LargeEquipmentContainer>

                            <CircularEquipmentContainer>
                                <EquipmentImage source={backgroundImageURL} />
                            </CircularEquipmentContainer>
                        </MainEquipment>


                        <EquipmentGrid>

                            <CircularEquipmentContainer>
                                <EquipmentImage source={backgroundImageURL} />
                            </CircularEquipmentContainer>

                            <EquipmentContainer>
                                <EquipmentImage source={backgroundImageURL} />
                            </EquipmentContainer>

                            <CircularEquipmentContainer>
                                <EquipmentImage source={backgroundImageURL} />
                            </CircularEquipmentContainer>

                            <PotionEquipmentContainer>
                                <EquipmentImage source={backgroundImageURL} />
                            </PotionEquipmentContainer>

                            <PotionEquipmentContainer>
                                <EquipmentImage source={backgroundImageURL} />
                            </PotionEquipmentContainer>

                            <PotionEquipmentContainer>
                                <EquipmentImage source={backgroundImageURL} />
                            </PotionEquipmentContainer>

                        </EquipmentGrid>


                        <InfoSectionGrid>

                            <InfoSection>
                                <InfoText>EXP</InfoText>
                                <NextInfoContainer>
                                    <InfoNumberText> 17800</InfoNumberText><NextInfoText>XP</NextInfoText>
                                </NextInfoContainer>
                            </InfoSection>
                            
                            <InfoSection>
                                <InfoText>Next LVL</InfoText>
                                <NextInfoContainer>
                                    <InfoNumberText> 19250</InfoNumberText><NextInfoText>XP</NextInfoText>
                                </NextInfoContainer>
                            </InfoSection>

                            <InfoSection>
                                <InfoText>GOLD</InfoText>
                                <NextInfoContainer>
                                    <InfoNumberText> 571</InfoNumberText>
                                </NextInfoContainer>
                            </InfoSection>
                        </InfoSectionGrid>

                    </Container>
                </BackgroundImage>
                </SafeAreaView>
            );
        }}
        </AppContext.Consumer>
    );
};

// Styled Components
const BackgroundImage = styled.ImageBackground`
    width: ${width  * 1}px;
    height: ${newHeight  * 0.8}px;
    padding-bottom: ${width * 0.5}px;
    margin-top: 0px;
`;

const Container = styled.View`
    background-color: rgba(0, 0, 0, 0.9); /* Fondo semitransparente */
    padding: ${width * 0.03}px;

`;

const Header = styled.Text`
    font-size: ${width * 0.07}px;
    color: white;
    text-align: center;
    margin-bottom: ${newHeight * 0.02}px;
    font-family: KochAltschrift;
`;

const ProfileSection = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${newHeight * 0.01}px;
`;

const TextContainer = styled.View`
    width: ${width * 0.25}px;
    height: ${width * 0.25}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    border-radius: ${width * 0.05}px;
    background-color: rgba(0,0,0,0.9);
`;

const ProfileText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
        font-family: KochAltschrift;
`;

const ProfileSubText = styled.Text`
    color: gold;
    font-size: ${width * 0.06}px;
    font-family: KochAltschrift;
`;

const MainEquipment = styled.View`
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${newHeight * 0.01}px;
    flex-direction: row;
`;

const EquipmentGrid = styled.View`
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const EquipmentContainer = styled.View`
    width: ${width * 0.25}px;
    height: ${width * 0.25}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    margin-bottom: ${newHeight * 0.02}px;
    border-radius: ${width * 0.03}px;
    background-color: rgba(0,0,0,0);
`; 

const CircularEquipmentContainer = styled.View`
    width: ${width * 0.25}px;
    height: ${width * 0.25}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    margin-bottom: ${newHeight * 0.02}px;
    border-radius: ${width * 0.2}px;
    background-color: rgba(0,0,0,0);
`; 

const PotionEquipmentContainer = styled.View`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    margin-bottom: ${newHeight * 0.02}px;
    border-radius: ${width * 0.2}px;
    background-color: rgba(0,0,0,0);

`; 

const LargeEquipmentContainer = styled(EquipmentContainer)`
    width: ${width * 0.35}px;
    height: ${width * 0.35}px;
    background-color: rgba(0,0,0,0);

`;

const EquipmentImage = styled.Image`
    width: 80%;
    height: 80%;
    resize-mode: contain;
`;

const LargeEquipmentImage = styled(EquipmentImage)`
    width: 90%;
    height: 90%;
`;

const InfoSection = styled.View`
    flex-direction: column;
    align-items: center;
    border-width: 2px;
    border-color: gold;
    border-radius: ${width * 0.03}px;
    width: ${width * 0.25}px;
    height: ${newHeight * 0.095}px;
    justify-content: center;
    background-color: rgba(0,0,0,0.9);
`;

const InfoSectionGrid = styled.View`
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-right: ${width * 0.01}px;
`;

const NextInfoContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-right: ${width * 0.01}px;
`;

const NextInfoText = styled.Text`
color: white;
font-size: ${width * 0.045}px;
margin-vertical: ${newHeight * 0.002}px;
font-family: KochAltschrift;
top: ${newHeight * 0.01}px;
`;

const InfoText = styled.Text`
    color: white;
    font-size: ${width * 0.045}px;
    margin-vertical: ${newHeight * 0.002}px;
    font-family: KochAltschrift;
    
`;

const InfoNumberText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
    margin-vertical: ${-newHeight * 0.01}px;
    font-family: KochAltschrift;
    margin-horizontal: ${width * 0.01}px;
`;

export default Equipment;
