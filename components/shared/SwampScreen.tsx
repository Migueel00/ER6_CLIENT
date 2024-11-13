import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Image } from 'react-native';
import * as geolib from 'geolib';
import { mapStyle, greenInsideRGBA, greenRGBA, redInsideRGBA, redRGBA, regionAEG} from './mapStyle';

console.log("INFO OF GEOLOCATION");
Geolocation.getCurrentPosition(info => console.log(info.coords));

const swampImage = require('./../../assets/backgrounds/swampBackground.png');
const marker1Image = require('./../../assets/png/Artifcats/Marker1.png');
const marker2Image = require('./../../assets/png/Artifcats/Marker2.png');
const marker3Image = require('./../../assets/png/Artifcats/Marker3.png');
const marker4Image = require('./../../assets/png/Artifcats/Marker4.png');

const { height, width } = Dimensions.get('window');

//43.3246148, -1.9351902

type LocationType = {
    latitude: number;
    longitude: number;
};

const SwampScreen = () => {  
    
    const markers = [
        {
            id: 1,
            title: 'Artifact 1',
            description: 'First Artifact',
            coordinate: { latitude: 43.310625, longitude: -2.003209 },
            image: marker1Image,
            isRetrieved: false,
        },
        {
            id: 2,
            title: 'Artifact 2',
            description: 'Second Artifact',
            coordinate: { latitude: 43.310673, longitude: -2.002441 },
            image: marker2Image,
            isRetrieved: false,
        },
        {
            id: 3,
            title: 'Artifact 3',
            description: 'Third Artifact',
            coordinate: { latitude: 43.309534, longitude: -2.002030},
            image: marker3Image,
            isRetrieved: false,
        },
        {
            id: 4,
            title: 'Artifact 4',
            description: 'Fourth Artifact',
            coordinate: { latitude:  43.309801, longitude: -2.003381},
            image: marker4Image,
            isRetrieved: false,
        }
    ];

    const context = useContext(AppContext);
    const player = context?.player;
    const avatar = player?.avatar;
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
    const [swampBackgroundImage, setLabBackgroundImage] = useState(swampImage);
    const [userLocation, setUserLocation] = useState<LocationType | null>(null);
    const [markersState, setMarkersState] = useState(markers);

    const [markerColors, setMarkerColors] = useState([
        { circleColor: redRGBA, insideCircleColor: redInsideRGBA },
        { circleColor: redRGBA, insideCircleColor: redInsideRGBA }, 
        { circleColor: redRGBA, insideCircleColor: redInsideRGBA },
        { circleColor: redRGBA, insideCircleColor: redInsideRGBA }
    ]);

    const circleRadius = 1;



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
                    markers[index].coordinate,
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
        if (locationPermissionGranted) {
          console.log("PERMISOS OTORGADOS");
    
          // Obtener la ubicación actual del usuario
          Geolocation.getCurrentPosition(
            (position) => {
                console.log(
                    'You are ',
                    geolib.getDistance(position.coords, {
                        latitude: markers[0].coordinate.latitude,
                        longitude: markers[0].coordinate.longitude,
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
      }, [locationPermissionGranted]); // Dependencia: se ejecuta cuando 'locationPermissionGranted' cambia

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
                { enableHighAccuracy: true, distanceFilter: 0, interval: 3000 } // Update every 3 seconds
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
        
        const updatedMarkers = markersState.map((marker) =>
            marker.id === markerId ? { ...marker, isRetrieved: true } : marker
        );

        console.log("UPDATED MARKERS"); 
        console.log(updatedMarkers);
        
        setMarkersState(updatedMarkers);

        console.log("MARKERS AFTER SET");
        console.log(markersState);
        
        
    };
    return (

        <SwampBackground source={swampBackgroundImage}>
        <MapView
            style={{ width: '100%', height: '100%' }}  // Asigna el tamaño completo del mapa
            initialRegion={regionAEG} 
            customMapStyle={mapStyle}
        >
            {(player?.role === 'ACOLYTE' || player?.role === 'MORTIMER') && (
            markersState.map((marker, index) => (
                !marker.isRetrieved && (
                <React.Fragment key={marker.id}>
                     <Marker
                        coordinate={marker.coordinate}
                        image={marker.image}
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
                        radius={4}  // Cambiado temporalmente a 10 metros
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

export default SwampScreen;
