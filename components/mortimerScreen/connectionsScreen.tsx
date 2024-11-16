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
        console.log("States of loaded menus: ", {
            isMenuOldSchoolLoaded
        });

        const navigateToMenu = () => {
            if (isMenuOldSchoolLoaded) {
                setTimeout(() => {
                    navigation.navigate('OLDSCHOOL');
                }, 200);
            }
        };

        navigateToMenu();
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
                <KaotikaFontHeads>Check what the Acolytes'</KaotikaFontHeads>
                <KaotikaFontHeads>are doing with your</KaotikaFontHeads>
                <KaotikaFontHeads2>GODLY EYE</KaotikaFontHeads2>
                <PlayersList>
                    {players.filter((player: any) => player.role === 'ACOLYTE').map((player: any) => (
                        <PlayerItem key={player.id}>
                            <Avatar source={{ uri: player.avatar }} />
                            <KaotikaFont2>{player.nickname}</KaotikaFont2>
                            <Icon
                                name={player.isInsideLab ? 'circle' : 'circle-o'}
                                size={width * 0.07}
                                color={player.isInsideLab ? 'green' : 'grey'}
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

const BackgroundImage = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: ${width}px;
    height: ${height}px;
`;

const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
`;

const KaotikaFontHeads = styled.Text`
    font-family: KochAltschrift;
    font-size: ${width * 0.11}px;
    color: white;
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
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
    width: 90%;
`;

const PlayerItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    border-bottom-color: orange;
    padding-bottom: 20px;
    border-bottom-width: 2px;
    margin-bottom: 20px;
`;

const Avatar = styled.Image`
    width: ${width * 0.13}px;
    height: ${height * 0.06}px;
    border-radius: 50px;
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

export default ConnectionScreen;