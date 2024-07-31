import React from 'react';
import { View, StyleSheet } from 'react-native';
import VitalSignsScreen from './VitalSignsScreen';
import PredictionScreen from './PredictionScreen';

export default function CombinedScreen() {
  return (
    <View style={styles.container}>
      <VitalSignsScreen />
      <PredictionScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
