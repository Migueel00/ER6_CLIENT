import { useContext, useEffect, useState } from "react";
import { Dimensions} from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import { useNavigation, ParamListBase, NavigationProp} from "@react-navigation/native";
import MortimerContext from "../../../helpers/MortimerContext";
import messaging from '@react-native-firebase/messaging';
import VillainContext from "../../../helpers/VillainContext";


const mapImage = require('../../../assets/backgrounds/map_background.png');
const labIcon = require('../../../assets/icons/fixed/potionIcon.png');
const homeIcon = require('../../../assets/icons/fixed/homeIcon.png');
const towerIcon = require('../../../assets/icons/towerIcon.png');
const schoolIcon =  require('../../../assets/icons/schoolIcon.png');


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
    height: ${height * 0.1}px;
    border-radius: 50px;
    z-index: 2; 
`;

const LabIcon = styled.Image`
    width: ${width * 0.2}px; 
    height: ${height * 0.1}px;
    border-radius: 50px;
    z-index: 1;
`;

const TowerIcon = styled.Image`
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

const MapScreenVillain = () => {
    
    const appContext = useContext(AppContext);
    const setLocation = appContext?.setLocation;
    const villainContext = useContext(VillainContext);
    const isMenuLoaded = villainContext?.isMenuLoaded;
    const isMenuTowerLoaded = villainContext?.isMenuTowerLoaded;
    const isMenuOldSchoolLoaded = villainContext?.isMenuOldSchoolLoaded;
    const isMenuLabLoaded = villainContext?.isMenuLabLoaded;

    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

    useEffect(() => {
        console.log("ESTADO DE IS MENU LAB LOADED " + isMenuLabLoaded);
        console.log("ESTADO DE IS MENU TOWER LOADED " + isMenuTowerLoaded);
        console.log("ESTADO DE IS MENU OLDSCHOOL LOADED " + isMenuOldSchoolLoaded);

        if (isMenuLabLoaded) {
            setTimeout(() => {
                navigation.navigate('LAB');
            }, 200);
        } else if (isMenuTowerLoaded) {
            setTimeout(() => {
                navigation.navigate('TOWER');
            }, 200);
        } else if (isMenuOldSchoolLoaded){
            setTimeout(() => {
                navigation.navigate('OLDSCHOOL');
            }, 200);
        }
    }, [isMenuLabLoaded, isMenuTowerLoaded, isMenuOldSchoolLoaded]);
    
    const handleLabIconPress = () => {
        setLocation('LAB');
        
        if(isMenuLabLoaded){
            navigation.navigate('LAB');
        }
    }

    const handleHomeIconPress = () => {
        setLocation('HOME');
        console.log(isMenuLoaded);
        if(isMenuLoaded){
            navigation.navigate('Home');
        }
    }   

    const handleTowerIconPress = () => {
        setLocation('TOWER');
        if(isMenuTowerLoaded){
            navigation.navigate('TOWER');
        }
    }   

    const handleSchoolIconPress = () => {
        setLocation('OLDSCHOOL');
        if(isMenuOldSchoolLoaded){
            navigation.navigate('OLDSCHOOL');
        }
    }   


    return (
        <Container>
            <BackgroundImage source={mapImage} />
            <TouchableIcon 
                onPress={handleLabIconPress}
                style={{ top: height * 0.37, left: width * 0.02 }}
            >
                <LabIcon source={labIcon}  /> 
            </TouchableIcon>
            <TouchableIcon
                onPress={handleHomeIconPress}
                style={{ top: height * 0.72, right: width * 0.37 }}
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
                onPress={handleSchoolIconPress}
                style={{ top: height * 0.60, right: width * 0.45 }}
            >
                <TowerIcon source={schoolIcon} />
            </TouchableIcon>
        </Container>
    );
}

export default MapScreenVillain;
