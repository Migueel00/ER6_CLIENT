import LoadSpinner from './components/loadSpinner';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

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
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './homeScreen';
import SettingsScreen from './settingsScreen';
import ProfileScreen, { ProfileAttributes } from './profileScreen';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
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

  const [userEmail, setUserEmail] = useState("");
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
      setIsSpinner(true);
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
      const profileDataAttr = profileData.data.attributes
      const profileDataAttrString = JSON.stringify(profileDataAttr, null, 2);

      setProfileData(`${stringProfileData}`);
      setProfileAttributes(profileDataAttr);


      console.log(`Profile data:${profileDataAttr}`);
      
      setIsLoggedIn(true);
      // Maneja el inicio de sesión exitoso aquí
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
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                ),
              }} 
            />
            <Tab.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="person-outline" color={color} size={size} />
                ),
              }} 
            />
            <Tab.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="settings-outline" color={color} size={size} />
                ),
              }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        > 
          {isSpinner ? (
              <LoadSpinner /> 
          ) : (
            <View
              style={{
                backgroundColor: isDarkMode ? 'black' : 'white',
                padding: 20,
                alignItems: 'center',
              }}
            > 
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
