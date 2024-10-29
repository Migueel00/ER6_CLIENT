// src/components/Notification.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NotificationProps {
  title: string;
  message: string;
  onHide: () => void;
}

const Notification: React.FC<NotificationProps> = ({ title, message, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 5000); // Desaparece en 5 segundos
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, [onHide]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Notification;
