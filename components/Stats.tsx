import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import AppContext from '../helpers/context';
import { ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';

const Stats = () => {

    const { height, width } = Dimensions.get('window');

    const convertAttributesToPercentage = (profileAttributes: any) => {
        return {
            intelligence: profileAttributes.intelligence / 100,
            dexterity: profileAttributes.dexterity / 100,
            insanity: profileAttributes.insanity / 100,
            charisma: profileAttributes.charisma / 100,
            constitution: profileAttributes.constitution / 100,
            strength: profileAttributes.strength / 100,
        };
    };

    return (
        <AppContext.Consumer>
            {({ profileAttributes }: any) => {
                const attributesToPrint = convertAttributesToPercentage(profileAttributes);
        return (
            <ImageBackground 
                        source={require('../assets/png/profileBackground.png')}
                        style={[styles.background, { width: width, height: height }]}
                    >
                        <View style={[styles.container, { padding: height * 0.04 }]}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>Character Stats</Text>
                            </View>

                            <View style={styles.progressContainer}>
                                <View style={styles.column}>
                                    <Text style={styles.profileText}>Intelligence</Text>
                                    <Progress.Bar 
                                        progress={attributesToPrint.intelligence} 
                                        width={width * 0.20} 
                                        color='orange' 
                                    />

                                    <Text style={styles.profileText}>Dexterity</Text>
                                    <Progress.Bar 
                                        progress={attributesToPrint.dexterity} 
                                        width={width * 0.20} 
                                        color='orange' 
                                    />

                                    <Text style={styles.profileText}>Insanity</Text>
                                    <Progress.Bar 
                                        progress={attributesToPrint.insanity} 
                                        width={width * 0.20} 
                                        color='orange' 
                                    />
                                </View>

                                <View style={styles.column}>
                                    <Text style={styles.profileText}>Charisma</Text>
                                    <Progress.Bar 
                                        progress={attributesToPrint.charisma} 
                                        width={width * 0.20} 
                                        color='orange' 
                                    />

                                    <Text style={styles.profileText}>Constitution</Text>
                                    <Progress.Bar 
                                        progress={attributesToPrint.constitution} 
                                        width={width * 0.20} 
                                        color='orange' 
                                    />

                                    <Text style={styles.profileText}>Strength</Text>
                                    <Progress.Bar 
                                        progress={attributesToPrint.strength} 
                                        width={width * 0.20} 
                                        color='orange' 
                                    />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
        );
    }}
        </AppContext.Consumer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
        flex: 1,
        alignItems: 'center',
    },
});

export default Stats;
