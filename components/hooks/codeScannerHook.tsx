import { useCameraDevice, useCameraPermission, CodeScanner, useCodeScanner } from 'react-native-vision-camera';

export const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`)
    }
  });