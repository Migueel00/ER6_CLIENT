import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

console.log("INFO OF GEOLOCATION");
Geolocation.getCurrentPosition(info => console.log(info.coords));

const swampImage = require('./../../assets/backgrounds/swampBackground.png');
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
            title: 'Swamp Marker',
            description: 'A marker in the swamp area',
            coordinate: { latitude: 43.309682, longitude: -2.002456 }
        }
    ];

    

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
        console.log("ENTRA AL USEFFECT PARA OBTENER LA POSICION");
        
        if (locationPermissionGranted) {
            console.log("PERMISSIONS GRANTED");
            
            Geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log("Posición actual del usuario:", latitude, longitude);
                    const location = {latitude, longitude}
                    setUserLocation(location)
                    console.log("USER LOCATION");
                    console.log(userLocation);
                    
                    
                },
                (error) => console.log("Error de geolocalización:", error),
                { enableHighAccuracy: true, timeout: 20000, distanceFilter: 0 }
            );

        }
    }, [locationPermissionGranted]); // Solo ejecuta si el permiso fue concedido

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
