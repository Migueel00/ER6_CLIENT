import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './homeScreen';
import ProfileScreen2 from './profileScreen2';
import SettingsScreen from './settings/settingsScreen';
import LabScreen from './labScreen';

const Tab = createMaterialTopTabNavigator();

const AcolyteScreens = () => {
  const { height } = Dimensions.get('window');
  const [swipeEnabled, setSwipeEnabled] = useState(false); // Start with swipe disabled

  // Function to detect touch start position
  const handleTouchStart = (event: any) => {
    console.log("HANDLED");
    
    const touchY = event.nativeEvent.pageY;
    console.log(touchY);
    
    // Enable swipe only if the touch starts in the top half of the screen
    if (touchY < height / 2) {
        console.log("TOP HALF OF THE SCREEN");
        
      setSwipeEnabled(true);
    }
  };

  // Function to handle touch end
  const handleTouchEnd = () => {
    setSwipeEnabled(false); // Disable swipe on touch end
  };

  return (
    <View 
      style={{ flex: 1 }} 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd} // Disable swipe when touch ends
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            swipeEnabled: swipeEnabled, // Dynamically enable or disable swiping
            tabBarStyle: {
              backgroundColor: 'black',
              height: height * 0.10, // Height adjustment
              paddingBottom: 1,
            },
            tabBarIconStyle: {
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 50,
            },
            tabBarIndicatorStyle: {
              backgroundColor: 'orange',
              height: 3,
            },
            tabBarItemStyle: {
              justifyContent: 'center',
              borderRightWidth: 0.2,
              borderRightColor: 'white',
              paddingHorizontal: 10,
              height: '100%',
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('../assets/icons/fixed/homeIcon.png')}
                  style={{ width: 70, height: 70, resizeMode: 'contain', margin: 0 }}
                />
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen2}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('../assets/icons/fixed/profileIcon.png')}
                  style={{ width: 70, height: 70 }}
                />
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('../assets/icons/fixed/settingsIcon.png')}
                  style={{ width: 70, height: 70 }}
                />
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tab.Screen
            name="LAB"
            component={LabScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('../assets/icons/fixed/potionIcon.png')}
                  style={{ width: 70, height: 70 }}
                />
              ),
              tabBarLabel: () => null,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AcolyteScreens;
