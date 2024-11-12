import { useContext, useEffect, useState } from "react";
import { Dimensions} from "react-native";
import styled from "styled-components/native";
import AppContext from "../../helpers/context";
import { useNavigation, ParamListBase, NavigationProp} from "@react-navigation/native";
import AcolyteContext from "../../helpers/AcolyteContext";

const mapImage = require('../../assets/backgrounds/map_background.png');
const homeIcon = require('../../assets/icons/fixed/homeIcon.png');
const hallOfSagesIcon = require('../../assets/icons/statsIcon.png');


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

const HomeIcon = styled.Image`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: 50px;
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

    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

useEffect(() => {
    console.log("States of loaded mennús: ", {
        isMenuLoaded,
        isMenuHallOfSagesLoaded,
    });

    const navigateToMenu = () => {
        switch (true) {
            case isMenuLoaded:
                setTimeout(() => {
                    navigation.navigate('HOME');
                }, 200);
                break;
            case isMenuHallOfSagesLoaded:
                setTimeout(() => {
                    navigation.navigate('HALL_OF_SAGES');
                }, 200);
                break;
            default:
                break;
        }
    };

    navigateToMenu();
    
}, [isMenuLoaded, isMenuHallOfSagesLoaded]);

    const handleHomeIconPress = () => {
        setLocation('HOME');
        if(isMenuLoaded){
            navigation.navigate('HOME');
        }
    }   

    const handleHallIconPress = () => {
        setLocation('HALL_OF_SAGES');
        if(isMenuHallOfSagesLoaded){
            navigation.navigate('HALL_OF_SAGES');
        }
    }   

    return (
        <Container>
            <BackgroundImage source={mapImage} />

            <TouchableIcon
                onPress={handleHomeIconPress}
                style={{ top: height * 0.72, right: width * 0.35 }}
            >
                <HomeIcon source={homeIcon} />
            </TouchableIcon>
            <TouchableIcon
                onPress={handleHallIconPress}
                style={{ top: height * 0.35, right: width * 0.15 }}
            >
                <HomeIcon source={hallOfSagesIcon} />
            </TouchableIcon>

        </Container>
    );
}

export default SchoolScreen;
