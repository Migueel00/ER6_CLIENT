import React, { useEffect, useContext } from 'react';
import { Dimensions, Image } from 'react-native';
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

                <ExitButton onPress={handleExitLab}>
                    <ExitButtonText>Exit Lab</ExitButtonText>
                </ExitButton>
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

const ExitButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 30px;
    width: 80%;
    padding-vertical: 15px;
    background-color: red;
    border-radius: 10px;
    align-items: center;
`;

const ExitButtonText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: bold;
    font-family: KochAltschrift;
`;

export default ConnectionScreen;