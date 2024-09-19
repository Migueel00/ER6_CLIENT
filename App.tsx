import SplashScreen from 'react-native-splash-screen';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SignInButton from './SignInButton'; 


GoogleSignin.configure({
  webClientId: '946196140711-ej1u0hl0ccr7bnln9vq4lelucmqjuup7.apps.googleusercontent.com', 
  offlineAccess: true,
});

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info: ', userInfo);
      const userEmail = userInfo.data?.user.email;
      console.log('User e-mail: ' + userEmail);
      
      // Construir la URL con el email del alumno
      const kaotikaApiUrl = `https://kaotika-server.fly.dev/players/email/${userEmail}`;

      const response = await fetch(kaotikaApiUrl);

      if(!response.ok) {
        throw new Error('Error en la solicitud a la API');
      }

      const profileData = await response.json();

      const stringProfileData = JSON.stringify(profileData, null,2);

      console.log(`Profile data:${stringProfileData}`);
      
      // Maneja el inicio de sesión exitoso aquí
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Usuario canceló el inicio de sesión
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Inicio de sesión en progreso
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Google Play Services no está disponible
      } else {
        // Otro error
        console.error('Error general: ', error);
      }
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 20,
            alignItems: 'center',  // Centra el contenido horizontalmente
          }}>

          {/* Texto añadido aquí */}
          <Text style={styles.welcomeText}>Welcome</Text>
          
          {/* Usa el componente SignInButton */}
          <SignInButton onPress={handleButtonPress} />
          
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  welcomeText: {
    fontSize: 24,         // Tamaño de la fuente del texto
    fontWeight: 'bold',  // Negrita
    marginBottom: 20,    // Espacio entre el texto y el botón
  },
});

export default App;
