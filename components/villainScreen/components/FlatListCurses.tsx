import { Dimensions, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { Animated } from "react-native";
import { useRef, useEffect, useState } from "react";
import Ingredient from "../../potions/ingredient";
import Curse from "../../potions/curse";
import ApplyCurseModal from "./ApplyCurseModal";

const { width, height } = Dimensions.get('window');

interface FlatListCurses {
  curses: Curse[];
  handleLongPress: (item: Ingredient) => void;
  showNotFoundText: boolean;

}


const curseIcon2 = require('./../../../assets/icons/curseIcon2.png');

const kaotikaApiUrl = 'https://kaotika.vercel.app'

const ITEM_SIZE = width * 0.60;

const CONSTANTS = {
  ITEM_SIZE,
  SPACING: 10,
  WIDTH: width,
  SPACER_ITEM_SIZE: (width - ITEM_SIZE) / 2,
  HEIGHT: height,
  BUTTON_SPACING: 0.02,
  BUTTON_RIGHT: 0.05
};

// Función para formatear los efectos
const formatEffects = (effects: string[]): string => {
  return effects
    .map(effect =>
      effect
        .split('_') // Divide los guiones bajos
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Primera letra de cada palabra mayúscula
        .join(' ') // Une las palabras con espacios
    )
    .join(', '); // Une los diferentes efectos con comas
};





const FlatListCurses: React.FC<FlatListCurses> = ({ curses, handleLongPress, showNotFoundText }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurse, setSelectedCurse] = useState<Curse | null>(null);

  const openModal = (curse: Curse) => {
    setSelectedCurse(curse);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCurse(null);
    setModalVisible(false);
  };

  // console.log("CURSES IN FLATLIST");
  // console.log(curses);

  useEffect(() => {
    console.log("HA ENTRADO A HACER EL SCROLL AL INICIO");

    // Desplazar FlatList al índice 0 cuando cambian los ingredientes
    if (flatListRef.current && curses.length > 0) {
      console.log("CURRENT EXISTE");

      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  }, [curses]);

  return (
    <FlatListView>
      {showNotFoundText ? (
        <NotFoundTextContainer>
          <NotFoundTextOutline>{`No curses matches your filter`}</NotFoundTextOutline>
          <NotFoundText>{`No curses matches your filter`}</NotFoundText>
        </NotFoundTextContainer>
      ) : (
        <Animated.FlatList
          initialNumToRender={curses.length}
          maxToRenderPerBatch={curses.length}
          updateCellsBatchingPeriod={curses.length}
          ref={flatListRef}
          snapToInterval={CONSTANTS.ITEM_SIZE}
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          scrollEventThrottle={16}
          horizontal
          data={curses}
          keyExtractor={(item) => item._id ? item._id.toString() : item.key}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            if (!item.name) return <DummyContainer />

            const inputRange = [
              (index - 2) * CONSTANTS.ITEM_SIZE,
              (index - 1) * CONSTANTS.ITEM_SIZE,
              index * CONSTANTS.ITEM_SIZE
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [-20, -50, -20]
            });

            return (
              <TouchableWithoutFeedback onLongPress={() => handleLongPress(item)}>
                <CurseContainer>
                  <CurseItem as={Animated.View} style={{ transform: [{ translateY }] }}>
                    <CurseName>{item.name}</CurseName>
                    <CurseImage source={curseIcon2} />
                    <ApplyButton onPress={() => openModal(item)}>
                      <ApplyButtonText>Apply</ApplyButtonText>
                    </ApplyButton>
                    {/* <CurseEffects>{formatEffects(item.effects)}</CurseEffects> */}
                  </CurseItem>
                </CurseContainer>
              </TouchableWithoutFeedback>
            )
          }}

        />

      )}

      {modalVisible && selectedCurse && (
        <ApplyCurseModal
          visible={modalVisible}
          onClose={closeModal}
          curse={selectedCurse}
        />
      )}


    </FlatListView>
  );
}

const ApplyButton = styled.TouchableOpacity`
    margin-top: ${height * 0.02}px;
    background-color: #C19A6B;
    padding: ${height * 0.005}px ${width * 0.05}px;
    border-radius: ${width * 0.02}px;
    align-items: center;
`;

const ApplyButtonText = styled.Text`
    font-size: ${width * 0.1}px;
    font-family: 'KochAltschrift';
    bottom: ${height * 0.005}px;
    color: #FFF;
`;

const FlatListView = styled.View`
    width: 100%;
    height: ${height * 0.9}px;
`;

const DummyContainer = styled.View`
    width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`;


const CurseContainer = styled.View`
    width: ${CONSTANTS.ITEM_SIZE}px;
    margin-top: ${height * - 0.10}px;
`;

const CurseName = styled.Text`
    font-size: ${width * 0.08}px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
    margin-bottom: ${height * 0.01}px;
`;

const CurseImage = styled.Image`
    width: ${CONSTANTS.ITEM_SIZE * 0.60}px;
    height: ${CONSTANTS.ITEM_SIZE * 0.60}px;
    resize-mode: cover;
    border-width: 1.5px;
    border-color: #FFF;
    border-radius: ${width * 0.02}px;
`;

const CurseEffects = styled.Text`
    font-size: ${width * 0.06}px;
    font-family: 'KochAltschrift';
    color: #FFF;
    text-align: center;
    margin-top: ${height * 0.005}px;
`;

const CurseItem = styled.View`
    margin-horizontal: ${CONSTANTS.SPACING}px;
    padding: ${CONSTANTS.SPACING}px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    border-width: 1.5px;
    border-color: #C19A6B;
    border-radius: ${width * 0.02}px;
    height: ${height * 0.385}px;
`;

const NotFoundTextContainer = styled.View`
    margin-top: ${height * 0.02}px;
    align-items: center;
    top: 25%;
`;

const NotFoundTextOutline = styled.Text`
    font-size: ${width * 0.15}px;
    font-family: 'KochAltschrift';
    color: #000; 
    position: absolute; 
    text-align: center;
`;

const NotFoundText = styled.Text`
    font-size: ${width * 0.150}px;
    font-family: 'KochAltschrift';
    color: #FFF; /* Black color for main text */
    text-align: center;
`;

export default FlatListCurses;