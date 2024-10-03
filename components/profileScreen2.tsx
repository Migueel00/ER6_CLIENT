import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';

type ProfileScreenProps = {
    profileAttributesToPrint: any;
}

const convertAttributesToPercentage = (profileAttributesToPrint: any) => {
    return {
        intelligence: profileAttributesToPrint.intelligence / 100,
        dexterity: profileAttributesToPrint.dexterity / 100,
        insanity: profileAttributesToPrint.insanity / 100,
        charisma: profileAttributesToPrint.charisma / 100,
        constitution: profileAttributesToPrint.constitution / 100,
        strength: profileAttributesToPrint.strength / 100,
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.profileText}>Character Profile</Text>

                <Text style={styles.profileText}>Intelligence</Text>
                <Progress.Bar 
                    progress={attributesForProgressBar.intelligence} 
                    width={100} 
                    color='orange' // Cambia el color aquí
                />

                <Text style={styles.profileText}>Dexterity</Text>
                <Progress.Bar 
                    progress={attributesForProgressBar.dexterity} // Corrige el atributo aquí
                    width={100} 
                    color='orange' // Cambia el color aquí
                />

                <Text style={styles.profileText}>Insanity</Text>
                <Progress.Bar 
                    progress={attributesForProgressBar.insanity} // Asegúrate de que el valor esté aquí
                    width={100} 
                    color='orange' // Cambia el color aquí
                />

                <Text style={styles.profileText}>Charisma</Text>
                <Progress.Bar 
                    progress={attributesForProgressBar.charisma} // Asegúrate de que el valor esté aquí
                    width={100} 
                    color='orange' // Cambia el color aquí
                />

                <Text style={styles.profileText}>Constitution</Text>
                <Progress.Bar 
                    progress={attributesForProgressBar.constitution} // Asegúrate de que el valor esté aquí
                    width={100} 
                    color='orange' // Cambia el color aquí
                />

                <Text style={styles.profileText}>Strength</Text>
                <Progress.Bar 
                    progress={attributesForProgressBar.strength} // Asegúrate de que el valor esté aquí
                    width={100} 
                    color='orange' // Cambia el color aquí
                />
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
        fontFamily: 'KochAltschrift',
        fontSize: 40,
    },
});

export default ProfileScreen2;
