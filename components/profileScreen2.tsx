import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

type ProfileScreenProps = {
    profileAttributesToPrint: any;
}

const ProfileScreen2: React.FC<ProfileScreenProps> = ({ profileAttributesToPrint }) => {
    return (
      <ImageBackground 
      source={require('../assets/png/profileBackground.png')} // Cambia esta ruta a la imagen que desees
      style={styles.background}
      resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.profileText}>Character Profile</Text>
        <Text style={styles.profileText}>Intelligence: {profileAttributesToPrint.intelligence}</Text>
        <Text style={styles.profileText}>Dexterity: {profileAttributesToPrint.dexterity}</Text>
        <Text style={styles.profileText}>Insanity: {profileAttributesToPrint.insanity}</Text>
        <Text style={styles.profileText}>Charisma: {profileAttributesToPrint.charisma}</Text>
        <Text style={styles.profileText}>Constitution: {profileAttributesToPrint.constitution}</Text>
        <Text style={styles.profileText}>Strength: {profileAttributesToPrint.strength}</Text>
      </View>
      </ImageBackground>
    );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
      },
      background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
      profileText: {
        color: 'white',
        fontSize: 24,
      },
    });

export default ProfileScreen2;
