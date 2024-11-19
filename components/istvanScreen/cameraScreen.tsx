import { Camera } from 'react-native-vision-camera';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Alert, Linking, Vibration, Dimensions, Button, BackHandler } from 'react-native';
import { useCameraDevice, useCameraPermission, CodeScanner } from 'react-native-vision-camera';
import { searchAndChangeIsInsideLabState } from '../../src/API/get&post';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

type CameraScreenProps = {
  onClose: () => void;
};

const openAppSettings = async () => {
  try {
      await Linking.openSettings();
  } catch (err) {
      console.error("Failed to open settings:", err);
  }
};

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Componente para pedir permisos
const PermissionsPage: React.FC<{ closeCameraModal: () => void }> = ({ closeCameraModal }) => (
  <Container>
    <Title>Camera Permission Required</Title>
    <RequestPermissionsButton onPress={openAppSettings}>
      <ButtonText>Grant Permissions</ButtonText>
    </RequestPermissionsButton>
    <Title>Please allow camera access in your settings!</Title>

    <BackButton onPress={closeCameraModal}>
      <ButtonText>Go Back</ButtonText>
    </BackButton>
  </Container>
);

// Componente para mostrar error de dispositivo
const NoCameraDeviceError: React.FC = () => (
  <Container>
    <Title>No Camera Device Found</Title>
    <Title>Please connect a camera device.</Title>
  </Container>
);

const CameraScreen: React.FC<CameraScreenProps> = ({ onClose }) => {
  const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();
  const [isScanned, setIsScanned] = useState(false);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const socket = useContext(AppContext)?.socket;
  
  const handleCodeScanned = (codes: any) => {
    if (!isScanned) {
      setIsScanned(true);
      const qrValue = codes[0].value;
      const parsedQrValue = JSON.parse(qrValue);

      socket.emit("qrScanned", qrValue);
      searchAndChangeIsInsideLabState(parsedQrValue);
      Vibration.vibrate(100);
      setTimeout(() => {
        setIsScanned(false);
      }, 2000);
    }
  };

  const codeScanner2: CodeScanner = {
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: handleCodeScanned,
  };

  useEffect(() => {
    const handlePermissions = async () => {
      if (!hasCameraPermission) {
        const granted = await requestCameraPermission();
        if (!granted) {
          Alert.alert(
            'Camera Permission Needed',
            'This app needs camera access to function properly. Please enable it in settings.',
            [
              { text: 'Cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() }
            ]
          );
        }
      }
    };
    handlePermissions();
  }, [hasCameraPermission]);

  const device = useCameraDevice('back');

  if (!hasCameraPermission) return <PermissionsPage closeCameraModal={onClose} />; 
  if (device == null) return <NoCameraDeviceError />;

  return (
    <Container>
      <CameraStyled
        device={device}
        isActive={true}
        codeScanner={codeScanner2}
        ref={(ref) => setCameraRef(ref)}
      />
      <ScanAreaContainer>
        <ScanArea>
          <Row>
            <CornerTopLeft />
            <Spacer />
            <CornerTopRight />
          </Row>
          <Spacer />
          <Row>
            <CornerBottomLeft />
            <Spacer />
            <CornerBottomRight />
          </Row>
        </ScanArea>
      </ScanAreaContainer>

      <StyledButton onPress={onClose}>
        <TextButton>Close Scanner</TextButton>
      </StyledButton>
      
    </Container>
  );
};

const BackButton = styled.TouchableOpacity`
  background-color: #f44336; /* Color rojo para el botón "Back" */
    padding: ${width * 0.03}px;
    border-radius: ${width * 0.03}px;
    margin-top: ${height * 0.03}px;
    margin-bottom: ${height * 0.03}px;
`;

const BackButtonText = styled.Text`
  color: white;
  font-size: ${width * 0.08}px;
  font-family: 'KochAltschrift';
  text-align: center;
`;


const RequestPermissionsButton = styled.TouchableOpacity`
    background-color: #4CAF50;
    padding: ${width * 0.03}px;
    border-radius: ${width * 0.03}px;
    margin-top: ${height * 0.03}px;
    margin-bottom: ${height * 0.03}px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: ${width * 0.08}px;
    font-family: 'KochAltschrift';
`;

// Styled Components
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: rgba(0,0,0,0.8);
  padding: ${width * 0.03}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${height * 0.01}px;
`

const TextButton = styled.Text`
  font-size: ${width * 0.125}px;
  font-family: 'KochAltschrift';
  color: white;
`;

const Title = styled.Text`
  font-size: ${width * 0.1}px;
  font-family: 'KochAltschrift';
  margin-bottom: 20px;
  color: white;
  text-align: center;
`;

const CameraStyled = styled(Camera)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ScanAreaContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScanArea = styled.View`
  width: ${width * 0.6}px;
  height: ${height * 0.3}px;
  justify-content: space-between;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Spacer = styled.View`
  flex: 1;
`;

const Corner = styled.View`
  width: ${width * 0.1}px;
  height: ${height * 0.04}px;
  border-color: red;
`;

const CornerTopLeft = styled(Corner)`
  border-top-width: ${width * 0.01}px;
  border-left-width: ${width * 0.01}px;
  border-top-left-radius: ${width * 0.03}px;
`;

const CornerTopRight = styled(Corner)`
  border-top-width: ${width * 0.01}px;
  border-right-width: ${width * 0.01}px;
  border-top-right-radius: ${width * 0.03}px;
`;

const CornerBottomLeft = styled(Corner)`
  border-bottom-width: ${width * 0.01}px;
  border-left-width: ${width * 0.01}px;
  border-bottom-left-radius: ${width * 0.03}px;
`;

const CornerBottomRight = styled(Corner)`
  border-bottom-width: ${width * 0.01}px;
  border-right-width: ${width * 0.01}px;
  border-bottom-right-radius: ${width * 0.03}px;
`;

export default CameraScreen;