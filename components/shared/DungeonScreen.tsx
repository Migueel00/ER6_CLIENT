import React from "react";
import styled from "styled-components/native";
import { Dimensions, TouchableOpacity } from "react-native";
import { useContext } from "react";
import AppContext from "../../helpers/context";
import AcolyteContext from "../../helpers/AcolyteContext";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const CustomBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const CenteredText = styled.Text`
    font-size: 60px;
    color: white;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
    font-family: 'KochAltschrift';
`;

const StyledButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.07}px;
    font-family: 'KochAltschrift';
    padding: 10px;
`;

const StyledCorridorButton = styled(TouchableOpacity)`
    backgroundColor: 'rgba(0, 0, 0, 0.8)';
    height: ${height * 0.1}px;
    width: ${width * 0.65}px;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: ${width * 0.4}px;
    bottom: ${height * 0.03}px;
`;



const background = require('../../assets/backgrounds/dungeon.png');

const DungeonScreen = () => {

    const navigation: NavigationProp<ParamListBase> = useNavigation(); 
    
    const appContext = useContext(AppContext);
    const player = appContext?.player;
    const setLocation = appContext?.setLocation;
    const acolyteContext = useContext(AcolyteContext);
    const isMenuOldSchoolLoaded = acolyteContext?.isMenuOldSchoolLoaded;

    const handleGoToCorridor = () => {
        console.log("PRESSED SCHOOL BUTTON IN DUNGEON");
        
        setLocation('OLDSCHOOL');
        if(isMenuOldSchoolLoaded){
            console.log("NAVIGATING TO OLDSCHOOL");
            
            navigation.navigate('OLDSCHOOL');
        }
    }   

    return (
        <CustomBackground source={background}>
            <CenteredText>THE OLD SCHOOL DUNGEON</CenteredText>

            <StyledCorridorButton onPress={handleGoToCorridor}>
                <StyledButtonText>Go back to the corridor</StyledButtonText>
            </StyledCorridorButton>
        </CustomBackground>
    );
}

export default DungeonScreen;
