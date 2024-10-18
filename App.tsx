
import auth from '@react-native-firebase/auth';
import LoadSpinner from './components/loadSpinner';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import io, { Socket } from 'socket.io-client';
import { searchAndIfDontExistPost } from "./src/API/get&post";
import { getAllPlayers } from './src/API/getAllPlayers';
import MainScreens from './components/mainScreens';
import { LogBox } from 'react-native';
import AppContext from './helpers/context';
import { ProfileAttributes } from './components/profileScreen';
import { Player } from './interfaces/contextInterface';
import Ingredient from './components/potions/ingredient';
import getIngredientsAndFilter from './src/API/getIngredients';

GoogleSignin.configure({
  webClientId: '946196140711-ej1u0hl0ccr7bnln9vq4lelucmqjuup7.apps.googleusercontent.com', 
  offlineAccess: true,
});

const {width, height} = Dimensions.get('window');
function App(): React.JSX.Element {

  const [isVerified, setIsVerified] = useState(false);
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
  

  useEffect(() => {
    SplashScreen.hide();
  }, []);
    

  // Simular obtener los datos del perfil
  useEffect(() => {
    setProfileAttributes(profileAttributes);
  }, [profileAttributes]);


  const fetchIngredients = async (playerRole : string) => {
    try {
      const ingredients = await getIngredientsAndFilter(playerRole);
          
      setIngredients([{ key: 'left-spacer' }, ...(ingredients || []), { key: 'right-spacer' }]);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };
  
  
  // Función para filtrar ingredientes
  const filterIngredients = (ingredients: Ingredient[], userRole: string) => {
    return ingredients.filter((ingredient: Ingredient) => {
        switch (userRole) {
            case 'ACOLYTE':
                return ingredient.effects.some(effect =>
                    effect.includes('restore') || 
                    effect.includes('increase') || 
                    effect.includes('calm') || 
                    effect.includes('boost') || 
                    effect.includes('frenzy')
                );

            case 'VILLAIN':
                return ingredient.effects.some(effect =>
                    effect.includes('damage') || 
                    effect.includes('decrease') || 
                    effect.includes('setback') || 
                    effect.includes('frenzy')
                );

            default:
                return false; // Opcional: manejar otros roles
        }
    });
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const verifyUser = async () => {
    console.log("USUARIO NO VERIFICADO, PROCEDE A VERIFICAR");
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    //console.log('User Info: ', userInfo);
    const email = userInfo.data?.user.email;
    const googleIdToken = userInfo.data?.idToken;
    
    // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(`${googleIdToken}`);

    // Sign-in the user with the credential
    const signInWithCredential = await  auth().signInWithCredential(
      googleCredential,
    );

    console.log(signInWithCredential);

    //Get the token from the current User
    const idTokenResult = await auth().currentUser?.getIdTokenResult();

    const idToken = idTokenResult?.token;

    // Envía el idToken al servidor
    const fireBaseResponse = await fetch('https://er6-staging-server.onrender.com/verify-token', {
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
      console.log("ENTRA A HANDLE SOCKETS");
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
      const socket = io('https://er6-staging-server.onrender.com'); 
      // Settear socket
      setSocket(socket);
      // Funcion gestionar sockets
      handleSockets(socket);

      await checkLoginStatus();

      const isVerified = await AsyncStorage.getItem('isVerified');

      console.log("IS VERIFIED?" + isVerified);
      


      if(!isVerified)
      {
        await verifyUser();
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
      

      const player = await searchAndIfDontExistPost(playerDataToPost);


      setPlayer(player);

      player.role = "MORTIMER";
      await fetchIngredients(player.role);
      setUserRole(player.role);
      console.log("ingredients" + ingredients);
      await AsyncStorage.setItem("my-role", player.role);

      if(player.role === 'MORTIMER'){
        console.log("HA ENTRADO PARA HACER EL FETCH");
        
        await getDataAndAsign();
      }
      
      setIsLoggedIn(true);
      setIsSpinner(false);

      console.log(player.attributes);
      

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
      const socketId    = playersData[i].socketId;
      const avatar      = playersData[i].avatar;
      const role        = playersData[i].role;
      const id          = playersData[i]._id;

      const player  = {

        nickname:       nickname,
        email:          email,
        isInsideLab:    isInsideLab,
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
  
  console.log(ingredients);
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
        ingredients
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
              <View style={styles.container}>
                <View style={styles.overlayText}>
                  <Text style={styles.kaotikaFont}>
                      <Text style={styles.kaotika}>KA<Text style={styles.o}>O</Text>TIKA</Text>
                  </Text>
                  <Text style={styles.kaotikaFont}>The Dark Age</Text>
                  
                </View>
                <TouchableOpacity onPress={() => handleButtonPress()} style={styles.overlayButton}>
                  <Text style={styles.kaotikaFont}>Sign in with google</Text>
                </TouchableOpacity>
              </View>
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

export default App;