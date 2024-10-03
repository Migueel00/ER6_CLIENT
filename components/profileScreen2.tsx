import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

type ProfileScreenProps = {
    profileAttributesToPrint: any;
}

const convertAttributesToPercentage = (profileAttributesToPrint: any) => {
  return {
      intelligence: `${(profileAttributesToPrint.intelligence / 100) * 100}`,
      dexterity: `${(profileAttributesToPrint.dexterity / 100) * 100}`,
      insanity: `${(profileAttributesToPrint.insanity / 100) * 100}`,
      charisma: `${(profileAttributesToPrint.charisma / 100) * 100}`,
      constitution: `${(profileAttributesToPrint.constitution / 100) * 100}`,
      strength: `${(profileAttributesToPrint.strength / 100) * 100}`,
  };
};


const ProfileScreen2: React.FC<ProfileScreenProps> = ({ profileAttributesToPrint }) => {

  const attributesForProgressBar = convertAttributesToPercentage(profileAttributesToPrint);

    return (
      <ImageBackground 
      source={require('../assets/png/profileBackground.png')} // Cambia esta ruta a la imagen que desees
      style={styles.background}
      resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.profileText}>Character Profile</Text>
        <Text style={styles.profileText}>Intelligence: {attributesForProgressBar.intelligence}</Text>
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
