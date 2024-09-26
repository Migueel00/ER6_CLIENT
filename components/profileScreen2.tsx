import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProfileScreenProps = {
    profileAttributesToPrint: any;
}

const ProfileScreen2: React.FC<ProfileScreenProps> = ({ profileAttributesToPrint }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>Character Profile</Text>
        <Text style={styles.profileText}>Intelligence: {profileAttributesToPrint.intelligence}</Text>
        <Text style={styles.profileText}>Dexterity: {profileAttributesToPrint.dexterity}</Text>
        <Text style={styles.profileText}>Insanity: {profileAttributesToPrint.insanity}</Text>
        <Text style={styles.profileText}>Charisma: {profileAttributesToPrint.charisma}</Text>
        <Text style={styles.profileText}>Constitution: {profileAttributesToPrint.constitution}</Text>
        <Text style={styles.profileText}>Strength: {profileAttributesToPrint.strength}</Text>
      </View>
    );
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
    profileText: {
        color: 'black',
        fontSize: 24,
      },
});

export default ProfileScreen2;
