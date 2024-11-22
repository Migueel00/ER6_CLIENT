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

interface ImageContainerProps {
    position: "top" | "bottom" | "left" | "right";
  }

  const ImageTopContainer = styled.View`
  position: absolute;
  top: 0;
  left: 50%;
`;

const ImageBottomContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 50%;
`;

const ImageLeftContainer = styled.View`
  position: absolute;
  left: 0;
  top: 50%;
`;

const ImageRightContainer = styled.View`
  position: absolute;
  right: 0;
  top: 50%;
`;

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const background = require('../../assets/backgrounds/obituaryBackground.png');

const image = require('./../../assets/png/Artifcats/Marker1.png');
const image2 = require('./../../assets/png/Artifcats/Marker2.png');
const image3 = require('./../../assets/png/Artifcats/Marker3.png');
const image4 = require('./../../assets/png/Artifcats/Marker4.png');

const ObituaryScreen = () => {
    
    return( 
        <Container>
            <CustomBackground source={background}>
                  {/* Imagen superior central */}
            <ImageTopContainer>
                <StyledImage source={image} />
            </ImageTopContainer>

            {/* Imagen inferior central */}
            <ImageBottomContainer>
                <StyledImage source={image2} />
            </ImageBottomContainer>

            {/* Imagen centro izquierda */}
            <ImageLeftContainer>
                <StyledImage source={image3} />
            </ImageLeftContainer>

            {/* Imagen centro derecha */}
            <ImageRightContainer>
                <StyledImage source={image4} />
            </ImageRightContainer>
            </CustomBackground>
        </Container>
    )
}

export default ObituaryScreen;
