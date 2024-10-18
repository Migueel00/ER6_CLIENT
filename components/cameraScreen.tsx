import { Camera } from 'react-native-vision-camera';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking, Vibration } from 'react-native';
import { useCameraDevice, useCameraPermission, CodeScanner } from 'react-native-vision-camera';
import { searchAndChangeIsInsideLabState } from '../src/API/get&post';
import AppContext from '../helpers/context';

type CameraScreenProps = {
  onClose: () => void; // Prop para cerrar el modal
};

// Componente para pedir permisos
const PermissionsPage: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Camera Permission Required</Text>
    <Text style={styles.title}>Please allow camera access in your settings!</Text>
  </View>
);

// Componente para mostrar error de dispositivo
const NoCameraDeviceError: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>No Camera Device Found</Text>
    <Text style={styles.title}>Please connect a camera device.</Text>
  </View>
);

const CameraScreen: React.FC<CameraScreenProps> = ({ onClose }) => {
  const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();

  const [isScanned, setIsScanned] = useState(false); // Estado para saber si ya se escaneó un código
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const socket = useContext(AppContext)?.socket;

  const handleCodeScanned = (codes: any) => {
    if (!isScanned) { // Solo procesa si no ha sido escaneado previamente
      setIsScanned(true); // Marca como escaneado
      console.log(`Scanned ${codes.length} codes!`);
      setIsScanned(false); // Permitir escanear otro código al presionar "OK"
      console.log('OK Pressed');
      const qrValue = codes[0].value;

      const parsedQrValue = JSON.parse(qrValue);

      // Emit del valor del QR escaneado
      socket.emit("qrScanned", qrValue);

      console.log('QR PARSED VALUE IS: ' + parsedQrValue);
      console.log('QR NOT PARSED VALUE IS: ' + qrValue);
      
      searchAndChangeIsInsideLabState(parsedQrValue);
      Vibration.vibrate(100);
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

  if (!hasCameraPermission) return <PermissionsPage />;
  if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner2}
        ref={(ref) => setCameraRef(ref)}
      />

      <View style={styles.scanAreaContainer}>
        <View style={styles.scanArea}>
          <View style={styles.row}>
            <View style={styles.cornerTopLeft} />
            <View style={{ flex: 1 }} />
            <View style={styles.cornerTopRight} />
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.row}>
            <View style={styles.cornerBottomLeft} />
            <View style={{ flex: 1 }} />
            <View style={styles.cornerBottomRight} />
          </View>
        </View>
      </View>

      <Button title="Close Scanner" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Personaliza el fondo
  },
  title: {
    fontSize: 35,
    fontFamily: 'KochAltschrift',
    marginBottom: 20,
  },
  scanAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: '80%',  // Ajusta el ancho del área de escaneo
    height: '40%',  // Ajusta la altura del área de escaneo
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cornerTopLeft: {
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'red',
    borderTopLeftRadius: 15, // Esquina redondeada
  },
  cornerTopRight: {
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'red',
    borderTopRightRadius: 15, // Esquina redondeada
  },
  cornerBottomLeft: {
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'red',
    borderBottomLeftRadius: 15, // Esquina redondeada
  },
  cornerBottomRight: {
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'red',
    borderBottomRightRadius: 15, // Esquina redondeada
  },
});

export default CameraScreen;