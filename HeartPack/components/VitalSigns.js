import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const serverUrl = 'http://192.168.1.118:5000';

const VitalSignsScreen = () => {
  const [bpm, setBpm] = useState(0);
  const [bpmData, setBpmData] = useState([]);

  const getBpm = async () => {
    try {
      const response = await fetch(`${serverUrl}/get_bpm`);
      const data = await response.json();
      setBpm(data.bpm);
      setBpmData((prevData) => [...prevData, data.bpm].slice(-20)); // Garder uniquement les 20 derniers points de données
    } catch (error) {
      console.error('Error fetching BPM:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(getBpm, 2000); // Récupérer le BPM toutes les 2 secondes
    return () => clearInterval(interval); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.bpmText}>BPM: {bpm}</Text>
        <LineChart
          data={{
            labels: bpmData.map((_, index) => (index % 5 === 0 ? index.toString() : '')),
            datasets: [
              {
                data: bpmData,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Ligne rouge
                strokeWidth: 2, // Épaisseur de la ligne
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} 
          height={220}
          yAxisLabel="BPM " // Label pour l'axe des ordonnées
          xAxisLabel="Temps" // Label pour l'axe des abscisses
          chartConfig={{
            backgroundColor: '#FFFFFF', 
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Couleur noire pour les axes et le texte
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ff0000', 
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bpmText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    marginBottom: 20,
  },
});

export default VitalSignsScreen;
