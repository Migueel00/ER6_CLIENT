import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';

type ProfileScreenProps = {
    profileAttributesToPrint: any;
};

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
            source={require('../assets/png/profileBackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.titleText}>Character Profile</Text>

                <View style={styles.progressContainer}>
                    <View style={styles.column}>
                        <Text style={styles.profileText}>Intelligence</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.intelligence} 
                            width={100} 
                            color='orange' 
                        />

                        <Text style={styles.profileText}>Dexterity</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.dexterity} 
                            width={100} 
                            color='orange' 
                        />

                        <Text style={styles.profileText}>Insanity</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.insanity} 
                            width={100} 
                            color='orange' 
                        />
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.profileText}>Charisma</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.charisma} 
                            width={100} 
                            color='orange' 
                        />

                        <Text style={styles.profileText}>Constitution</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.constitution} 
                            width={100} 
                            color='orange' 
                        />

                        <Text style={styles.profileText}>Strength</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.strength} 
                            width={100} 
                            color='orange' 
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Cambiado a flex-start para que el contenido comience desde la parte superior
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 30, // Agregado padding para mejorar el espaciado
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        marginBottom: 20, // Añadido margen inferior para espaciado
    },
    profileText: {
        color: 'white',
        fontFamily: 'KochAltschrift',
        fontSize: 30, // Puedes ajustar el tamaño para que se vea mejor
        padding: 5,
        
    },
    progressContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Espacia uniformemente las columnas
      width: '100%', // Ajusta el ancho según sea necesario
      paddingBottom: 30,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro con opacidad
      borderColor: 'orange', // Color del borde
      borderWidth: 2, // Ancho del borde
      borderRadius: 10, // Esquinas redondeadas (opcional)
  },
    column: {
        flex: 1, // Cada columna ocupa el mismo espacio
        alignItems: 'center', // Centra los elementos dentro de cada columna
    },
});

export default ProfileScreen2;
