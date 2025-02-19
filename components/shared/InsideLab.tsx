import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import * as CONSTANTS from '../../src/constants';
import HomeLab from './HomeLab';
import PotionCreator from './PotionCreator/PotionCreator';

const { width, height } = Dimensions.get('window');

const activeOpacity = 1;
const inactiveOpacity = 0.2;

const Icon = styled.Image<{ focused: boolean }>`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
    opacity: ${({ focused }) => (focused ? activeOpacity : inactiveOpacity)};
    resize-mode: contain;
    margin: 0;
`;

const Tab = createBottomTabNavigator();

const InsideLab = () => {

	return (
		<NavigationContainer independent={true}>
			<Tab.Navigator
				screenOptions={{
					tabBarStyle: {
						backgroundColor: 'black',
						height: height * 0.092, // Height for bottom tab bar
						paddingBottom: 5, // Adds space at the bottom
					},
					tabBarIconStyle: {
						justifyContent: 'center',
						alignItems: 'center',
						width: height * 0.08, // Width for icons
						height: height * 0.08, // Height for icons
					},
					tabBarShowLabel: false,
					headerShown: false,
					tabBarItemStyle: {
						justifyContent: 'center', // Center icons
						borderRightWidth: 0.2, // Border between tabs
						borderRightColor: 'white', // Border color
						paddingHorizontal: 10,
						height: '100%',
					},
				}}
			>
				<Tab.Screen
					name="HomeLab"
					component={HomeLab}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icon
								source={require('../../assets/icons/homeLabIcon.png')}
								focused={focused}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Potion Creator"
					component={PotionCreator}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icon
								source={require('../../assets/icons/potionCreatorIcon.png')}
								focused={focused}
							/>
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default InsideLab;
