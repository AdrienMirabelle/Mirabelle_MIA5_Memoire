// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import VitalSignsScreen from './components/VitalSigns';
import PredictionScreen from './components/Prediction';
import CombinedScreen from './components/CombinedScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VitalSigns" component={VitalSignsScreen} />
        <Stack.Screen name="Prediction" component={PredictionScreen} />
        <Stack.Screen name="Combined" component={CombinedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
