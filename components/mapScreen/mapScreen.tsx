import { useContext } from "react";
import { Dimensions, View } from "react-native";
import styled from "styled-components/native";
import AppContext from "../../helpers/context";

const mapImage = require('../../assets/backgrounds/map_background.png');
const labIcon = require('../../assets/icons/fixed/potionIcon.png');
const homeIcon = require('../../assets/icons/fixed/homeIcon.png');

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

const MapScreen = () => {
    const setLocation = useContext(AppContext)?.setLocation;

    const handleLabIconPress = () => {
        setLocation('LAB')
    }

    const handleHomeIconPress = () => {
        setLocation('HOME');
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
        </Container>
    );
}

export default MapScreen;
