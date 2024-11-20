import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');


const CustomBackground = styled.ImageBackground`
    width: ${width}px;
    height: ${height}px;
`;

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${width}px;
    height: ${height}px;
`;

const background = require('../../assets/png/appMainScreen.png');

const ObituaryScreen = () => {
    
    return(
        <Container>
            <CustomBackground source={background}/>
        </Container>
    )
}

export default ObituaryScreen;
