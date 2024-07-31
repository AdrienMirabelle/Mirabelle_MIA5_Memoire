import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import VitalSigns from './components/VitalSigns';
import Prediction from './components/Prediction';
import CombinedScreen from './components/CombinedScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VitalSigns" component={VitalSigns} />
        <Stack.Screen name="Prediction" component={Prediction} />
        <Stack.Screen name="Combined" component={CombinedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
