import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

console.log("INFO OF GEOLOCATION");
Geolocation.getCurrentPosition(info => console.log(info.coords));

const swampImage = require('./../../assets/backgrounds/swampBackground.png');

const artifact1Image = require('./../../assets/png/Artifcats/Artifact1.png');
const artifact2Image = require('./../../assets/png/Artifcats/Artifact2.png');
const artifact3Image = require('./../../assets/png/Artifcats/Artifact3.png');
const artifact4Image = require('./../../assets/png/Artifcats/Artifact4.png');

const { height, width } = Dimensions.get('window');

type LocationType = {
    latitude: number;
    longitude: number;
};

const SwampScreen = () => {  

    const context = useContext(AppContext);
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
    const [swampBackgroundImage, setLabBackgroundImage] = useState(swampImage);
    const [userLocation, setUserLocation] = useState<LocationType | null>(null);

    const markers = [
        {
            id: 1,
            title: 'Artifact 1',
            description: 'First Artifact',
            coordinate: { latitude: 43.310625, longitude: -2.003209 }
        },
        {
            id: 2,
            title: 'Artifact 2',
            description: 'Second Artifact',
            coordinate: { latitude: 43.310673, longitude: -2.002441 }
        },
        {
            id: 3,
            title: 'Artifact 3',
            description: 'Third Artifact',
            coordinate: { latitude: 43.309534, longitude: -2.002030}
        },
        {
            id: 4,
            title: 'Artifact 4',
            description: 'Fourth Artifact',
            coordinate: { latitude:  43.309801, longitude: -2.003381}
        }
    ];


    // Function to handle location updates
    const handleLocationUpdate = (position: any) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Posición actual del usuario:", latitude, longitude);
        setUserLocation({ latitude, longitude });
    };
    

    const regionAEG = { latitude: 43.309682,
                        longitude: -2.002456,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001}


   
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
              // Acceder a la ubicación cuando la promesa se resuelva
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log("Posición actual del usuario:", latitude, longitude);
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
                    console.log("Actualización de ubicación:", position);  // Verifica que recibas datos del watcher
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
    return (

        <SwampBackground source={swampBackgroundImage}>
        <MapView
            style={{ width: '100%', height: '100%' }}  // Asigna el tamaño completo del mapa
            initialRegion={regionAEG} 
        >
            {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}

            {userLocation && (
                    <Marker
                        coordinate={userLocation}  
                        title="Mi ubicación"
                        description="Estás aquí"
                    />
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
const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 20px;
`;

const PermissionButton = styled(TouchableOpacity)`
    padding: 10px;
    border-radius: 5px;
`;

const ButtonImageBackground = styled.ImageBackground`
    justify-content: center;
    align-items: center;
    width: 315px;
    height: 80px;
`;

const KaotikaButton = styled.Text`
    background-color: transparent;
    font-family: 'KochAltschrift';
    font-size: 30px;
`;

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
`;

const KaotikaFont = styled.Text`
    padding-top: 20px;
    font-family: 'KochAltschrift';
    font-size: 40px;
    color: white;
`;

export default SwampScreen;
