import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import VitalSignsScreen from './screens/VitalSignsScreen';
import PredictionScreen from './screens/PredictionScreen';
import CombinedScreen from './screens/CombinedScreen';

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
