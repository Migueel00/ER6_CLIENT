import { useContext, useEffect, useState } from "react";
import { Dimensions} from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import { useNavigation, ParamListBase, NavigationProp} from "@react-navigation/native";
import VillainContext from "../../../helpers/VillainContext";


const mapImage = require('./../../../assets/backgrounds/map_background.png');
const homeIcon = require('./../../../assets/icons/fixed/homeIcon.png');
const towerIcon = require('./../../../assets/icons/towerIcon.png');
const schoolIcon =  require('./../../../assets/icons/schoolIcon.png');
const swampIcon =  require('./../../../assets/icons/swampIcon.png');


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
    border-radius: ${width * 0.5}px;
    z-index: 2; 
`;

const TowerIcon = styled.Image`
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

const MapScreenVillain = () => {
    
    const appContext = useContext(AppContext);
    const setLocation = appContext?.setLocation;
    const villainContext = useContext(VillainContext);
    const isMenuLoaded = villainContext?.isMenuLoaded;
    const isMenuTowerLoaded = villainContext?.isMenuTowerLoaded;
    const isMenuOldSchoolLoaded = villainContext?.isMenuOldSchoolLoaded;
    const isMenuLabLoaded = villainContext?.isMenuLabLoaded;
    const isMenuSwampLoaded = villainContext?.isMenuSwampLoaded;

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
        } else if (isMenuSwampLoaded){
            setTimeout(() => {
                navigation.navigate('SWAMP');
            }, 200);
        }
    }, [isMenuLabLoaded, isMenuTowerLoaded, isMenuOldSchoolLoaded]);

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

    const handleSwampIconPress = () => {
        setLocation('SWAMP');
        if(isMenuTowerLoaded){
            navigation.navigate('SWAMP');
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
                onPress={handleHomeIconPress}
                style={{ top: height * 0.71, right: width * 0.37 }}
            >
                <HomeIcon source={homeIcon} />
            </TouchableIcon>
            <TouchableIcon
                onPress={handleTowerIconPress}
                style={{ top: height * 0.28, right: width * 0.13}}
            >
                <TowerIcon source={towerIcon} />
            </TouchableIcon>
            <TouchableIcon
                onPress={handleSchoolIconPress}
                style={{ top: height * 0.58, right: width * 0.45 }}
            >
                <TowerIcon source={schoolIcon} />
            </TouchableIcon>
            <TouchableIcon
                onPress={handleSwampIconPress}
                style={{top: height * 0.42, right: width * 0.05}}
            >
                <TowerIcon source={swampIcon} />
            </TouchableIcon>
        </Container>
    );
}

export default MapScreenVillain;
