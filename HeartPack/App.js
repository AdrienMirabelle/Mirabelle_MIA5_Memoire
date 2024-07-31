import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const serverUrl = 'http://192.168.1.118:5000';

export default function App() {
  const [bpm, setBpm] = useState(0);

  const getBpm = async () => {
    try {
      const response = await fetch(`${serverUrl}/get_bpm`);
      const data = await response.json();
      setBpm(data.bpm);
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
      </View>
    </SafeAreaView>
  );
}

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
