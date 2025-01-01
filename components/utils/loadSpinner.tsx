import React from "react";
import { View, StatusBar, StyleSheet, Text, ActivityIndicator, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

type LoadSpinnerProps = {
    SpinnerText: string;
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    text: {
        color: 'white',
        margin: 24,
        fontFamily: 'KochAltschrift',
        fontSize: width * 0.08, 
        textAlign: 'center',
    },
});

const LoadSpinner: React.FC<LoadSpinnerProps> = ({ SpinnerText }) => {
    return (
        <View style={styles.root}>
            <ActivityIndicator animating={true} color={'#cdfbff'} size={'large'} />
            <Text style={styles.text}>{SpinnerText}</Text>
        </View>
    );
};

export default LoadSpinner;