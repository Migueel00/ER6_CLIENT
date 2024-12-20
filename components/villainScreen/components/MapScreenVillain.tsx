import { useContext, useEffect, useState } from "react";
import { Dimensions} from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import { useNavigation, ParamListBase, NavigationProp} from "@react-navigation/native";

import VillainContext from "../../../helpers/VillainContext";


const mapImage = require('../../../assets/backgrounds/map_background.png');
const labIcon = require('../../../assets/icons/lab-icon.png');
const homeIcon = require('../../../assets/icons/fixed/homeIcon.png');
const towerIcon = require('../../../assets/icons/towerIcon.png');



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

const TouchableIcon = styled.TouchableOpacity`
    position: absolute;
`

const TowerIcon = styled.Image`
    width: ${width * 0.2}px;
    height: ${width * 0.2}px;
    border-radius: 50px;
    z-index: 2; 
`;


const MapScreenVillain = () => {
    
    const setLocation = useContext(AppContext)?.setLocation;
    const villainContext = useContext(VillainContext);
    const isMenuLoaded = villainContext?.isMenuLoaded
    const isMenuLabLoaded = villainContext?.isMenuLabLoaded;
    const isMenuTowerLoaded = villainContext?.isMenuTowerLoaded;
    const appContext = useContext(AppContext);
    const socket = appContext?.socket;

    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation(); 

    useEffect(() => {
        console.log("ESTADO DE IS MENU LAB LOADED " + isMenuLabLoaded);


        const value = {
            playerID: appContext?.player._id,
            location: appContext?.location
        };

        socket.emit("UpdateLocation", value);

        if(isMenuLabLoaded){
            setTimeout(() => {
                navigation.navigate('LAB');

            }, 200);
        }
    }, [isMenuLabLoaded]);

    useEffect(() => {

        if(isMenuTowerLoaded){
            setTimeout(() => {
                navigation.navigate('TOWER');

            }, 200);
        }
    }, [isMenuTowerLoaded]);
    
    const handleLabIconPress = () => {
        setLocation('INSIDE_LAB');
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
                style={{ top: height * 0.53, right: width * 0.37 }}
            >
                <HomeIcon source={homeIcon} />
            </TouchableIcon>
            <TouchableIcon
                onPress={handleTowerIconPress}
                style={{ top: height * 0.28, right: width * 0.13 }}
            >
                <TowerIcon source={towerIcon} />
            </TouchableIcon>
        </Container>
    );
}

export default MapScreenVillain;
