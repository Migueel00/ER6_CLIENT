import {Camera} from 'react-native-vision-camera'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';

type CameraScreenProps = {

}

// PermissionsPage Component
const PermissionsPage: React.FC = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Camera Permission Required</Text>
        <Text>Please allow camera access in your settings.</Text>
    </View>
);

// NoCameraDeviceError Component
const NoCameraDeviceError: React.FC = () => (
    <View style={styles.container}>
        <Text style={styles.title}>No Camera Device Found</Text>
        <Text>Please connect a camera device.</Text>
    </View>
);



const CameraScreen: React.FC<CameraScreenProps> = () => {

    const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();

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


    const devices = Camera.getAvailableCameraDevices()
    console.log("All devices: " + devices);
    
    const device: any = useCameraDevice('back');
    console.log("Selected device: " + device);

    if (!hasCameraPermission) return <PermissionsPage/>
    if (device == null) return <NoCameraDeviceError/>
    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    )
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
});

export default CameraScreen;

