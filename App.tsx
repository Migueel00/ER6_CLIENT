import SplashScreen from 'react-native-splash-screen';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SignInButton from './SignInButton'; 

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


GoogleSignin.configure({
  webClientId: '946196140711-ej1u0hl0ccr7bnln9vq4lelucmqjuup7.apps.googleusercontent.com', 
  offlineAccess: true,
});

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [userEmail, setUserEmail] = useState("");
  const [profileData, setProfileData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Aquí controlas el login

  function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
  
  function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile</Text>
      </View>
    );
  }

  function SettingScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }


  const Tab = createBottomTabNavigator();


  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleButtonPress = async () => {
    try {
      
      setLoading(true);
      setError(null);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info: ', userInfo);
      const email = userInfo.data?.user.email;
      setUserEmail(`${email}`);
      console.log(`User e-mail: ${email}`);
      
      // Construir la URL con el email del alumno
      const kaotikaApiUrl = `https://kaotika-server.fly.dev/players/email/${email}`;

      const response = await fetch(kaotikaApiUrl);

      if(!response.ok) {
        throw new Error('Error en la solicitud a la API');
      }
      else
      {
        console.log("Succesfully connected with Kaotika API");
        
      }

      const profileData = await response.json();

      const stringProfileData = JSON.stringify(profileData, null,2);

      setProfileData(`${stringProfileData}`);
      
      console.log(`Profile data:${stringProfileData}`);
      
      setIsLoggedIn(true);
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
      setIsLoggedIn(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {
        // Uso de la expresión ternaria para condicionar el contenido basado en isLoggedIn
        isLoggedIn ? (
          // Si está loggeado, renderiza el Tab Navigation dentro de un NavigationContainer
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Profile" component={ProfileScreen} />
              <Tab.Screen name="Settings" component={SettingScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          // Si no está loggeado, renderiza el contenido de bienvenida y el botón de login
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}
          >
            <View
              style={{
                backgroundColor: isDarkMode ? 'black' : 'white',
                padding: 20,
                alignItems: 'center',  // Centra el contenido horizontalmente
              }}
            >
              {/* Texto añadido aquí */}
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome</Text>
              
              {/* Usa el componente SignInButton */}
              <SignInButton onPress={handleButtonPress} />
            </View>
          </ScrollView>
        )
      }
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
