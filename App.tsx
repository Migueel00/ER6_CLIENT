
import auth from '@react-native-firebase/auth';
import LoadSpinner from './components/loadSpinner';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './components/homeScreen';
import SettingsScreen from './components/settingsScreen';
import { ProfileAttributes } from './components/profileScreen';
import ProfileScreen2 from './components/profileScreen2';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AcolyteScreens from './components/acolyteScreens';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SignInButton from './components/SignInButton';
import io from 'socket.io-client';
import { searchAndIfDontExistPost } from './src/fetch/get&post';


GoogleSignin.configure({
  webClientId: '946196140711-ej1u0hl0ccr7bnln9vq4lelucmqjuup7.apps.googleusercontent.com', 
  offlineAccess: true,
});

// Importa la configuración de Firebase

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const socket = io('http://10.70.0.58:3000');

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [profileData, setProfileData] = useState("");
  const [profileAttributes, setProfileAttributes] = useState<ProfileAttributes>({
    intelligence: 0,
    dexterity: 0,
    insanity: 0,
    charisma: 0,
    constitution: 0,
    strength: 0,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Aquí controlas el login
  const [isSpinner, setIsSpinner]   = useState(false);

  // Simular obtener los datos del perfil
  useEffect(() => {
    setProfileAttributes(profileAttributes);
    }, [profileAttributes]);
  
  function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.profileText}>Character Profile</Text>
        <Text style={styles.profileText}>Intelligence: {profileAttributes.intelligence}</Text>
        <Text style={styles.profileText}>Dexterity: {profileAttributes.dexterity}</Text>
        <Text style={styles.profileText}>Insanity: {profileAttributes.insanity}</Text>
        <Text style={styles.profileText}>Charisma: {profileAttributes.charisma}</Text>
        <Text style={styles.profileText}>Constitution: {profileAttributes.constitution}</Text>
        <Text style={styles.profileText}>Strength: {profileAttributes.strength}</Text>
      </View>
    );
  }

  function setRole(authenticatedEmail: string): string {
    let role = "";
    console.log("El email del usuario autenticado es: " + authenticatedEmail);
    
    const ISTVAN_EMAIL = "oskar.calvo@aeg.eus";
    const MORTIMER_EMAIL = "ozarate@aeg.eus";
    const VILLAIN_EMAIL = "classcraft.daw2@aeg.eus";
    const ACOLYTE_EMAIL = "@ikasle.aeg.eus";

    switch (authenticatedEmail) {
        case ISTVAN_EMAIL:
            role = "ISTVAN";
            break;

        case VILLAIN_EMAIL:
            role = "VILLANO";
            break;

        case MORTIMER_EMAIL:
            role = "MORTIMER";
            break;

        default:
            // Asegúrate de que ACOLYTE_EMAIL no sea undefined antes de usar endsWith
            if (ACOLYTE_EMAIL && authenticatedEmail.endsWith(ACOLYTE_EMAIL)) {
                role = "ACOLYTE";
            } else {
                role = "UNKNOWN ROLE";
            }
            break;
    }

    return role;
}

  const Tab = createMaterialTopTabNavigator();


  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.clear(); // Asegúrate de que esta línea es necesaria, pues borra todo el almacenamiento
      console.log("Se va a insertar el siguiente rol: " + value);
      await AsyncStorage.setItem("my-role", value);
      console.log("Rol almacenado correctamente");
    } catch (error) {
      console.log("ERROR EN LA INSERCIÓN A ASYNCSTORAGE: " + error);
    }
  };
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-role");
      if (value) {
        console.log("El rol es: " + value);
        return value;
      } else {
        console.log("No se encontró ningún rol en AsyncStorage");
      }
    } catch (error) {
      console.log("ERROR EN EL RECIBIMIENTO DE ASYNCSTORAGE: " + error);
    }
  };

  useEffect(() => {
    // Conectar al socket
    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
      console.log('El socketID de esta conexión es: ' + socket.id);
      
    });

    // Manejo de la desconexión
    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.IO');
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  const handleButtonPress = async () => {
    try {
      setLoading(true);
      setIsSpinner(true);
      setError(null);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      //console.log('User Info: ', userInfo);
      const email = userInfo.data?.user.email;
      const googleIdToken = userInfo.data?.idToken;
      setUserEmail(`${email}`);
      console.log(`User e-mail: ${email}`);
      console.log(`User Token: ${googleIdToken}`);
      
      // Create a Google credential with the token
      const googleCredential = await auth.GoogleAuthProvider.credential(`${googleIdToken}`);
      console.log('GOOGLE CREDENTIAL');
      console.log(googleCredential);

      // Sign-in the user with the credential
      const signInWithCredential = await  auth().signInWithCredential(
        googleCredential,
      );
      console.log('SIGN IN WITH CREDENTIAL');
      console.log(signInWithCredential);

      //http://10.70.0.58:3000/verify-token

      //Get the token from the current User
      const idTokenResult = await auth().currentUser?.getIdTokenResult();
      console.log('USER JWT');
      console.log(idTokenResult);

      const idToken = idTokenResult?.token;

      console.log('Token de ID:', idTokenResult);

      // Envía el idToken al servidor
      const fireBaseResponse = await fetch('http://10.70.0.58:3000/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }), // Envía el token en el cuerpo de la petición
      });

      const fireBaseResult = await fireBaseResponse.json();

      if (fireBaseResponse.ok) {
        console.log('Respuesta del servidor:', fireBaseResult);
        setProfileData(JSON.stringify(fireBaseResult, null, 2)); // Almacena los datos del usuario
      } else {
        throw new Error(fireBaseResult.error || 'Error al verificar el token');
      }

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
      const profileDataAttr = profileData.data.attributes
      const profileDataAttrString = JSON.stringify(profileDataAttr, null, 2);

      const profileRole = setRole(email as string); 
      console.log("EL ROL ASIGNADO ES: " + profileRole);
      setUserRole(profileRole);

      //Async storage
      await storeData(profileRole);
      
      

      setProfileData(`${stringProfileData}`);
      setProfileAttributes(profileDataAttr);


      console.log(`Profile data:${profileDataAttr}`);

      const playerDataToPost = profileData.data;
      console.log(playerDataToPost.email)
      console.log(playerDataToPost.nickname)
      playerDataToPost.socketId = socket.id;
      playerDataToPost.role = await getData();
      playerDataToPost.isInsideLab = false;
      console.log("Data to POST: " + JSON.stringify(playerDataToPost));
      
      searchAndIfDontExistPost(playerDataToPost);

      
      setIsLoggedIn(true);
      setIsSpinner(false);

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

      setIsSpinner(false);
      setIsLoggedIn(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {isLoggedIn ? (
        <AcolyteScreens userRole={userRole} profileAttributes={profileAttributes} /> // Replacing navigation with AcolyteScreens
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
          {isSpinner ? (
            <LoadSpinner /> 
          ) : (
            <View style={{ padding: 20, alignItems: 'center', backgroundColor: isDarkMode ? 'black' : 'white' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome</Text>
              <SignInButton onPress={handleButtonPress} />
            </View>
          )}
        </ScrollView>
      )}
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
  profileText: {
    color: 'black',
    fontSize: 24,
  },
});

export default App;
