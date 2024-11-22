import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { useContext } from "react";
import AppContext from "../../helpers/context";

const { width, height } = Dimensions.get('window');


const CustomBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

  const ImageTopContainer = styled.View`
    position: absolute;
    top: 20%;
    left: 37%;
    border-width: ${width * 0.005}px;
    border-color: white;
    background-color: rgba(0,0,0,0.8);
    border-radius: ${width * 0.1}px;
    padding: ${width * 0.005}px;
`;

const ImageBottomContainer = styled.View`
    position: absolute;
    bottom: 25%;
    left: 37%;
        border-width: ${width * 0.005}px;
    border-color: white;
    background-color: rgba(0,0,0,0.8);
    border-radius: ${width * 0.1}px;
    padding: ${width * 0.005}px;
`;

const ImageLeftContainer = styled.View`
    position: absolute;
    left: 5%;
    top: 40%;
        border-width: ${width * 0.005}px;
    border-color: white;
    background-color: rgba(0,0,0,0.8);
    border-radius: ${width * 0.1}px;
    padding: ${width * 0.005}px;
`;

const ImageRightContainer = styled.View`
  position: absolute;
right: 5%;
  top: 40%;
      border-width: ${width * 0.005}px;
    border-color: white;
    background-color: rgba(0,0,0,0.8);
    border-radius: ${width * 0.1}px;
    padding: ${width * 0.005}px;
`;

const StyledImage = styled.Image`
  width: ${width * 0.25}px;
  height: ${width * 0.25}px;
`;

const background = require('../../assets/backgrounds/obituaryBackground.png');

const image = require('./../../assets/png/Artifcats/Marker1.png');
const image2 = require('./../../assets/png/Artifcats/Marker2.png');
const image3 = require('./../../assets/png/Artifcats/Marker3.png');
const image4 = require('./../../assets/png/Artifcats/Marker4.png');

const ObituaryScreen = () => {
    
    const appContext = useContext(AppContext);
    const player = appContext?.player;
    const role = player?.role;


    return( 

            <CustomBackground source={background}>
                  {role === 'ACOLYTE' && (
                <>
                    <ImageTopContainer>
                        <StyledImage source={image} />
                    </ImageTopContainer>

                    <ImageBottomContainer>
                        <StyledImage source={image2} />
                    </ImageBottomContainer>

                    <ImageLeftContainer>
                        <StyledImage source={image3} />
                    </ImageLeftContainer>

                    <ImageRightContainer>
                        <StyledImage source={image4} />
                    </ImageRightContainer>
                </>
            )}
                
            </CustomBackground>

    )
}

export default ObituaryScreen;
