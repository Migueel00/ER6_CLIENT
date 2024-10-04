// ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export interface ProfileAttributes {
  intelligence: number;
  dexterity: number;
  insanity: number;
  charisma: number;
  constitution: number;
  strength: number;
}

interface ProfileScreenProps {
  profileAttributes: ProfileAttributes;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ profileAttributes }) => {
  return (
    <ImageBackground 
    source={require('../../assets/png/settingsBackground1.png')} // Cambia esta ruta a la imagen que desees
    style={styles.background}
    resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
  >
    <View style={styles.container}>
      <Text style={styles.profileText}>Character Profile</Text>
      <Text style={styles.profileText}>Intelligence: {profileAttributes.intelligence}</Text>
      <Text style={styles.profileText}>Dexterity: {profileAttributes.dexterity}</Text>
      <Text style={styles.profileText}>Insanity: {profileAttributes.insanity}</Text>
      <Text style={styles.profileText}>Charisma: {profileAttributes.charisma}</Text>
      <Text style={styles.profileText}>Constitution: {profileAttributes.constitution}</Text>
      <Text style={styles.profileText}>Strength: {profileAttributes.strength}</Text>
      <Text style={styles.profileText}>Strength: {profileAttributes.strength}</Text>
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
    color: 'black',
    fontSize: 24,
  },
});

export default ProfileScreen;
