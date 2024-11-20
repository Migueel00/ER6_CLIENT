import { useContext, useEffect, useState } from "react";
import { Dimensions} from "react-native";
import styled from "styled-components/native";
import AppContext from "../../../helpers/context";
import { useNavigation, ParamListBase, NavigationProp} from "@react-navigation/native";
import MortimerContext from "../../../helpers/MortimerContext";
import messaging from '@react-native-firebase/messaging';


const mapImage = require('../../../assets/backgrounds/map_background.png');
const swampIcon = require('../../../assets/icons/swampIcon.png');
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

const MapScreenMortimer = () => {
    
    const appContext = useContext(AppContext);
    const setLocation = appContext?.setLocation;
    const mortimerContext = useContext(MortimerContext);
    const isMenuLoaded = mortimerContext?.isMenuLoaded;
    const isMenuTowerLoaded = mortimerContext?.isMenuTowerLoaded;
    const isMenuOldSchoolLoaded = mortimerContext?.isMenuOldSchoolLoaded;
    const isMenuSwampLoaded = mortimerContext?.isMenuSwampLoaded;

    const [showAlertButton, setShowAlertButton] = useState(false);

    // Navigation tipado
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    useEffect(() => {
        console.log("States of loaded mennús: ", {
            isMenuLoaded,
            isMenuTowerLoaded,
            isMenuOldSchoolLoaded,
            isMenuSwampLoaded
    });

    const navigateToMenu = () => {
        switch (true) {
            case isMenuLoaded:
                setTimeout(() => {
                    navigation.navigate('HOME');
                }, 200);
                break;
            case isMenuTowerLoaded:
                setTimeout(() => {
                    navigation.navigate('TOWER');
                }, 200);
                break;
            case isMenuOldSchoolLoaded:
                setTimeout(() => {
                    navigation.navigate('OLDSCHOOL');
                }, 200);
                break;
            case isMenuSwampLoaded:
                setTimeout(() => {
                    navigation.navigate('SWAMP');
                }, 200);
                break;
            default:
                break;
        }
    };

    navigateToMenu();
    
}, [isMenuLoaded, isMenuTowerLoaded, isMenuOldSchoolLoaded, isMenuSwampLoaded]);

    useEffect(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('Notificación abierta desde el segundo plano:', remoteMessage);
            
            // Maneja la lógica de la navegación aquí
            if (remoteMessage.notification?.title === "Tower Entrance detected"){
                setLocation('TOWER');
                navigation.navigate('TOWER');
            } else if (remoteMessage.notification?.title === "The acolytes call you, destiny awaits.")
                setLocation('HALL');
                navigation.navigate('HALL');
    });
    }, []);

    useEffect(() => {
        // Manage messages inside the app
        messaging().onMessage(async (remoteMessage) => {
            console.log('Notificación recibida en primer plano:', remoteMessage);
            
            if (remoteMessage.notification?.title === 'The acolytes call you, destiny awaits.') {
                console.log('Mostrar icono de alerta');
                setShowAlertButton(true);
            }
            else {
                setShowAlertButton(false);
            }
        });

    }, []);

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

    const handleSchoolIconPress = () => {
        setLocation('OLDSCHOOL');
        if(isMenuOldSchoolLoaded){
            navigation.navigate('OLDSCHOOL');
        }
    }   

    const handleSwampIconPress = () => {
        console.log("PRESSED SWAMP BUTTON IN MAP");
        console.log(isMenuSwampLoaded);
        
        setLocation('SWAMP');
        if(isMenuSwampLoaded){
            console.log("NAVIGATING TO SWAMP");
            
            navigation.navigate('SWAMP');
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

export default MapScreenMortimer;
