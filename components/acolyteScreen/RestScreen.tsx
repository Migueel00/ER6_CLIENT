import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import styled from "styled-components/native";
import AppContext from "../../helpers/context";
import * as Progress from "react-native-progress";
import { Player } from "../../interfaces/contextInterface";
import RecipeModal from "../shared/PotionCreator/RecipeModal";

const { width, height } = Dimensions.get("screen");
const recipeBookIcon = require('./../../assets/icons/bookIcon.png')

const ITEM_SIZE = width * 0.60;

const CONSTANTS = {
  ITEM_SIZE,
  SPACING: 10,
  WIDTH: width,
  SPACER_ITEM_SIZE: (width - ITEM_SIZE) / 2,
  HEIGHT: height,
  BUTTON_SPACING: 0.01,
  BUTTON_RIGHT: 0.05
};

const RestScreen = () => {
  const appContext = useContext(AppContext);
  const player = appContext?.player;
  const socket = appContext?.socket;
  const setPlayer = appContext?.setPlayer;

  const [recipeModalVisible, setRecipeModalVisible] = useState<boolean>(false);

  const progress = player?.attributes.resistence! / 100;

  useEffect(() => {
    socket.on("changeResistence", (value: Player) => {
      console.log("VALUE CHANGE RESISTENCE: ");
      console.log(value);
      setPlayer(value);
    });
  }, []);

  const handleRestButton = async () => {
    const values = {
      playerID: player?._id,
      resistence: 100,
    };

    socket.emit("rest", values);
  };

  const handlePressRecipe = () => {
    setRecipeModalVisible(true);
  }

  return (
    <Container>
      <ProfileText fontSize={width * 0.1}>Resistence {progress*100}/100</ProfileText>
      <Progress.Bar progress={progress} width={width * 0.8} color="#C19A6B" />
      <RestButtons onPress={handleRestButton}>
        <RestText >Rest</RestText>
      </RestButtons>

      {/* Separador */}
      <Separator />

      {/* Curses Section */}
      <CursesTitle >Curses affecting you</CursesTitle>
      <ScrollViewContainer>
        <ScrollView>
          {player?.curses?.map((curse, index) => (
            <CurseItem key={index}>
              <CurseName>{curse.name}</CurseName>
            </CurseItem>
          ))}
        </ScrollView>
      </ScrollViewContainer>
      <RecipeButton onPress={handlePressRecipe}>
        <IconImage source={recipeBookIcon}></IconImage>
      </RecipeButton>

      <RecipeModal
          visible={recipeModalVisible}
          onClose={() => setRecipeModalVisible(false)}
          curses={player?.curses!}
        />
    </Container>
  );
};

const Container = styled.View`
    width: ${width}px;
    height: ${height}px;
    background-color: black;
    display: flex;
    z-index: -1;
    padding: ${width * 0.01}px;
    align-items: center;
`;

const ProfileText = styled.Text<{ fontSize: number }>`
    color: white;
    font-family: "KochAltschrift";
    font-size: ${({ fontSize }) => fontSize}px;
    padding: ${height * 0.004}px;
`;

const RestText = styled.Text`
    color: white;
    font-family: "KochAltschrift";
    font-size: ${height * 0.05}px;
    padding: ${height * 0.004}px;
    bottom: ${height * 0.005}px;
`;

const RestButtons = styled.TouchableOpacity`
    background-color: orange;
    width: ${width * 0.4}px;
    height: ${width * 0.13}px;
    border-radius: ${width * 0.2}px;
    margin-top: ${width * 0.05}px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// Separador
const Separator = styled.View`
    width: ${width * 0.8}px;
    height: 1px;
    background-color: gray;
    margin: ${width * 0.05}px 0;
`;

// Contenedor de ScrollView
const ScrollViewContainer = styled.View`
    width: ${width * 0.95}px;
    height: ${height * 0.315}px;
    margin-top: ${width * 0.05}px;
    border: ${height * 0.001}px solid gray;
    border-radius: ${height * 0.01}px;
    overflow: hidden;
`;

// Elemento individual de Curse
const CurseItem = styled.View`
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-color: gray;
`;

const CurseName = styled.Text`
    color: white;
    font-family: "KochAltschrift";
    font-size: ${height * 0.035}px;
    padding: 5px;
`
const CursesTitle = styled.Text`
    color: white;
    font-family: "KochAltschrift";
    font-size: ${height * 0.05}px;
    padding: 5px;`

    const RecipeButton = styled.TouchableOpacity`
    margin-top: ${height * 0.02}px;
    align-items: center;
    justify-content: center;
    width: ${CONSTANTS.WIDTH * 0.17}px;
    height: ${CONSTANTS.WIDTH * 0.17}px; 


`;

const IconImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: transparent;
`;

export default RestScreen;
