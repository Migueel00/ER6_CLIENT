import React from 'react';
import { Image, Dimensions, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import AppContext from '../../helpers/context';

// Obtén la imagen de fondo de los assets locales
const backgroundImageURL = require('../../assets/png/profileBackground.png');
const kaotikaAPI = 'https://kaotika.vercel.app/';

const { width, height } = Dimensions.get('window');

const newHeight = height * 0.92;

const Equipment = () => {

    return (
        <AppContext.Consumer>
            {({ player }: any) => {

                console.log(player.profile.name);
                const nextLevelExp = 1750 * (player.level);
                
            return (
               <StyledImageBackground source={require('./../../assets/png/profileBackground.png')}>
                    <Overlay />
                    <Header>Equipment</Header>
                    
                    <ScrolleableEquipmentContainer>
                        <EquipmentContainer>
                            <ProfileSection>

                                <TextContainer>
                                    <ProfileText>Profile</ProfileText>
                                    <ProfileSubText>{player.profile.name}</ProfileSubText>
                                </TextContainer>

                                <NormalEquipmentContainer>
                                    <EquipmentImage source={{ uri: kaotikaAPI + player.equipment.helmet.image }} />
                                </NormalEquipmentContainer>

                                <TextContainer>
                                    <ProfileText>Level</ProfileText>
                                    <ProfileSubText>{player.level}</ProfileSubText>
                                </TextContainer>

                            </ProfileSection>

                            <MainEquipment>
                                <CircularEquipmentContainer>
                                    <EquipmentImage source={{ uri: kaotikaAPI + player.equipment.weapon.image }} />
                                </CircularEquipmentContainer>

                                <LargeEquipmentContainer>
                                    <LargeEquipmentImage source={{ uri: kaotikaAPI + player.equipment.armor.image }} />
                                </LargeEquipmentContainer>

                                <CircularEquipmentContainer>
                                    <EquipmentImage  source={{ uri: kaotikaAPI + player.equipment.shield.image }} />
                                </CircularEquipmentContainer>
                            </MainEquipment>

                            <EquipmentGrid>

                                <CircularEquipmentContainer>
                                    <EquipmentImage source={{ uri: kaotikaAPI + player.equipment.artifact.image }} />
                                </CircularEquipmentContainer>

                                <NormalEquipmentContainer>
                                    <EquipmentImage source={{ uri: kaotikaAPI + player.equipment.boot.image }} />
                                </NormalEquipmentContainer>

                                <CircularEquipmentContainer>
                                    <EquipmentImage source={{ uri: kaotikaAPI + player.equipment.ring.image }} />
                                </CircularEquipmentContainer>

                            </EquipmentGrid>

                            <EquipmentGrid>
                                <PotionEquipmentContainer>
                                    <EquipmentImage source={{ uri: kaotikaAPI + player.equipment.healing_potion.image }} />
                                </PotionEquipmentContainer>

                                <PotionEquipmentContainer>
                                    <EquipmentImage source={{ uri: kaotikaAPI + player.equipment.antidote_potion.image }} />
                                </PotionEquipmentContainer>

                                <PotionEquipmentContainer>
                                    <EquipmentImage source={{ uri: kaotikaAPI + player.equipment.enhancer_potion.image }}/>
                                </PotionEquipmentContainer>

                            </EquipmentGrid>

                            <InfoSectionGrid>

                                <InfoSection>
                                    <InfoText>EXP</InfoText>
                                    <NextInfoContainer>
                                    <InfoNumberText>{player.experience}</InfoNumberText><NextInfoText>XP</NextInfoText>
                                    </NextInfoContainer>
                                </InfoSection>
                                
                                <InfoSection>
                                    <InfoText>Next LVL</InfoText>
                                    <NextInfoContainer>
                                        <InfoNumberText> {nextLevelExp}</InfoNumberText><NextInfoText>XP</NextInfoText>
                                    </NextInfoContainer>
                                </InfoSection>

                                <InfoSection>
                                    <InfoText>GOLD</InfoText>
                                    <NextInfoContainer>
                                        <InfoNumberText> {player.gold}</InfoNumberText>
                                    </NextInfoContainer>
                                </InfoSection>
                            </InfoSectionGrid>

                        </EquipmentContainer>
                    </ScrolleableEquipmentContainer>
                </StyledImageBackground>
            );
        }}
        </AppContext.Consumer>
    );
};

// Styled Components
const StyledImageBackground = styled.ImageBackground`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    width: ${width}px;
    height: ${height}px;
    background-color: rgba(0,0,0,0.95);
`;

const Overlay = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); 
`;

const EquipmentContainer = styled.View`
    justify-content: space-between;
    height: 90%;
    width: 100%;

`;

const ScrolleableEquipmentContainer = styled.ScrollView`
    width: 95%;
    margin-bottom: ${height * 0.01}px;
`;

const Header = styled.Text`
    font-size: ${width * 0.08}px;
    color: white;
    text-align: center;
    font-family: KochAltschrift;
    text-decoration-line: underline;
    margin-bottom: ${newHeight * 0.01}px;
`;

const ProfileSection = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${newHeight * 0.01}px;
`;

const TextContainer = styled.View`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    border-radius: ${width * 0.05}px;
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
    margin-bottom: ${newHeight * 0}px;
    flex-direction: row;
    margin-bottom: ${newHeight * 0.01}px;
`;

const EquipmentGrid = styled.View`
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: ${newHeight * 0.012}px;
`;

const NormalEquipmentContainer = styled.View`
    width: ${width * 0.25}px;
    height: ${width * 0.25}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;

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
    background-color: rgba(0,0,0,0);
    margin-right: ${width * 0.01}px;
    margin-left: ${width * 0.01}px;
`; 

const CircularEquipmentContainerRight = styled.View`
    width: ${width * 0.25}px;
    height: ${width * 0.25}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    margin-bottom: ${newHeight * 0.02}px;
    border-radius: ${width * 0.2}px;
    background-color: rgba(0,0,0,0);
    margin-right: ${width * 0.05}px;
`; 

const CircularEquipmentContainerLeft = styled.View`
    width: ${width * 0.25}px;
    height: ${width * 0.25}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    margin-bottom: ${newHeight * 0.02}px;
    border-radius: ${width * 0.2}px;
    background-color: rgba(0,0,0,0);
    margin-left: ${width * 0.05}px;
`; 

const PotionEquipmentContainer = styled.View`
    width: ${width * 0.25}px;
    height: ${width * 0.25}px;
    border-width: 2px;
    border-color: #C19A6B;
    justify-content: center;
    align-items: center;
    border-radius: ${width * 0.2}px;
    background-color: rgba(0,0,0,0);

`; 

const LargeEquipmentContainer = styled(EquipmentContainer)`
    width: ${width * 0.35}px;
    height: ${width * 0.35}px;
    background-color: rgba(0,0,0,0);
    border-width: 2px;
    border-color: #C19A6B;
    border-radius: ${width * 0.08}px;
`;

const EquipmentImage = styled.Image`
    width: 80%;
    height: 80%;
    resize-mode: contain;
`;

const LargeEquipmentImage = styled(EquipmentImage)`
    width: 100%;
    height: 85%;
    margin-top: ${height * 0.01}px;
`;

const InfoSection = styled.View`
    flex-direction: column;
    align-items: center;
    border-width: 2px;
    border-color: #C19A6B;
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
