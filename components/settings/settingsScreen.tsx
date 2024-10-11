import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppContext from '../../helpers/context';

const SettingsScreen = () => {
    const { height, width } = Dimensions.get('window');

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    const onPress = async (setIsLoggedIn: any) => {
        await setIsLoggedIn(false);
        await AsyncStorage.clear();
        await signOut();
    };

    return (
        <AppContext.Consumer>
            {({ setIsLoggedIn }: any) => (
                <ImageBackground 
                    source={require('../../assets/png/settingsBackground1.png')} 
                    style={[styles.background, { width: width, height: height }]}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <ImageBackground 
                            source={require('../../assets/png/button1.png')}
                            style={styles.buttonImageBackground}
                            resizeMode="cover"
                        >
                            <Text style={styles.kaotikaFont2}>SETTINGS</Text>
                        </ImageBackground>

                        <ImageBackground 
                            source={require('../../assets/png/button1.png')}
                            style={styles.buttonImageBackground}
                            resizeMode="cover"
                        >
                            <TouchableOpacity onPress={() => onPress(setIsLoggedIn)}>
                                <Text style={styles.kaotikaFont2}>LOG OUT</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                </ImageBackground>
            )}
        </AppContext.Consumer>
    );
};

const styles = StyleSheet.create({
    buttonImageBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 315,
        height: 80,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%', 
        height: '100%', 
        paddingTop: 20,
        paddingBottom: 50,
    },
    kaotikaFont2: {
        fontFamily: 'KochAltschrift',
        fontSize: 40,
        color: 'white',
    },
});

export default SettingsScreen;
