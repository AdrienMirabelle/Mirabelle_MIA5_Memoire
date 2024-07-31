import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HeartPack</Text>
      <Button
        title="Constantes vitales de l'utilisateur"
        onPress={() => navigation.navigate('VitalSigns')}
      />
      <Button
        title="Générer la prédiction"
        onPress={() => navigation.navigate('Prediction')}
      />
      <Button
        title="Constantes et prédiction"
        onPress={() => navigation.navigate('Combined')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
