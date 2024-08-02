import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import VitalSignsScreen from './VitalSigns';
import PredictionScreen from './Prediction';

// Affichage du BPM, du graphique de ce dernier et de la prédiction
const CombinedScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VitalSignsScreen />
      <PredictionScreen />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CombinedScreen;
