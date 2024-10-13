import React from 'react';
import { Image, Dimensions, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';

// Obtén la imagen de fondo de los assets locales
const backgroundImageURL = require('../assets/png/profileBackground.png');

const { width, height } = Dimensions.get('window');

const newHeight = height * 0.7;

const Equipment = () => {
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
                        <InfoText>Experience</InfoText>
                        <InfoText> 17800 XP</InfoText>
                    </InfoSection>
                    
                    <InfoSection>
                        <InfoText>Next Level</InfoText>
                        <InfoText> 19250 XP</InfoText>
                    </InfoSection>

                    <InfoSection>
                        <InfoText>Gold</InfoText>
                        <InfoText>571</InfoText>
                    </InfoSection>
                </InfoSectionGrid>

            </Container>
        </BackgroundImage>
        </SafeAreaView>
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
    font-size: ${width * 0.06}px;
    color: white;
    text-align: center;
    margin-bottom: ${newHeight * 0.02}px;
`;

const ProfileSection = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${newHeight * 0.03}px;
`;

const TextContainer = styled.View`
    width: ${width * 0.25}px;
    height: ${width * 0.25}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    border-radius: ${width * 0.05}px; /* Redondeo */
`;

const ProfileText = styled.Text`
    color: white;
    font-size: ${width * 0.04}px;
`;

const ProfileSubText = styled.Text`
    color: gold;
    font-size: ${width * 0.045}px;
`;

const MainEquipment = styled.View`
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${newHeight * 0.03}px;
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
`; 

const LargeEquipmentContainer = styled(EquipmentContainer)`
    width: ${width * 0.35}px;
    height: ${width * 0.35}px;
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
    height: ${newHeight * 0.11}px;
`;

const InfoSectionGrid = styled.View`
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-right: ${width * 0.01}px;
`;

const InfoText = styled.Text`
    color: white;
    font-size: ${width * 0.045}px;
    margin-vertical: ${newHeight * 0.005}px;
    
`;

export default Equipment;
