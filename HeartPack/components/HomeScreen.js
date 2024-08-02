// HomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ECGAnimation from './ECGAnimation'; // Assurez-vous que le chemin est correct

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>HeartPack</Text>

      <ECGAnimation />

      <Image
        source={require('./logo.png')} // Remplacez par le chemin vers votre logo
        style={styles.logo}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VitalSigns')}
      >
        <Text style={styles.buttonText}>Constantes vitales de l'utilisateur</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Prediction')}
      >
        <Text style={styles.buttonText}>Générer la prédiction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Combined')}
      >
        <Text style={styles.buttonText}>Constantes et prédiction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6347', // Change the background color as needed
  },
  header: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    width: 200, // Adjust width for a bigger logo
    height: 200, // Adjust height for a bigger logo
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
