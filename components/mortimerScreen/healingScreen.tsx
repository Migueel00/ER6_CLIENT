import React, { useEffect, useContext, useState } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from '../../helpers/context';
import MortimerContext from '../../helpers/MortimerContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Player } from '../../interfaces/contextInterface';
import ModalInfo from './ModalInfo';
import { URL } from '../../src/API/urls';
import { patchPlayerWithUserID } from '../../src/API/get&post';

const { height, width } = Dimensions.get('window');

const HealingScreen = () => {
  const appContext = useContext(AppContext);
  const mortimerContext = useContext(MortimerContext);
  const players = appContext?.players!;
  const socket = appContext?.socket;
  const setPlayers = appContext?.setPlayers;
  const setLocation = appContext?.setLocation;
  const isMenuOldSchoolLoaded = mortimerContext?.isMenuOldSchoolLoaded;
  const [playerInfo, setPlayerInfo] = useState<Player | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

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

  const getTextDetail = (player: Player) => {
    if (player.ethazium) return "Cursed"
    if (player.medularApocalypse || player.epicWeakness || player.putridPlague) return "Sick"
    return 'Healthy'
    return;
  }

  const handleHealButton = async () => {
    try {
      const updatedState: Partial<Player> = {};

      const updateState = {
        ethazium: false,
        epicWeakness: false,
        putridPlague: false,
        medularApocalypse: false,
        attributes: {
          intelligence: playerInfo?.attributes.intelligence,
          dexterity: playerInfo?.attributes.dexterity,
          charisma: playerInfo?.attributes.charisma,
          constitution: playerInfo?.attributes.constitution,
          strength: playerInfo?.attributes.strength,
          insanity: playerInfo?.attributes.insanity,
          resistence: playerInfo?.attributes.resistence
        }
      };

      // Actualizar los valores booleanos
      if (playerInfo?.ethazium) updatedState.ethazium = false;
      if (playerInfo?.epicWeakness) updatedState.epicWeakness = false;
      if (playerInfo?.putridPlague) updatedState.putridPlague = false;
      if (playerInfo?.medularApocalypse) updatedState.medularApocalypse = false;


      // Verificar si hay algo que actualizar
      if (Object.keys(updateState).length === 0) {
        console.log("No state to update.");
        return;
      }

      const updatedPlayer = await patchPlayerWithUserID(playerInfo?._id, updateState);

      socket.emit('applyHeal', updatedPlayer);

      handleCloseModal();
    }

    catch (error) {
      console.log(`And error has ocurred ${error}`);
    }
  }

  const hanldeOpenModal = (player: Player) => {
    setPlayerInfo(player);
    setVisible(true);
  }

  const handleCloseModal = () => {
    setVisible(false);
  }

  return (
    <BackgroundImage
      source={require('../../assets/png/connectionsBackground.png')}
    >
      <ModalInfo
        player={playerInfo}
        visible={visible}
        handleCloseModal={handleCloseModal}
        handleHealButton={handleHealButton}
      />
      <Container>

        <KaotikaFontHeads>Click on an avatar if you want to heal the Acolyte{' '}
        </KaotikaFontHeads>
        <PlayersList>
          {players
            .filter((player: any) => player.role === 'ACOLYTE' && !player.isBetrayer)
            .map((player: any) => (
              <PlayerItem key={player.id}>
                <TouchableOpacity
                  onPress={() => hanldeOpenModal(player)}>
                  <Avatar source={{ uri: player.avatar }} />
                </TouchableOpacity>
                <KaotikaFont2>{player.nickname}</KaotikaFont2>
                <IllCursedText>{getTextDetail(player)}</IllCursedText>
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

const ConnectionIcon = styled(Icon)`
    margin-left: ${height * 0.02}px;
    
`

const ColoredText = styled.Text<{ color: string }>`
    font-family: KochAltschrift;
    color: ${(props) => props.color};
    font-size: ${height * 0.04}px;
`;

const IllCursedText = styled.Text`
    font-family: KochAltschrift;
    font-size: ${height * 0.04}px;
    color: red;
    margin-left: ${height * -0.01}px;
`;

const BackgroundImage = styled.ImageBackground`
    flex: 1;
    align-items: center;
    width: ${width}px;
    height: ${height * 0.98}px;
`;

const Container = styled.View`
    flex: 1;
    gap: ${height * 0.09}px;
    align-items: center;
    padding: 10px;
    width: ${width}px;
`;

const KaotikaFontHeads = styled.Text`
    font-family: KochAltschrift;
    font-size: ${height * 0.04}px;
    color: white;
    align-items: center;
    text-align: center;
    background-color: rgba(0,0,0,0.7);
    border-radius: ${height * 0.02}px;
    margin-top: ${height * 0.02}px;
`;

const KaotikaFont2 = styled.Text`
    font-family: KochAltschrift;
    color: white;
    margin-vertical: 5px;
    text-align: left;
    margin-left: ${width * 0.02}px;
    width: 57%;
    font-size: ${height * 0.035}px;
`;

const PlayersList = styled.View`
    align-items: flex-start;
    background-color: rgba(0, 0, 0, 0.5);
    padding: ${width * 0.04}px;
    border-radius: ${width * 0.1}px;
    border-width: ${width * 0.002}px;
    border-color: white;
    width: 90%;
`;

const PlayerItem = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-color: orange;
    padding-bottom: ${width * 0.05}px;
    border-bottom-width: ${width * 0.006}px;
    margin-bottom:${width * 0.05}px;
    width: 100%;
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

export default HealingScreen;