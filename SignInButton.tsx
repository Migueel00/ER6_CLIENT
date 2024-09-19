// SignInButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface SignInButtonProps {
    onPress: () => void;
    title?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    }

    const SignInButton: React.FC<SignInButtonProps> = ({ onPress, title = 'Google sign in', style, textStyle }) => {
    return (
        <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
    };

    const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4285F4', // Color de fondo del botón
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',  // Color del texto
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SignInButton;
