import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import VitalSignsScreen from './VitalSigns';
import PredictionScreen from './Prediction';

// Affichage du BPM, du graphique de ce dernier et de la prédiction
const CombinedScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <VitalSignsScreen />
      </View>
      <View style={styles.card}>
        <PredictionScreen />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000', // Fond rouge
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF', // Couleur de fond des cartes
    borderRadius: 10,           // Coins arrondis
    padding: 20,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',        // Ombre pour Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,               // Ombre pour iOS
  },
});

export default CombinedScreen;
