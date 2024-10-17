import { Camera } from 'react-native-vision-camera';
import React, { useEffect, useState , useContext} from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking } from 'react-native';
import { useCameraDevice, useCameraPermission, CodeScanner} from 'react-native-vision-camera';
import { searchAndChangeIsInsideLabState } from '../src/API/get&post';
import AppContext from '../helpers/context';



type CameraScreenProps = {
  onClose: () => void; // Nueva prop para cerrar el modal
};

// Componente para pedir permisos
const PermissionsPage: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Camera Permission Required</Text>
    <Text>Please allow camera access in your settings.</Text>
  </View>
);

// Componente para mostrar error de dispositivo
const NoCameraDeviceError: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>No Camera Device Found</Text>
    <Text>Please connect a camera device.</Text>
  </View>
);





const CameraScreen: React.FC<CameraScreenProps> = ({ onClose }) => {
  const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();

  const [isScanned, setIsScanned] = useState(false); // Estado para saber si ya se escaneó un código
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const socket  = useContext(AppContext)?.socket;


  const handleCodeScanned = (codes: any) => {
    if (!isScanned) { // Solo procesa si no ha sido escaneado previamente
      setIsScanned(true); // Marca como escaneado
      console.log(`Scanned ${codes.length} codes!`);
      Alert.alert(
        'QR Code Scanned', 
        `Scanned user: ${codes[0].value.userEmail}`, 
        [
          {
            text: 'OK',
            onPress: () => {
              setIsScanned(false); // Permitir escanear otro código al presionar "OK"
              console.log('OK Pressed');
              const qrValue = codes[0].value;

              const parsedQrValue = JSON.parse(qrValue);

              //Emit del valor del QR escaneado
              socket.emit("qrScanned", qrValue);


              console.log('QR PARSED VALUE IS: ' + parsedQrValue);
              console.log('QR NOT PARSED VALUE IS: ' + qrValue);
              
              searchAndChangeIsInsideLabState(parsedQrValue)
            }
          }
        ]
      );
      // Aquí podrías hacer alguna acción adicional, como enviar los datos a una API
    }
  };

  const codeScanner2: CodeScanner = {
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: handleCodeScanned,
  }

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
        <View style={styles.scanArea} />
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
    backgroundColor: 'lightcoral', // Personaliza el fondo
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scanAreaContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250, // Ancho del área de escaneo
    height: 250, // Altura del área de escaneo
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.2)', // Semitransparente para el fondo
  },
});

export default CameraScreen;