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
const swampIcon =  require('../../assets/icons/towerIcon.png');


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

const LabIcon = styled.Image`
    width: ${width * 0.2}px; 
    height: ${width * 0.2}px;
    border-radius: 50px;
    z-index: 1;
`;

const TouchableIcon = styled.TouchableOpacity`
    position: absolute;
    border-width: 2px;
    border-color: white;
    border-radius: 100px;
    padding: -30px;
`

const MapScreen = () => {
    
    const setLocation = useContext(AppContext)?.setLocation;
    const acolyteContext = useContext(AcolyteContext);
    const isMenuLoaded = acolyteContext?.isMenuLoaded;
    const isMenuLabLoaded = acolyteContext?.isMenuLabLoaded;
    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

    useEffect(() => {
        console.log("ESTADO DE IS MENU LAB LOADED " + isMenuLabLoaded);

        if(isMenuLabLoaded){
            setTimeout(() => {
                navigation.navigate('LAB');

            }, 200);
        }
    }, [isMenuLabLoaded]);
    
    const handleLabIconPress = () => {
        setLocation('LAB');
        if(isMenuLabLoaded){
            navigation.navigate('LAB');
        }
    }

    const handleHomeIconPress = () => {
        setLocation('HOME');
        if(isMenuLoaded){
            navigation.navigate('Home');
        }
    }   

    const handleTowerIconPress = () => {
        setLocation('TOWER');
        if(isMenuLoaded){
            navigation.navigate('TOWER');
        }
    }   

    const handleSwampIconPress = () => {
        setLocation('SWAMP');
        if(isMenuLoaded){
            navigation.navigate('SWAMP');
        }
    }   

    return (
        <Container>
            <BackgroundImage source={mapImage} />
            <TouchableIcon 
                onPress={handleLabIconPress}
                style={{ top: height * 0.37, left: width * 0.1 }}
            >
                <LabIcon source={labIcon}  /> 
            </TouchableIcon>

            <TouchableIcon
                onPress={handleHomeIconPress}
                style={{ top: height * 0.55, right: width * 0.37 }}
            >
                <HomeIcon source={homeIcon} />
            </TouchableIcon>

            <TouchableIcon
                onPress={handleTowerIconPress}
                style={{ top: height * 0.28, right: width * 0.13 }}
            >
                <TowerIcon source={towerIcon} />
            </TouchableIcon>

            <TouchableIcon
                onPress={handleSwampIconPress}
                style={{ top: height * 0.39, right: width * 0.02 }}
            >
                <TowerIcon source={swampIcon} />
            </TouchableIcon>
        </Container>
    );
}

export default MapScreen;
