import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
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
    const {height, width} = Dimensions.get('window')
    const attributesForProgressBar = convertAttributesToPercentage(profileAttributesToPrint);

    return (
        <ImageBackground 
            source={require('../assets/png/profileBackground.png')}
            style={[styles.background, { width: width, height: height }]}
        >
            <View style={[styles.container, { padding: height * 0.04 }]}>
            <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Character Profile</Text>
                </View>

                <View style={styles.progressContainer}>
                    <View style={styles.column}>
                        <Text style={styles.profileText}>Intelligence</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.intelligence} 
                            width={width * 0.20} 
                            color='orange' 
                        />

                        <Text style={styles.profileText}>Dexterity</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.dexterity} 
                            width={width * 0.20} 
                            color='orange' 
                        />

                        <Text style={styles.profileText}>Insanity</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.insanity} 
                            width={width * 0.20} 
                            color='orange' 
                        />
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.profileText}>Charisma</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.charisma} 
                            width={width * 0.20} 
                            color='orange' 
                        />

                        <Text style={styles.profileText}>Constitution</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.constitution} 
                            width={width * 0.20} 
                            color='orange' 
                        />

                        <Text style={styles.profileText}>Strength</Text>
                        <Progress.Bar 
                            progress={attributesForProgressBar.strength} 
                            width={width * 0.20} 
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
        padding: 30,
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
    },
    profileText: {
        color: 'white',
        fontFamily: 'KochAltschrift',
        fontSize: 30,
        padding: 5,
        
    },
        titleContainer: {
        borderColor: 'orange', 
        borderWidth: 2,
        borderRadius: 10, 
        padding: 5, 
        marginBottom: 20, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
},
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', 
        paddingBottom: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderColor: 'orange', 
        borderWidth: 2, 
        borderRadius: 10,
    },
    column: {
        flex: 1, // Cada columna ocupa el mismo espacio
        alignItems: 'center', // Centra los elementos dentro de cada columna
    },
});

export default ProfileScreen2;
