import React, { useContext } from "react";
import { Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Curse from "../../potions/curse";
import { Dimensions } from "react-native";
import AppContext from "../../../helpers/context";

const { width, height } = Dimensions.get('window');

interface ApplyCurseModalProps {
  visible: boolean;
  onClose: () => void;
  curse: Curse | null;
}

const ApplyCurseModal: React.FC<ApplyCurseModalProps> = ({ visible, onClose, curse }) => {

  const appContext = useContext(AppContext);
  const players = appContext?.players;

  const acolytePlayers = players?.filter(player => player.role === 'ACOLYTE');

  const handleSquarePress = (playerId: string) => {
    // Aquí puedes agregar la lógica de lo que pasa cuando presionas el cuadrado
    console.log(`Square pressed for player with ID: ${playerId}`);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalContent>
          <ModalTitle>Apply {curse?.name}</ModalTitle>

          {acolytePlayers && acolytePlayers.length > 0 && (
            <PlayersList>
              {acolytePlayers.map((player, index) => (
                <React.Fragment key={player.id}>
                  <PlayerRow>
                    <PlayerText>{player.nickname}</PlayerText>
                    {/* Cuadrado pulsable alineado a la derecha */}
                    <TouchableOpacity onPress={() => handleSquarePress(player._id)}>
                      <Square />
                    </TouchableOpacity>
                  </PlayerRow>
                  {/* Mostrar el separador solo si no es el último jugador */}
                  {index < acolytePlayers.length - 1 && <Separator/>}
                </React.Fragment>
              ))}
            </PlayersList>
          )}

          <CloseButton onPress={onClose}>
            <CloseButtonText>Close</CloseButtonText>
          </CloseButton>
        </ModalContent>
      </ModalContainer>
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
    height: 80%; /* Adjust height to occupy more of the screen */
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
`;

const ModalText = styled.Text`
    font-size: ${width * 0.06}px; /* Adjust the size of the text */
    font-family: 'KochAltschrift';
    color: #FFF;
    margin-vertical: ${height * 0.02}px;
    text-align: center;
`;

const CloseButton = styled(TouchableOpacity)`
    margin-top: ${height * 0.05}px;
    background-color: #C19A6B;
    padding: ${height * 0.015}px ${width * 0.1}px;
    border-radius: ${width * 0.03}px;
    align-items: center;
`;

const CloseButtonText = styled.Text`
    font-size: ${width * 0.06}px; /* Increase the font size for the close button text */
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
  width: ${width * 0.1}px; /* Tamaño del cuadrado */
  height: ${width * 0.1}px; /* Tamaño del cuadrado */
  background-color: #C19A6B;
  border-radius: 4px; /* Redondear ligeramente las esquinas */
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
