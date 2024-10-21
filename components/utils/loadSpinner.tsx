import React from "react";
import { View, StatusBar, StyleSheet, Text, ActivityIndicator, Dimensions } from "react-native";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    text: {color: 'white', margin: 24},

});

export default function loadSpinner(){

    return(
        <View style={styles.root}>
            <ActivityIndicator animating={true} color={'#cdfbff'} size={'large'}/>
            <Text style={styles.text}>
                Loading
            </Text>
        </View>    
    )
}

