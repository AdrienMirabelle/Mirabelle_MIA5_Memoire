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
      setBpmData(prevData => [...prevData, data.bpm].slice(-20)); // Keep only the last 20 data points
    } catch (error) {
      console.error('Error fetching BPM:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(getBpm, 2000); // Fetch BPM every 2 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
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
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=" BPM"
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bpmText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default VitalSignsScreen;
