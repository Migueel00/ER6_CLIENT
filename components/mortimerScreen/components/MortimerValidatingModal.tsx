import React, { useEffect, useContext, useState } from 'react';
import { Dimensions, Modal, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components/native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle, withRepeat, ReduceMotion } from 'react-native-reanimated'; 
import DeviceInfo from 'react-native-device-info';
import AppContext from '../../../helpers/context';
import { updateArtifact } from '../../../src/API/artifacts';

const { height, width } = Dimensions.get('window');

const isTablet = DeviceInfo.isTablet();

const imageToAnimate = require('./../../../assets/png/Artifcats/Marker1.png');
const imageToAnimate2 = require('./../../../assets/png/Artifcats/Marker2.png');
const imageToAnimate3 = require('./../../../assets/png/Artifcats/Marker3.png');
const imageToAnimate4 = require('./../../../assets/png/Artifcats/Marker4.png');

const imageSize = isTablet ? height * 0.23 : height*0.17;

interface ModalComponentProps {
    visible: boolean;
    onClose: () => void;
}

const generateHorizontalPath = (startX: number, startY: number, lineWidth: number) => {
    return `M${startX} ${startY} L${startX + lineWidth} ${startY}`;
};

const generateVerticalPath = (startX: number, startY: number, lineHeight: number) => {
    return `M${startX} ${startY} L${startX} ${startY + lineHeight}`;
};

const MortimerValidatingModal: React.FC<ModalComponentProps> = ({ visible, onClose }) => {
    const appContext = useContext(AppContext);
    const artifacts = appContext?.artifacts;

    const [validatingText, setValidatingText] = useState<string>('Retrieving artifacts...')

    if(isTablet){
        console.log("ESTAS EN UNA TABLET");
        
    } else {
        console.log("ESTAS EN UN MOVIL");
        
    }

    const path1 = {
        startX: isTablet ? width * 0.25 :  width * 0.25,
        startY:  isTablet ? -height * 0.2 : -height * 0.2,
        line: isTablet ? height * 0.57 : height * 0.593
    }

    const path2 = {
        startX:  isTablet ? width * 0.75 : width * 0.75,
        startY:  isTablet ? height * 0.369 : height * 0.392,
        line: isTablet ? width * 0.65 : width * 0.65
    }

    const path3 = {
        startX:  isTablet ? width * -0.5 : width * -0.5,
        startY:  isTablet ? height * 0.68 : height * 0.62,
        line: isTablet ? width * 0.75 : width * 0.75
    }

    const path4 = {
        startX:  isTablet ? width * 0.75 : width * 0.75,
        startY:  isTablet ? height * 0.68 : height * 0.62,
        line: isTablet ? height * 0.67 : height * 0.75
    } 

    const animationDuration = 1500;


    const image1Path = generateVerticalPath(path1.startX, path1.startY, path1.line); 
    const image2Path = generateHorizontalPath(path2.startX, path2.startY, path2.line);
    const image3Path = generateHorizontalPath(path3.startX, path3.startY, path3.line);
    const image4Path = generateVerticalPath(path4.startX, path4.startY, path4.line); 

    const animationProgress1 = useSharedValue(0);
    const animationProgress2 = useSharedValue(0);
    const animationProgress3 = useSharedValue(0);
    const animationProgress4 = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            // Primero iniciamos la animación para la primera imagen
            animationProgress1.value = withTiming(1, {
                duration: animationDuration, // Duración de la animación
                easing: Easing.inOut(Easing.quad),
                reduceMotion: ReduceMotion.System,
            }, () => {
                // Una vez que la animación de la primera imagen termine, iniciamos la segunda animación
                animationProgress2.value = withTiming(1, {
                    duration: animationDuration, // Duración de la segunda animación
                    easing: Easing.inOut(Easing.quad),
                    reduceMotion: ReduceMotion.System,
                }, () => {
                    // Una vez que la animación de la segunda imagen termine, iniciamos la tercera animación
                    animationProgress3.value = withTiming(1, {
                        duration: animationDuration, // Duración de la tercera animación
                        easing: Easing.inOut(Easing.quad),
                        reduceMotion: ReduceMotion.System,
                    }, () => {
                        animationProgress4.value = withTiming(1, {
                            duration: animationDuration, // Duración de la tercera animación
                            easing: Easing.inOut(Easing.quad),
                            reduceMotion: ReduceMotion.System,
                        });
                    });
                });
            });
        } else {
            // Si el modal se cierra, revertimos ambas animaciones
            animationProgress1.value = 0;
            animationProgress2.value = 0;
            animationProgress3.value = 0;
            animationProgress4.value = 0;
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => {
        const x = path1.startX - imageSize/2;
        const y = path1.startY + (path1.line * animationProgress1.value) - imageSize/2; 

        const scale = animationProgress1.value <= 0.85  ? 3 - animationProgress1.value * 2 // Incrementa hasta 3.0 en la mitad
                                                       : 2 - (animationProgress1.value - 0.5) * 2; // Reduce de 3.0 a 1

    
        return {
            transform: [
                { translateX: x }, // Centra el ancho de la imagen
                { translateY: y}, // Centra la altura de la imagen
                { scale }
            ]
        };
    }); 

    // reset the artifacts state
    const resetSearch = () => {
        onClose();
        console.log("RESETEA EL ESTADO DE LOS ARTEFACTOS");

        artifacts?.map(artifact => {
            // reset state of artifacts (id, isRetrieved, avatar);
            updateArtifact(artifact._id, false, "");
        });
    }

    const animatedStyle2 = useAnimatedStyle(() => {
        const x = (path2.startX + (path2.line * (1 - animationProgress2.value)) - imageSize / 2);
        const y = path2.startY - imageSize / 2;
    
        return {
            transform: [
                { translateX: x }, // Ajusta el ancho de la imagen para moverse de derecha a izquierda
                { translateY: y }, // Centra la altura de la imagen
            ],
        };
    });

    const animatedStyle3 = useAnimatedStyle(() => {
        const x = (path3.startX + path3.line * animationProgress3.value - imageSize / 2);
        const y = path3.startY - imageSize / 2;
    
        return {
            transform: [
                { translateX: x }, // Ajusta el ancho de la imagen para moverse de derecha a izquierda
                { translateY: y }, // Centra la altura de la imagen
            ],
        };
    });


    const animatedStyle4 = useAnimatedStyle(() => {
        const x = path4.startX - imageSize/2;
        const y = path4.startY + (path4.line * (1 - animationProgress4.value) - imageSize / 2)

    
        return {
            transform: [
                { translateX: x }, // Centra el ancho de la imagen
                { translateY: y}, // Centra la altura de la imagen
            ]
        };
    }); 

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <ModalBackground>
                <ModalContainer>
                    <ModalText>Validating artifact search...</ModalText>

                    <SvgContainer>
                        <Svg width={width} height={height}>
                            <Path
                                d={image1Path}
                                fill="transparent"
                                stroke="white"
                                strokeWidth="0"
                            />
                             <Circle
                                cx={path1.startX}
                                cy={path1.startY + path1.line / 1.25} // Mitad de la longitud del path
                                r={10} // Radio del círculo
                                fill="red" // Color del círculo
                            />
                        </Svg>
                    </SvgContainer>

                    <SvgContainer>
                        <Svg width={width} height={height}>
                            <Path
                                d={image2Path}
                                fill="transparent"
                                stroke="white"
                                strokeWidth="0"
                            />
                        </Svg>
                    </SvgContainer>

                    <SvgContainer>
                        <Svg width={width} height={height}>
                            <Path
                                d={image3Path}
                                fill="transparent"
                                stroke="white"
                                strokeWidth="0"
                            />
                        </Svg>
                    </SvgContainer>

                    <SvgContainer>
                        <Svg width={width} height={height}>
                            <Path
                                d={image4Path}
                                fill="transparent"
                                stroke="white"
                                strokeWidth="0"
                            />
                        </Svg>
                    </SvgContainer>


                    <GridContainer>
                        <GridRow>
                            <GridItem><GridText>1</GridText></GridItem>
                            <GridItem><GridText>2</GridText></GridItem>
                        </GridRow>
                        <GridRow>
                            <GridItem><GridText>3</GridText></GridItem>
                            <GridItem><GridText>4</GridText></GridItem>
                        </GridRow>
                    </GridContainer>

                    <Animated.View style={[animatedStyle, { position: 'absolute'}]}>

                        <Image 
                            source={imageToAnimate}// Asegúrate de tener una imagen local o remota
                            style={{height: imageSize ,aspectRatio: 1, backgroundColor: 'transparent' }} // Ajusta el tamaño de la imagen
                        />

                    </Animated.View>

                    <Animated.View style={[animatedStyle2, { position: 'absolute'}]}>

                        <Image 
                            source={imageToAnimate2}// Asegúrate de tener una imagen local o remota
                            style={{height: imageSize ,aspectRatio: 1, backgroundColor: 'transparent' }} // Ajusta el tamaño de la imagen
                        />

                    </Animated.View>

                    <Animated.View style={[animatedStyle3, { position: 'absolute'}]}>

                        <Image 
                            source={imageToAnimate3}// Asegúrate de tener una imagen local o remota
                            style={{height: imageSize ,aspectRatio: 1, backgroundColor: 'transparent' }} // Ajusta el tamaño de la imagen
                        />

                    </Animated.View>

                    <Animated.View style={[animatedStyle4, { position: 'absolute'}]}>

                        <Image 
                            source={imageToAnimate4}// Asegúrate de tener una imagen local o remota
                            style={{height: imageSize ,aspectRatio: 1, backgroundColor: 'transparent' }} // Ajusta el tamaño de la imagen
                        />

                    </Animated.View>




                    <BottomButtonContainer>
                        <CloseButtonBottomLeft onPress={onClose}>
                            <CloseButtonText>Validate Search</CloseButtonText>
                        </CloseButtonBottomLeft>
                        <CloseButtonBottomRight onPress={resetSearch}>
                            <CloseButtonText>Reset Search</CloseButtonText>
                        </CloseButtonBottomRight>
                    </BottomButtonContainer>

                </ModalContainer>
            </ModalBackground>
        </Modal>
    );
};

export default MortimerValidatingModal;

const ModalBackground = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: ${width * 0.05}px;
    padding: ${width * 0.003}px;
    justify-content: space-between;
`;

const ModalText = styled.Text`
    font-size: ${width * 0.09}px;
    margin-bottom: ${width * 0.03}px;
    margin-top: ${height * 0.03}px;
    top: ${height * 0.06}px;
    text-align: center;
    color: white;
    font-family: 'KochAltschrift';
`;

const BottomButtonContainer = styled.View`
    position: absolute;
    bottom: ${width * 0.05}px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 ${width * 0.05}px;
`;

const CloseButtonBottomLeft = styled(TouchableOpacity)`
    background-color: green;
    padding: ${width * 0.03}px;
    border-radius: ${width * 0.02}px;
`;

const CloseButtonBottomRight = styled(TouchableOpacity)`
    background-color: red;
    padding: ${width * 0.03}px;
    border-radius: ${width * 0.02}px;
`;

const CloseButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.08}px;
    font-family: 'KochAltschrift';
    text-align: center;
`;

const GridContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const GridRow = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: ${width * 0.08}px;
    width: 100%;
`;

const GridItem = styled.View`
    width: ${width*0.4}px;
    aspect-ratio: 1;
    background-color: rgba(0,0,0,0.95);
    justify-content: center;
    align-items: center;
    border-radius: ${width * 0.02}px;
    border-width: ${width * 0.005}px;
    border-color: white;
`;

const GridText = styled.Text`
    font-size: ${width * 0.1}px;
    color: white;
    font-family: 'KochAltschrift';
`;

const SvgContainer = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 5;
`;

const ImageContainer = styled(Animated.View)`
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 20%;
`;