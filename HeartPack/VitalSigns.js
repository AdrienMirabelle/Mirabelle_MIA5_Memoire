import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const serverUrl = 'http://192.168.1.118:5000';

export default function VitalSignsScreen() {
  const [bpm, setBpm] = useState(0);
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(0);

  const getBpm = async () => {
    try {
      const response = await fetch(`${serverUrl}/get_bpm`);
      const data = await response.json();
      setBpm(data.bpm);
      setInterval(data.interval);
      setData((prevData) => [...prevData, data.bpm]);
    } catch (error) {
      console.error('Error fetching BPM:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(getBpm, 2000); // Fetch BPM every 2 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BPM: {bpm}</Text>
      <Text style={styles.title}>Interval: {interval} ms</Text>
      <LineChart
        data={{
          datasets: [
            {
              data: data.length ? data : [0],
            },
          ],
        }}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#1E2923',
          backgroundGradientFrom: '#08130D',
          backgroundGradientTo: '#1F1F1F',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
});
