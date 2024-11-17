import { useContext, useEffect, useState } from "react";
import { Dimensions} from "react-native";
import styled from "styled-components/native";
import AppContext from "../../helpers/context";
import { useNavigation, ParamListBase, NavigationProp} from "@react-navigation/native";
import AcolyteContext from "../../helpers/AcolyteContext";
import MortimerContext from "../../helpers/MortimerContext";

const schoolMap = require('../../assets/backgrounds/schoolMap.png');
const homeIcon = require('../../assets/icons/fixed/homeIcon.png');
const hallIcon = require('../../assets/icons/hallOfSages.png');
const labIcon = require('../../assets/icons/fixed/potionIcon.png');


const { width, height } = Dimensions.get('window');

const Container = styled.View`
    flex: 1;
    position: relative;
`;

const BackgroundImage = styled.ImageBackground`
    width: ${width}px;
    height: ${height}px;
    position: absolute;
    z-index: -1;
`;

const Icon = styled.Image`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: ${width * 0.5}px;
    z-index: 2; 
`;

const TouchableIcon = styled.TouchableOpacity`
    position: absolute;
    border-width: 2px;
    border-color: white;
    border-radius: 100px;
    padding: -30px;
`

const SchoolScreen = () => {
    
    const setLocation = useContext(AppContext)?.setLocation;
    const acolyteContext = useContext(AcolyteContext);
    const isMenuLoaded = acolyteContext?.isMenuLoaded;
    const isMenuHallOfSagesLoaded = acolyteContext?.isMenuHallOfSagesLoaded;
    const isMenuLabLoaded = acolyteContext?.isMenuLabLoaded;

    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

useEffect(() => {
    console.log("States of loaded mennús: ", {
        isMenuLoaded,
        isMenuHallOfSagesLoaded,
    });

    const navigateToMenu = () => {
        switch (true) {
            case isMenuHallOfSagesLoaded:
                setTimeout(() => {
                    navigation.navigate('HALL');
                }, 200);
                break;
            case isMenuLabLoaded:
                setTimeout(() => {
                    navigation.navigate('LAB');
                }, 200);
                break;
            
            default:
                break;
        }
    };

    navigateToMenu();
    
}, [isMenuLoaded, isMenuHallOfSagesLoaded, isMenuLabLoaded]);


    const handleHallIconPress = () => {
        setLocation('HALL');
        if(isMenuHallOfSagesLoaded){
            navigation.navigate('HALL');

        }
    }   

    const handleLabIconPress = () => {
        setLocation('LAB');
        if(isMenuLabLoaded){
            navigation.navigate('LAB');

        }
    }   

    return (
        <Container>
            <BackgroundImage source={schoolMap} />
            <TouchableIcon
                onPress={handleHallIconPress}
                style={{ top: height * 0.20, right: width * 0.50 }}
            >
                <Icon source={hallIcon} />
            </TouchableIcon>

            <TouchableIcon
                onPress={handleLabIconPress}
                style={{ top: height * 0.33, right: width * 0.28}}
            >
                <Icon source={labIcon} />
            </TouchableIcon>
        </Container>
    );
}

export default SchoolScreen;
