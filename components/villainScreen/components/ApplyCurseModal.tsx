import React, { useContext, useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Curse from "../../potions/curse";
import { Dimensions } from "react-native";
import AppContext from "../../../helpers/context";
import { patchPlayerWithUserID } from "../../../src/API/get&post";
import LoadCurseSpinner from "../../utils/loadCurseSpinner";
import { Player } from "../../../interfaces/contextInterface";

const { width, height } = Dimensions.get('window');

const curseIcon3 = require('./../../../assets/icons/curseIcon3.png');
const curseIcon1 = require('./../../../assets/icons/curseIcon.png');

interface ApplyCurseModalProps {
  visible: boolean;
  onClose: () => void;
  curse: Curse | null;
}

const ApplyCurseModal: React.FC<ApplyCurseModalProps> = ({ visible, onClose, curse }) => {

  const appContext = useContext(AppContext);
  const players = appContext?.players;
  const setPlayers = appContext?.setPlayers;
  const [applyingCurse, setApplyingCurse] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const acolytePlayers = players?.filter(player => player.role === 'ACOLYTE');

  const handleSquarePress = async (player: any, curse: Curse) => {

    try {
      setApplyingCurse(true);
      // Aquí puedes agregar la lógica de lo que pasa cuando presionas el cuadrado

      const curseExists = player.curses.some((c: Curse) => c.name === curse.name);

      if (curseExists) {
        setErrorMessage(`The player "${player.nickname}" already has this curse applied.`);
        console.log(`The curse "${curse.name}" is already applied to the player.`);
        setApplyingCurse(false);
        return;
      }

      console.log(`Square pressed for player with ID: ${player._id} and applied the ${curse.name} curse`);

      const updatedCurses = [...player.curses, curse];

      const patchJSON = {
        curses: updatedCurses,
      };

      const updatedPlayer = await patchPlayerWithUserID(player._id, patchJSON);

      //console.log(updatedPlayer);

      const newPlayers = players?.map(player => player._id === updatedPlayer._id ? updatedPlayer : player);

      setPlayers(newPlayers);

      setApplyingCurse(false);
    } catch (error) {
      console.error('Error handling square press:', error);
    }


  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {applyingCurse ? (
        <LoadCurseSpinner SpinnerText="Applying curse..." />
      ) : (
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Apply {curse?.name}</ModalTitle>

            {acolytePlayers && acolytePlayers.length > 0 && (
              <PlayersList>
                {acolytePlayers.map((player: Player, index) => (
                  <React.Fragment key={player.id}>
                    <PlayerRow>
                      <PlayerText>{player.nickname}</PlayerText>
                      <TouchableOpacity onPress={() => handleSquarePress(player, curse!)}>
                        {/* Renderizamos el ícono del cuadrado */}
                        <Square>
                          <PlayerIcon
                            source={player.curses.some((c: Curse) => c.name === curse?.name) ? curseIcon3 : curseIcon1}
                          />
                        </Square>
                      </TouchableOpacity>
                    </PlayerRow>
                    {index < acolytePlayers.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </PlayersList>
            )}

            <CloseButton onPress={onClose}>
              <CloseButtonText>Close</CloseButtonText>
            </CloseButton>
          </ModalContent>
        </ModalContainer>
      )}

      {/* Modal para mostrar el mensaje de error */}
      {errorMessage && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!errorMessage}
          onRequestClose={() => setErrorMessage(null)}
        >
          <ModalContainer>
            <ModalContent style={{ justifyContent: 'center' }}>
              <ModalText style={{ textAlign: 'center' }}>{errorMessage}</ModalText>
              <CloseButton onPress={() => setErrorMessage(null)}>
                <CloseButtonText>Close</CloseButtonText>
              </CloseButton>
            </ModalContent>
          </ModalContainer>
        </Modal>
      )}
    </Modal>
  );

};

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7); /* Adjust the opacity to make it darker */
`;

const ModalContent = styled.View`
    width: 90%; /* Adjust width to be larger */
    height: 90%; /* Adjust height to occupy more of the screen */
    padding: ${height * 0.03}px;
    background-color: #1e1e1e;
    border-radius: ${width * 0.05}px;
    align-items: center;
    justify-content: space-between; /* Distribute space between content */
`;

const ModalTitle = styled.Text`
    font-size: ${width * 0.1}px; /* Increase font size for the title */
    font-family: 'KochAltschrift';
    color: #FFF;
    margin-bottom: ${height * 0.05}px;
    text-align: center;
`;

const ModalText = styled.Text`
    font-size: ${width * 0.1}px; /* Adjust the size of the text */
    font-family: 'KochAltschrift';
    color: #FFF;
    margin-vertical: ${height * 0.02}px;
    text-align: center;
`;

const CloseButton = styled(TouchableOpacity)`
    margin-top: ${height * 0.05}px;
    background-color: #C19A6B;
    padding: ${height * 0.015}px ${width * 0.07}px;
    border-radius: ${width * 0.03}px;
    align-items: center;
`;

const CloseButtonText = styled.Text`
    font-size: ${width * 0.09}px; /* Increase the font size for the close button text */
    font-family: 'KochAltschrift';
    color: #FFF;
`;

const PlayersList = styled.View`
    margin-bottom: ${height * 0.05}px;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
`;

const PlayerText = styled.Text`
    font-size: ${width * 0.075}px;
    font-family: 'KochAltschrift';
    color: #FFF;
    margin-right: ${width * 0.02}px;
    top: ${height * 0.0}px;
`;

const PlayerRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* Alinea el nombre a la izquierda y el cuadrado a la derecha */
  width: 100%;
  
`;

const Square = styled.View`
  width: ${width * 0.17}px; /* Tamaño del cuadrado */
  height: ${width * 0.17}px; /* Tamaño del cuadrado */
  background-color: transparent;
  border-radius: 4px; /* Redondear ligeramente las esquinas */
  justify-content: center;
  align-items: center;
`;

const PlayerIcon = styled.Image`
  width: 100%; /* Ajusta el tamaño del ícono dentro del cuadrado */
  height: 100%; /* Ajusta el tamaño del ícono dentro del cuadrado */
  resize-mode: fill;
`;

const Separator = styled.View`
  border-bottom-width: ${height * 0.005}px; /* Aumento el grosor del borde */
  border-bottom-color: #FFF; /* Color blanco para el borde */
  margin-top: ${height * 0.025}px;
  margin-bottom: ${height * 0.025}px;
  height: 5%;
  background-color: white; /* Asegura que el fondo sea transparente */
`;

export default ApplyCurseModal;


//#C19A6B