import React, { useEffect } from 'react';
import { Dimensions, Modal, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components/native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle, withRepeat, ReduceMotion } from 'react-native-reanimated'; 
import DeviceInfo from 'react-native-device-info';

const { height, width } = Dimensions.get('window');

const isTablet = DeviceInfo.isTablet();

const imageToAnimate = require('./../../../assets/png/Artifcats/Marker3.png');
const imageSize = height*0.17;

interface ModalComponentProps {
    visible: boolean;
    onClose: () => void;
}


const generateSimplePath = (startX: number, startY: number, endX: number, endY: number) => {
    return `M${startX} ${startY} L${endX} ${endY}`; 
};

const MortimerValidatingModal: React.FC<ModalComponentProps> = ({ visible, onClose }) => {

    if(isTablet){
        console.log("ESTAS EN UNA TABLET");
        
    } else {
        console.log("ESTAS EN UN MOVIL");
        
    }

    const path1 = {
        startX: isTablet ? width * 0.35 :  width * 0.35                                             ,
        startY:  isTablet ? -height * 0.2 : -height * 0.2,
        gridSize: width * 0.65,
        gridCenterX: width * 0.5 - (width * 0.4 * 1.2),
        gridCenterY: height * 0.15 - (width * 0.00)
    }

    const simplePath = generateSimplePath(path1.startX, path1.startY, path1.gridCenterX + path1.gridSize / 2, path1.gridCenterY + path1.gridSize / 2); 

    const animationProgress = useSharedValue(0);

    useEffect(() => {
        // Inicia la animación cuando el modal se muestra
        if (visible) {
            animationProgress.value = withRepeat(
                withTiming(1, {
                    duration: 1500, // Duración de la animación en milisegundos
                    easing: Easing.inOut(Easing.quad),
                    reduceMotion: ReduceMotion.System,
                }),
                -1, // 1 = no repetir, -1 = repetir infinito
                false // No invertir la animación
            );
        } else {
            animationProgress.value = 0; // Detener la animación cuando el modal se cierra
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => {
        const x = path1.startX + (path1.gridCenterX + path1.gridSize / 2 - path1.startX) * animationProgress.value;
        const y = path1.startY + (path1.gridCenterY + path1.gridSize / 2 - path1.startY) * animationProgress.value;
    
        const imageWidth = height * 0.17; // Ancho de la imagen
        const imageHeight = height * 0.17; // Alto de la imagen

        const modifierX = isTablet ?  width * 0.07 : width * 0.015;
        const modifierY = isTablet ?  height * 0.01 : height * -0.075;
    
        return {
            transform: [
                { translateX: x - imageSize - modifierX}, // Centra el ancho de la imagen
                { translateY: y - imageSize - modifierY }, // Centra la altura de la imagen
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
                        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height * 0.25}`}>
                            <Path
                                d={simplePath}
                                fill="transparent"
                                stroke="white"
                                strokeWidth="2"
                            />
                             <Circle
                                cx={path1.startX}
                                cy={path1.startY}
                                r={5}
                                fill="red"
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

                    <Animated.View style={[animatedStyle, { position: 'absolute', top: height * 0.1, left: width * 0.1 }]}>

                        <Image 
                            source={imageToAnimate}// Asegúrate de tener una imagen local o remota
                            style={{height: imageSize ,aspectRatio: 1, backgroundColor: 'green' }} // Ajusta el tamaño de la imagen
                        />

                    </Animated.View>




                    <BottomButtonContainer>
                        <CloseButtonBottomLeft onPress={onClose}>
                            <CloseButtonText>Validate Search</CloseButtonText>
                        </CloseButtonBottomLeft>
                        <CloseButtonBottomRight onPress={onClose}>
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
    border-color: ${isTablet ? 'white' : 'red'};
`;

const GridText = styled.Text`
    font-size: ${width * 0.1}px;
    color: white;
    font-family: 'KochAltschrift';
`;

const SvgContainer = styled.View`
    position: absolute;
    width: 80%;
    height: 30%;
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