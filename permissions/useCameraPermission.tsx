import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

export const useCameraPermission = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    useEffect(() => {
        const checkPermission = async () => {
            if (Platform.OS === 'android') {
                const permission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
                setHasPermission(permission);
            } else {
                // Handle iOS permission here if needed
            }
        };

        checkPermission();
    }, []);

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            setHasPermission(result === PermissionsAndroid.RESULTS.GRANTED);
            return result === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            // Handle iOS permission request here if needed
            return false;
        }
    };

    return { hasPermission, requestPermission };
};
