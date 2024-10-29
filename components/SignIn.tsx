// SignInScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SignInScreenProps {
  handleButtonPress: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ handleButtonPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlayText}>
        <Text style={styles.kaotikaFont}>
          <Text style={styles.kaotika}>KA<Text style={styles.o}>O</Text>TIKA</Text>
        </Text>
        <Text style={styles.kaotikaFont}>The Dark Age</Text>
      </View>
      <TouchableOpacity onPress={handleButtonPress} style={styles.overlayButton}>
        <Text style={styles.kaotikaFont}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  kaotika: {
    color: 'white',
  },
  o: {
    color: 'orange',
  },
  overlayText: {
    padding: 20,
  },
  overlayButton: {
    padding: 20,
    backgroundColor: 'rgba(230, 140, 0, 0.7)',
    marginTop: '55%', // O utiliza height * 0.55 según necesites
    borderRadius: 20,
  },
  kaotikaFont: {
    fontFamily: 'KochAltschrift',
    fontSize: 40,
    color: 'white',
  },
});

export default SignInScreen;
