import React, { useEffect, useContext } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from '../../helpers/context';
import MortimerContext from '../../helpers/MortimerContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const { height, width } = Dimensions.get('window');

const ConnectionScreen = () => {
    const appContext = useContext(AppContext);
    const mortimerContext = useContext(MortimerContext);
    const players = appContext?.players!;
    const setLocation = appContext?.setLocation;
    const isMenuOldSchoolLoaded = mortimerContext?.isMenuOldSchoolLoaded;

    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

    useEffect(() => {

        const navigateToSchool = () => {
            if (isMenuOldSchoolLoaded) {
                setTimeout(() => {
                    navigation.navigate('OLDSCHOOL');
                }, 200);
            }
        };

        navigateToSchool();
    }, [isMenuOldSchoolLoaded]);

    const handleExitLab = () => {
        setLocation('OLDSCHOOL');
        if (isMenuOldSchoolLoaded) {
            navigation.navigate('OLDSCHOOL');
        }
    };

    return (
        <BackgroundImage
            source={require('../../assets/png/connectionsBackground.png')}
        >
            <Container>
                <LabTitle>LABORATORY</LabTitle>
                <KaotikaFontHeads>Below you have displayed who's{' '}
                    <ColoredText color="green">INSIDE</ColoredText> or{' '}
                    <ColoredText color="red">OUTSIDE</ColoredText> the Lab
                </KaotikaFontHeads>
                <PlayersList>
                    {players.filter((player: any) => player.role === 'ACOLYTE').map((player: any) => (
                        <PlayerItem key={player.id}>
                            <Avatar source={{ uri: player.avatar }} />
                            <KaotikaFont2>{player.nickname}</KaotikaFont2>
                            <Icon
                                name={player.isInsideLab ? 'circle' : 'circle-o'}
                                size={width * 0.07}
                                color={player.isInsideLab ? 'green' : 'red'}
                            />
                        </PlayerItem>
                    ))}
                </PlayersList>

                <StyledButton onPress={handleExitLab}>
                    <StyledButtonText>Go back to the corridor</StyledButtonText>
                </StyledButton>
            </Container>
        </BackgroundImage>
    );
};

const ColoredText = styled.Text<{ color: string }>`
    font-family: KochAltschrift;
    color: ${(props) => props.color};
    font-size: ${width * 0.08}px;
`;

const BackgroundImage = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: ${width}px;
    height: ${height * 0.98}px;
`;

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const LabTitle = styled.Text`
    font-family: KochAltschrift;
    font-size: ${width * 0.1}px;
    color: white;
    text-decoration-line: underline;
    margin-bottom:  ${width * 0.02}px;
`;


const KaotikaFontHeads = styled.Text`
    font-family: KochAltschrift;
    font-size: ${width * 0.09}px;
    color: white;
    margin-bottom:  ${width * 0.02}px;
    align-items: center;
`;

const KaotikaFontHeads2 = styled(KaotikaFontHeads)`
    font-size: ${width * 0.12}px;
    color: red;
    margin-bottom: 20px;
`;

const KaotikaFont2 = styled.Text`
    font-family: KochAltschrift;
    color: white;
    margin-vertical: 5px;
    text-align: left;
    margin-left: 10px;
    width: 90%;
    font-size: ${width * 0.08}px;
`;

const PlayersList = styled.View`
    align-items: flex-start;
    background-color: rgba(0, 0, 0, 0.5);
    padding: ${width * 0.04}px;
    border-radius: ${width * 0.1}px;
    border-width: ${width * 0.002}px;
    border-color: white;
    width: 85%;
`;

const PlayerItem = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-color: orange;
    padding-bottom: ${width * 0.05}px;
    border-bottom-width: ${width * 0.005}px;
    margin-bottom:${width * 0.05}px;

`;

const Avatar = styled.Image`
    width: ${width * 0.13}px;
    height: ${width * 0.13}px;
    border-radius: ${width * 0.5}px;
`;

const StyledButtonText = styled.Text`
    color: orange;
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    padding: 10px;
`;

const StyledButton = styled(TouchableOpacity)`
    backgroundColor: 'rgba(0, 0, 0, 0.8)';
    height: ${height * 0.1}px;
    width: ${width * 0.7}px;
    align-items: center;
    justify-content: center;
    border-radius: ${width * 0.4}px;
`;

export default ConnectionScreen;