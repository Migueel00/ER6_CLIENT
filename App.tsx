
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import LoadSpinner from './components/utils/loadSpinner';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, ImageBackground, TouchableOpacity, Dimensions, PermissionsAndroid} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import io, { Socket } from 'socket.io-client';
import { searchAndIfDontExistPost } from "./src/API/get&post";
import { getAllPlayers } from './src/API/getAllPlayers';
import MainScreens from './components/mainScreens';
import { LogBox } from 'react-native';
import AppContext from './helpers/context';
import ProfileAttributes from './interfaces/ProfileAttributes';
import { Player } from './interfaces/contextInterface';
import Ingredient from './components/potions/ingredient';
import { getIngredientsAndFilter, getParchmentIngredients} from './src/API/getIngredients';
import { URL } from './src/API/urls';
import { requestUserPermission, onNotificationOpenedApp, onMessageReceivedService } from './components/notifications/notificationService';
import { Alert } from 'react-native';
import SignInScreen from './components/SignIn';

GoogleSignin.configure({
  webClientId: '946196140711-ej1u0hl0ccr7bnln9vq4lelucmqjuup7.apps.googleusercontent.com', 
  offlineAccess: true,
});

const {width, height} = Dimensions.get('window');
function App(): React.JSX.Element {

  const [isVerified, setIsVerified] = useState(false); // -> no se usa isVerified?
  const isDarkMode = useColorScheme() === 'dark';
  const [userSocket, setUserSocket] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("") ;
  const [profileAttributes, setProfileAttributes] = useState<ProfileAttributes>({
    intelligence: 0,
    dexterity: 0,
    insanity: 0,
    charisma: 0,
    constitution: 0,
    strength: 0,
  });
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Aquí controlas el login
  const [isSpinner, setIsSpinner]   = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);  // Usa la tipificación correcta para Socket.IO
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player>();
  const [location, setLocation] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[] | any>([]); 
  const [cleanseIngredients, setCleanseIngredients] = useState<Ingredient[] | any>([]); 
  const [parchmentState, setParchmentState] = useState<boolean>(false);
  const [towerIngredientsState, setTowerIngredientsState] = useState<boolean>(false);

  const onMessageReceived = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('Notificación recibida en primer plano:', remoteMessage);
      Alert.alert(remoteMessage?.notification?.title!, remoteMessage?.notification?.body);
    });
  };

  const checkLoginStatus = async () => {
    const email = await AsyncStorage.getItem('email');
    if (email !== null) {
      // El item existe en AsyncStorage
      await setIsVerified(true);
      console.log('El item existe:', email);
  } else {
      // El item no existe en AsyncStorage
      await setIsVerified(false);
      console.log('El item no existe');
    }
  };
  
  const sendNotificationToUser = async (fcmToken: any) => {
    try {
      const response = await fetch(URL.NOTIFICATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fcmToken: fcmToken,
          title: "Bienvenido a KAOTIKA",
          body: "¡Gracias por unirte a la aventura!",
        }),
      });
  
      if (response.ok) {
        console.log('Notificación enviada exitosamente');
      } else {
        console.error('Error al enviar la notificación:', await response.text());
      }
    } catch (error) {
      console.error('Error en la solicitud de notificación:', error);
    }
  };

  async function requestNotificationPermission() {
    try {
      const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      
      if (!hasPermission) {
        // Si no tiene permiso, solicitarlo
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permiso de notificaciones concedido");
        } else {
          console.log("Permiso de notificaciones denegado");
        }
      } else {
        console.log("El usuario ya tiene el permiso de notificaciones activado");
      }
    } catch (error) {
      console.error("Error al solicitar permiso de notificaciones:", error);
    }
  }

  async function requestUserPermission() {
    console.log("PIDIENDO PERMISOS PARA NOTIFICACIONES");
    
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function getFCMToken() {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        return token;
      } else {
        console.log('No se pudo obtener el token FCM');
      }
    } catch (error) {
      console.error('Error obteniendo el token FCM:', error);
    }
  }

  useEffect(() => {
    SplashScreen.hide();
  }, []);
    
  useEffect(() => {
    requestUserPermission();
    onMessageReceived();
    onNotificationOpenedApp();
  }, []);

  // Simular obtener los datos del perfil
  useEffect(() => {
    setProfileAttributes(profileAttributes);
  }, [profileAttributes]);


  const fetchIngredients = async (playerRole : string) => {
    try {
      const ingredients = await getIngredientsAndFilter(playerRole);
      const newIngredients = await getParchmentIngredients();

      console.log("NEW INGREDIENTS" + JSON.stringify(newIngredients));

      setIngredients([{ key: 'left-spacer' }, ...(ingredients || []), { key: 'right-spacer' }]);
      setIngredients(newIngredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };  

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const verifyUser = async () => {
    console.log("USUARIO NO VERIFICADO, PROCEDE A VERIFICAR");
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const email = userInfo.data?.user.email;
    const googleIdToken = userInfo.data?.idToken;
    
    // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(`${googleIdToken}`);

    // Sign-in the user with the credential
    const signInWithCredential = await  auth().signInWithCredential(
      googleCredential,
    );

    //console.log(signInWithCredential);

    //Get the token from the current User
    const idTokenResult = await auth().currentUser?.getIdTokenResult();

    const idToken = idTokenResult?.token;

    //console.log("TOKEN: " + idToken);
    

    // Envía el idToken al servidor
    const fireBaseResponse = await fetch(URL.VERIFY_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }), // Envía el token en el cuerpo de la petición
    });

    const fireBaseResult = await fireBaseResponse.json();

    if (fireBaseResponse.ok) {
      console.log('Respuesta del servidor:', fireBaseResult);
            //Async storage
      // await manageRole(email as string);
      await AsyncStorage.setItem('email', email as string);
      
    } else {
      throw new Error(fireBaseResult.error || 'Error al verificar el token');
    }
  }

  const handleSockets = (socket : any)=> {
      // Conectar al socket
      socket.on('connect', () => {
        console.log('Conectado al servidor de Socket.IO');
  
        const socketId  : string = socket.id as string;
  
        setUserSocket(socketId);
  
        console.log('El socketID de esta conexion es: ' + socket.id);
      });
  
      // Desconexion
      socket.on('disconnect', ()=> {
        console.log('Desconectado del servidor de Socket ');
      })
  
      // Limpiar la conexion al desmontar el componente
      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.disconnect();
      }
  }

  const handleButtonPress = async () => {

    try {
      setIsSpinner(true);
      setError(null);
      // Iniciar socket
      const socket = io(URL.SOCKET); 
      // Settear socket 
      setSocket(socket);
      // Funcion gestionar sockets
      handleSockets(socket);

      await checkLoginStatus();

      const isVerified = await AsyncStorage.getItem('isVerified');

      console.log("IS VERIFIED?" + isVerified);
      
      const FCMToken = await getFCMToken();

      console.log("FCM TOKEN AFTER RETRIEVING");
      console.log(FCMToken);
      
      
        
      await requestUserPermission();

      await requestNotificationPermission();

      if(!isVerified)
      {
        await verifyUser();
      }
      
      if (FCMToken) {
        await sendNotificationToUser(FCMToken);
      }

      await AsyncStorage.setItem('isVerified', 'true');

      const email = await AsyncStorage.getItem('email');;

      console.log('EMAIL RECIBIDO DEL ASYNC STORAGE:' + email);
      
      setUserEmail(`${email}`);


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
      const profileDataAttr = profileData.data.attributes
      setProfileAttributes(profileDataAttr);

      
      
    
      const playerDataToPost    = profileData.data;
      playerDataToPost.socketId = socket?.id;
      playerDataToPost.fcmToken = FCMToken;
      //console.log(playerDataToPost);

      const player = await searchAndIfDontExistPost(playerDataToPost);


      setPlayer(player);
      await fetchIngredients(player.role);
      setUserRole(player.role);
      await AsyncStorage.setItem("my-role", player.role);

      if(player.role === 'MORTIMER'){
        await getDataAndAsign();
      }
      
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
  
  const getDataAndAsign = async () => {
    const players      = await getAllPlayers();
    const playersData  = players.data;
    const newPlayers = [];

    
    for(let i = 0; i < playersData.length; i++){

      const nickname    = playersData[i].nickname;
      const email       = playersData[i].email;
      const isInsideLab = playersData[i].isInsideLab;
      const isInsideTower = playersData[i].isInsideTower;
      const socketId    = playersData[i].socketId;
      const avatar      = playersData[i].avatar;
      const role        = playersData[i].role;
      const id          = playersData[i]._id;

      const player  = {

        nickname:       nickname,
        email:          email,
        isInsideLab:    isInsideLab,
        isInsideTower:  isInsideTower,
        socketId:       socketId,
        avatar:         avatar,
        id:             id,
        role:           role,
        _id:            id,
      };

      newPlayers.push(player);    

      
  }

  setPlayers(newPlayers);
  }
  
  return (
    <AppContext.Provider 
      value={{   
        userRole:userRole, 
        profileAttributes:profileAttributes,
        userEmail:userEmail,
        socketID:userSocket, 
        player:player!,
        players:players,
        setPlayers:setPlayers,
        setIsLoggedIn:setIsLoggedIn ,
        socket: socket,
        location: location,
        setLocation: setLocation,
        ingredients,
        setIngredients: setIngredients,
        cleanse_ingredients: cleanseIngredients,
        parchment: parchmentState,
        setParchment: setParchmentState,
        tower_ingredients: towerIngredientsState,
        setTowerIngredients: setTowerIngredientsState
      }}>
    
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {isLoggedIn ? (
        <MainScreens/>
      ) : (
        <ImageBackground 
        source={require('./assets/png/appMainScreen.png')} // Cambia esta ruta a la imagen que desees
        style={styles.imageBackground} // Usamos flex para que ocupe toda la pantalla
        resizeMode="cover" // Asegúrate de que la imagen cubra todo el área
        >
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1 }}>
          {isSpinner ? (
            <LoadSpinner />
          ) : (
            <SignInScreen handleButtonPress={handleButtonPress} />
          )}
        </ScrollView>
        </ImageBackground>
      )}
    </SafeAreaView>
    </AppContext.Provider>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent', // Personaliza el fondo
    width: '100%', 
    height: '100%', 
    paddingTop: 20,
    paddingBottom: 50
},
  kaotika: {
    color: 'white', // Color blanco para "Kati" y "ka"
  },
  o: {
      color: 'orange', // Color naranja para la "o"
  },
  overlayText: { 
    padding: 20,
  },
  overlayButton: {
    padding: 20,
    backgroundColor: 'rgba(230, 140, 0, 0.7)',
    marginTop: height * 0.55,
    borderRadius: 20
  },
  imageBackground: {
    flex: 1, // Esto hace que el ImageBackground ocupe todo el espacio
    justifyContent: 'space-between', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  profileText: {
    color: 'black',
    fontSize: 24,
  },
  kaotikaFont: {
    fontFamily: 'KochAltschrift',
    fontSize: 40,
    color: 'white',
  }
});

//Warning hide
LogBox.ignoreLogs(['Warning: A props object containing a "key" prop is being spread into JSX']);
LogBox.ignoreAllLogs();

export default App;