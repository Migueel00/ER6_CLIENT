import { useCameraDevice, useCameraPermission, Camera} from 'react-native-vision-camera';

export const { hasPermission, requestPermission } = useCameraPermission();