import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');


const CustomBackground = styled.ImageBackground`
    width: ${width}px;
    height: ${height}px;
`;

const Container = styled.View`

`;



const ObituaryScreen = () => {
    
    return(
        <Container>
            <CustomBackground />
        </Container>
    )
}

export default ObituaryScreen;
