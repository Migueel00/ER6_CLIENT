// src/NotificationService.js

import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

// Solicita permisos para recibir notificaciones (en iOS)
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Permission status:', authStatus);
  }
};

// Maneja la notificación cuando la aplicación está en primer plano
export const onMessageReceived = () => {
  messaging().onMessage(remoteMessage => {
    console.log('Notificación recibida en primer plano:', remoteMessage);
    Alert.alert(remoteMessage?.notification?.title!, remoteMessage?.notification?.body);
  });
};

// Configura la recepción de mensajes cuando la aplicación está en segundo plano o cerrada
export const onNotificationOpenedApp = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notificación abierta desde el segundo plano:', remoteMessage);
    // Maneja la lógica de la navegación aquí
  });

  // Maneja la notificación si la aplicación se inicia desde un estado cerrado
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notificación iniciando la aplicación:', remoteMessage);
        // Maneja la lógica de la navegación aquí
      }
    });
};
