import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions, Platform, PermissionsAndroid, ScrollView, Vibration, ToastAndroid } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';
import MapView, {Callout, Marker, Circle, BoundingBox} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Image } from 'react-native';
import * as geolib from 'geolib';
import { mapStyle, greenInsideRGBA, greenRGBA, redInsideRGBA, redRGBA, regionAEG} from './mapStyle';
import Toast from 'react-native-toast-message';
import Artifact from '../../interfaces/ArtifactsInterface';
import { URL } from '../../src/API/urls';

console.log("INFO OF GEOLOCATION");
Geolocation.getCurrentPosition(info => console.log(info.coords));

const swampImage = require('./../../assets/backgrounds/swampBackground.png');

const getImage = (name: string) => {
    const images: { [key: string]: any } = {
        'Marker1.png': require('./../../assets/png/Artifcats/Marker1.png'),
        'Marker2.png': require('./../../assets/png/Artifcats/Marker2.png'),
        'Marker3.png': require('./../../assets/png/Artifcats/Marker3.png'),
        'Marker4.png': require('./../../assets/png/Artifcats/Marker4.png'),
    };

    return images[name];
};

const { height, width } = Dimensions.get('window');

//43.3246148, -1.9351902

type LocationType = {
    latitude: number;
    longitude: number;
};

const SwampScreen = () => {  

    const context = useContext(AppContext);
    const player = context?.player;
    const avatar = player?.avatar;
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
    const [swampBackgroundImage, setLabBackgroundImage] = useState(swampImage);
    const [userLocation, setUserLocation] = useState<LocationType | null>(null);
    const [artifacts, setArtifacts] = useState<Artifact[]>([]);
    const [isArtifacts, setIsArtifacts] = useState<boolean>(false);
    const [retrievedArtifacts, setRetrievedArtifacts] = useState(artifacts.filter((marker) => !marker.isRetrieved) || []);

    const [markerColors, setMarkerColors] = useState([
        { circleColor: redRGBA, insideCircleColor: redInsideRGBA },
        { circleColor: redRGBA, insideCircleColor: redInsideRGBA }, 
        { circleColor: redRGBA, insideCircleColor: redInsideRGBA },
        { circleColor: redRGBA, insideCircleColor: redInsideRGBA }
    ]);

    const circleRadius = 20;



    // Function to handle location updates
    const handleLocationUpdate = (position: any) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Posición actual del usuario:", latitude, longitude);
        setUserLocation({ latitude, longitude });
    };



    // Comprobar si el usuario está dentro de algún círculo
    useEffect(() => {
        if (userLocation) {
            const updatedColors = markerColors.map((color, index) => {
                const isUserWithinCircle = geolib.isPointWithinRadius(
                    userLocation,
                    artifacts[index].coordinate,
                    circleRadius
                );

                // Cambiar el color solo si está dentro del círculo
                return isUserWithinCircle
                    ? { circleColor: greenRGBA, insideCircleColor: greenInsideRGBA }
                    : { circleColor: redRGBA, insideCircleColor: redInsideRGBA };
            });

            setMarkerColors(updatedColors);
        }
    }, [userLocation]);
   
    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setLocationPermissionGranted(true);
                } else {
                    console.log("Permiso de localización denegado");
                }
            } else {
                // En iOS o cualquier otro caso, asumimos que el permiso ya se solicitó
                setLocationPermissionGranted(true); 
            }
        };

        requestLocationPermission();
    }, []);


    useEffect(() => {
        fetch(URL.GET_ARTIFACTS)
            .then((response) => response.json())
            .then((artifacts) => {
                console.log(artifacts);
                const data = artifacts.data;
                setArtifacts(data);
                setIsArtifacts(true);
            });
    }, []);

    useEffect(() => {
        if (locationPermissionGranted && isArtifacts) {
          console.log("PERMISOS OTORGADOS");
    
          // Obtener la ubicación actual del usuario
          Geolocation.getCurrentPosition(
            (position) => {
                console.log(
                    'You are ',
                    geolib.getDistance(position.coords, {
                        latitude: artifacts[0].coordinate.latitude,
                        longitude: artifacts[0].coordinate.longitude,
                    }),
                    'meters away from 51.525, 7.4575'
                );
              // Acceder a la ubicación cuando la promesa se resuelva
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log("Posición inicial del usuario:", latitude, longitude);
              setUserLocation({ latitude, longitude });
            },
            (error) => {
              // Manejo de errores si no se puede obtener la ubicación
              console.log("Error al obtener la ubicación:", error);
            }
          );
        }
      }, [locationPermissionGranted, isArtifacts]); 

    useEffect(() => {
        if (locationPermissionGranted) {
            console.log("PERMISSIONS GRANTED");
            
            // Start watching the user position
            const watchId = Geolocation.watchPosition(
                (position) => {
                    //console.log("Actualización de ubicación:", position);  // Verifica que recibas datos del watcher
                    handleLocationUpdate(position);
                },
                (error) => console.log("Error de geolocalización 2:", error),
                { enableHighAccuracy: true, distanceFilter: 0, fastestInterval: 1000 } // Update every 3 seconds
            );

            // Log to confirm watching started
            console.log("Started watching location");
            console.log(watchId);
            

            // Cleanup the watcher when the component is unmounted or permission is revoked
            return () => {
                Geolocation.clearWatch(watchId);
                console.log("Stopped watching location");
            };
        }
    }, [locationPermissionGranted]);

    const markArtifactAsRetrieved = (markerId: number) => {
        console.log("MARKING ARTIFACT AS RETRIEVED");
        
        const updatedMarkers = artifacts.map((marker) =>
            marker.id === markerId ? { ...marker, isRetrieved: true } : marker
        );

        console.log("UPDATED MARKERS"); 
        console.log(updatedMarkers);
        
        setArtifacts(updatedMarkers);
        setRetrievedArtifacts(updatedMarkers.filter((marker) => !marker.isRetrieved) || [])
        console.log("MARKERS AFTER SET");
        console.log(artifacts);
        
        Vibration.vibrate(100);
    };
    return (

        <SwampBackground source={swampBackgroundImage}>
        <MapView
            style={{ width: '100%', height: '100%' }}  // Asigna el tamaño completo del mapa
            initialRegion={regionAEG} 
            customMapStyle={mapStyle}
        >
            {(player?.role === 'ACOLYTE' || player?.role === 'MORTIMER') && (
            artifacts.map((marker, index) => (
                !marker.isRetrieved && (
                <React.Fragment key={marker.id}>
                     <Marker
                        coordinate={marker.coordinate}
                        image={getImage(marker.markerImage)}
                        onPress={() => {
                            // Verificar si el usuario está dentro o fuera del radio del marcador
                            if (userLocation) {
                                const isWithinRadius = geolib.isPointWithinRadius(
                                    userLocation,
                                    marker.coordinate,
                                    circleRadius
                                );

                                // Si está fuera del círculo (isWithinRadius == false), marcar como recogido
                                if (isWithinRadius) {
                                    // Marcar el artefacto como recogido
                                    markArtifactAsRetrieved(marker.id);
                                    //ToastAndroid.showWithGravity(marker.title + ' has been retrieved', ToastAndroid.SHORT, ToastAndroid.TOP);
                                    Toast.show({
                                        type: 'success',  // Tipo de toast, puede ser 'success', 'error', 'info', etc.
                                        position: 'top',   // Posición en la pantalla ('top', 'bottom')
                                        text1: 'Artifact ' + marker.title + ' retrieved succesfully',
                                        text1Style: {
                                          color: 'white',   // Estilo para el primer texto
                                          fontSize: 18,
                                          fontWeight: 'bold',
                                        },
                                        visibilityTime: 3000, // Duración del toast (en milisegundos)
                                        topOffset: 100, // Ajusta la distancia desde la parte superior de la pantalla
                                      });
                                }
                            }
                        }}
                    >
                        {/* Solo mostrar el Callout si el usuario está fuera del rango */}
                        {userLocation && !geolib.isPointWithinRadius(userLocation, marker.coordinate, circleRadius) && (
                            <Callout>
                                <CalloutContainer>
                                    <TextTitle>{marker.title}</TextTitle>
                                    <TextDescription>{marker.description}</TextDescription>
                                </CalloutContainer>
                            </Callout>
                        )}
                    </Marker>
                    <Circle
                        center={marker.coordinate}
                        radius={circleRadius}  // Cambiado temporalmente a 10 metros    
                        strokeColor={markerColors[index].circleColor}
                        fillColor={markerColors[index].insideCircleColor}
                    />
                </React.Fragment>
                )
                ))
            )}

            {userLocation && (
                    <Marker
                        coordinate={userLocation}  
                        title="Mi ubicación"
                        description="Estás aquí"
                    >
                        <AvatarContainer>
                            <AvatarImage source={{ uri: avatar }} />
                        </AvatarContainer>
                    </Marker>
                )}


        </MapView>

        {retrievedArtifacts  && (
            <>
            <ScrollViewTitle>Retrieved Artifacts</ScrollViewTitle>
            <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
                <GridContainer>
                    {artifacts.map((marker) => (
                        <GridItem key={marker.id}>
                            {marker.isRetrieved ? (
                                <ArtifactImage source={getImage(marker.markerImage)} />
                            ) : (
                                <EmptyArtifactBox />
                            )}
                        </GridItem>
                    ))}
                </GridContainer>
            </StyledScrollView>
    </>
    )}

        {userLocation && (
                <CoordinatesContainer>
                     <CoordinatesText>
                       Your position
                    </CoordinatesText>
                    <CoordinatesText>
                        Latitude: {userLocation.latitude.toFixed(6)}, Longitude: {userLocation.longitude.toFixed(6)}
                    </CoordinatesText>
                </CoordinatesContainer>
            )}  


    </SwampBackground>

    );
};
const SwampBackground = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: ${width}px;
    height: ${height}px;
`;

const AvatarContainer = styled.View`
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    overflow: hidden;
`;

const AvatarImage = styled.Image`
    width: ${width*0.12}px;
    height: ${width*0.12}px;
    border-radius: 40px;
`;

const KaotikaFont = styled.Text`
    padding-top: 20px;
    font-family: 'KochAltschrift';
    font-size: 40px;
    color: white;
`;

const CalloutContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  max-width: ${width * 0.5}px; 
`;

const TextTitle = styled.Text`
font-family: 'KochAltschrift';
  font-size: ${width * 0.07}px;
  color: #000;
  margin-bottom: 10px;
  flex-wrap: wrap;  

`;

const TextDescription = styled.Text`
  font-size: ${width * 0.06}px;
  color: #333;
  flex-wrap: wrap;
font-family: 'KochAltschrift';
`;

const ScrollViewContent = styled.View`
    align-items: center;
`;

const ScrollViewTitle = styled.Text`
    font-size: ${width * 0.08}px;
    color: white;
    font-family: 'KochAltschrift';
    align-self: center; 
    position: absolute;
    bottom: ${height * 0.34}px;
    background-color:  rgba(0, 0, 0, 0.4);
    padding: 20px 20px;
    border-radius: 40px;
`;

const StyledScrollView = styled.ScrollView`
    position: absolute;
    bottom: ${height * 0.15}px;
    left: 10px;
    right: 10px;
    padding: 10px 0;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
`;

const GridContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px;
`;

const GridItem = styled.View`
    width: ${width * 0.26}px; 
    height: ${width * 0.26}px;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border-width: 1px;
    border-color: white;
`;

const EmptyArtifactBox = styled.View`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.3); 
    align-items: center;
    justify-content: center;
`;

const ArtifactImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

const ArtifactTitle = styled.Text`
  font-size: ${width * 0.05}px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-family: 'KochAltschrift';
`;

const CoordinatesContainer = styled.View`
    position: absolute;
    bottom: ${height * 0.04}px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 10px 20px;
    border-radius: 10px;
`;

const CoordinatesText = styled.Text`
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: ${width * 0.06}px;
    font-family: 'KochAltschrift';
`;

export default SwampScreen;
