import { useContext, useEffect, useState } from "react";
import { Dimensions} from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import { useNavigation, ParamListBase, NavigationProp} from "@react-navigation/native";
import VillainContext from "../../../helpers/VillainContext";
import IstvanContext from "../../../helpers/IstvanContext";


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

const Icon = styled.Image`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: ${width * 0.5}px;
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

const MapScreenIstvan = () => {
    
    const appContext = useContext(AppContext);
    const setLocation = appContext?.setLocation;
    const istvanContext = useContext(IstvanContext);
    const isMenuLoaded = istvanContext?.isMenuLoaded;
    const isMenuTowerLoaded = istvanContext?.isMenuTowerLoaded;
    const isMenuOldSchoolLoaded = istvanContext?.isMenuOldSchoolLoaded;
    const isMenuLabLoaded = istvanContext?.isMenuLabLoaded;
    const isMenuSwampLoaded = istvanContext?.isMenuSwampLoaded;

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
        } else if (isMenuLoaded){
            setTimeout(() => {
                navigation.navigate('HOME');
            }, 200);
        }
    }, [isMenuLabLoaded, isMenuTowerLoaded, isMenuOldSchoolLoaded, isMenuSwampLoaded, isMenuLoaded]);

    const handleHomeIconPress = () => {
        setLocation('HOME');
        console.log(isMenuLoaded);
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
        setLocation('SWAMP');
        if(isMenuSwampLoaded){
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

            <IconContainer style={{ top: height * 0.69, right: width * 0.37 }}>
                <IconText>Home</IconText>
                <TouchableIcon onPress={handleHomeIconPress}>
                    <Icon source={homeIcon} />
                </TouchableIcon>
            </IconContainer>

            <IconContainer style={{ top: height * 0.28, right: width * 0.13 }}>
                <IconText>Tower</IconText>
                <TouchableIcon onPress={handleTowerIconPress}>
                    <Icon source={towerIcon} />
                </TouchableIcon>
            </IconContainer>

            <IconContainer style={{ top: height * 0.50, right: width * 0.50 }}>
                <IconText>School</IconText>
                <TouchableIcon onPress={handleSchoolIconPress}>
                    <Icon source={schoolIcon} />
                </TouchableIcon>
            </IconContainer>
            
            <IconContainer style={{ top: height * 0.45, right: width * 0.02 }}>
                <IconText>Swamp</IconText>
                <TouchableIcon onPress={handleSwampIconPress}>
                    <Icon source={swampIcon} />
                </TouchableIcon>
            </IconContainer>
        </Container>
    );
}

export default MapScreenIstvan;
