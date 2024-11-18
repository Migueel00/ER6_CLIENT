import { useContext, useEffect, useState } from "react";
import { Dimensions} from "react-native";
import styled from "styled-components/native";
import AppContext from "../../helpers/context";
import { useNavigation, ParamListBase, NavigationProp} from "@react-navigation/native";
import AcolyteContext from "../../helpers/AcolyteContext";

const mapImage = require('../../assets/backgrounds/map_background.png');
const labIcon = require('../../assets/icons/fixed/potionIcon.png');
const homeIcon = require('../../assets/icons/fixed/homeIcon.png');
const towerIcon = require('../../assets/icons/towerIcon.png');
const swampIcon =  require('../../assets/icons/swampIcon.png');
const schoolIcon =  require('../../assets/icons/schoolIcon.png');


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
const TowerIcon = styled.Image`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: 50px;
    z-index: 2; 
`;

const HomeIcon = styled.Image`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: 50px;
    z-index: 2; 
`;

const IconContainer = styled.View`
    align-items: center;
    position: absolute;
`;

const IconText = styled.Text`
    font-family: KochAltschrift;
    color: white;
    font-size: ${height * 0.04}px;
    margin-bottom: ${height * 0.001}px;
`;

const TouchableIcon = styled.TouchableOpacity`
    border-width: 2px;
    border-color: white;
    border-radius: 100px;
`

const MapScreen = () => {
    
    const setLocation = useContext(AppContext)?.setLocation;
    const acolyteContext = useContext(AcolyteContext);
    const isMenuLoaded = acolyteContext?.isMenuLoaded;
    const isMenuLabLoaded = acolyteContext?.isMenuLabLoaded;
    const isMenuTowerLoaded = acolyteContext?.isMenuTowerLoaded;
    const isMenuSwampLoaded = acolyteContext?.isMenuSwampLoaded;
    const isMenuOldSchoolLoaded = acolyteContext?.isMenuOldSchoolLoaded;

    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

useEffect(() => {
    console.log("States of loaded mennús: ", {
        isMenuLoaded,
        isMenuLabLoaded,
        isMenuTowerLoaded,
        isMenuSwampLoaded,
        isMenuOldSchoolLoaded
    });

    const navigateToMenu = () => {
        switch (true) {
            case isMenuLabLoaded:
                setTimeout(() => {
                    navigation.navigate('LAB');
                }, 200);
                break;
            case isMenuTowerLoaded:
                setTimeout(() => {
                    navigation.navigate('TOWER');
                }, 200);
                break;
            case isMenuSwampLoaded:
                setTimeout(() => {
                    navigation.navigate('SWAMP');
                }, 200);
                break;
            case isMenuLoaded:
                setTimeout(() => {
                    navigation.navigate('HOME');
                }, 200);
                break;
            case isMenuOldSchoolLoaded:
                setTimeout(() => {
                    navigation.navigate('OLDSCHOOL');
                }, 200);
                break;
            default:
                break;
        }
    };

    navigateToMenu();
    
}, [isMenuLoaded, isMenuLabLoaded, isMenuTowerLoaded, isMenuSwampLoaded, isMenuOldSchoolLoaded]);
    const handleLabIconPress = () => {
        setLocation('LAB');
        if(isMenuLabLoaded){
            navigation.navigate('LAB');
        }
    }

    const handleHomeIconPress = () => {
        setLocation('HOME');
        if(isMenuLoaded){
            navigation.navigate('HOME');
        }
    }   

    const handleTowerIconPress = () => {
        setLocation('TOWER');
        if(isMenuTowerLoaded){
            navigation.navigate('TOWER');
        }
    }   

    const handleSwampIconPress = () => {
        console.log("PRESSED SWAMP BUTTON IN MAP");
        
        setLocation('SWAMP');
        if(isMenuSwampLoaded){
            console.log("NAVIGATING TO SWAMP");
            
            navigation.navigate('SWAMP');
        }
    }   

    const handleSchoolIconPress = () => {
        console.log("PRESSED SCHOOL BUTTON IN MAP");
        
        setLocation('OLDSCHOOL');
        if(isMenuOldSchoolLoaded){
            console.log("NAVIGATING TO OLDSCHOOL");
            
            navigation.navigate('OLDSCHOOL');
        }
    }   

    return (
        <Container>
            <BackgroundImage source={mapImage} />
            
            <IconContainer style={{ top: height * 0.69, right: width * 0.37 }}>
                <IconText>Home</IconText>
                <TouchableIcon onPress={handleHomeIconPress}>
                    <HomeIcon source={homeIcon} />
                </TouchableIcon>
            </IconContainer>

            <IconContainer style={{ top: height * 0.28, right: width * 0.13 }}>
                <IconText>Tower</IconText>
                <TouchableIcon onPress={handleTowerIconPress}>
                    <TowerIcon source={towerIcon} />
                </TouchableIcon>
            </IconContainer>

            <IconContainer style={{ top: height * 0.45, right: width * 0.02 }}>
                <IconText>Swamp</IconText>
                <TouchableIcon onPress={handleSwampIconPress}>
                    <TowerIcon source={swampIcon} />
                </TouchableIcon>
            </IconContainer>

            <IconContainer style={{ top: height * 0.50, right: width * 0.50 }}>
                <IconText>School</IconText>
                <TouchableIcon onPress={handleSchoolIconPress}>
                    <TowerIcon source={schoolIcon} />
                </TouchableIcon>
            </IconContainer>
        </Container>
    );
}

export default MapScreen;
