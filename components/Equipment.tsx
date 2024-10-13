import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Equipment = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Equipment</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    text: {
        fontSize: 24,
        color: 'white'
    },
});

export default Equipment;
