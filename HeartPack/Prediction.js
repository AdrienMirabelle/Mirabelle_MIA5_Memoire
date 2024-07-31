import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const serverUrl = 'http://192.168.1.118:5000';

export default function PredictionScreen() {
  const [patientData, setPatientData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  const handleInputChange = (name, value) => {
    setPatientData({ ...patientData, [name]: value });
  };

  const generatePatientData = () => {
    setPatientData({
      age: Math.floor(Math.random() * 100).toString(),
      sex: Math.floor(Math.random() * 2).toString(),
      cp: Math.floor(Math.random() * 4).toString(),
      trestbps: Math.floor(Math.random() * 200).toString(),
      chol: Math.floor(Math.random() * 600).toString(),
      fbs: Math.floor(Math.random() * 2).toString(),
      restecg: Math.floor(Math.random() * 2).toString(),
      thalach: Math.floor(Math.random() * 200).toString(),
      exang: Math.floor(Math.random() * 2).toString(),
      oldpeak: (Math.random() * 6).toFixed(2),
      slope: Math.floor(Math.random() * 3).toString(),
      ca: Math.floor(Math.random() * 4).toString(),
      thal: Math.floor(Math.random() * 4).toString(),
    });
  };

  const handlePrediction = async () => {
    try {
      const response = await fetch(`${serverUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: Object.values(patientData).map(Number) }),
      });
      const result = await response.json();
      alert(`Prediction: ${result.prediction === 1 ? 'At risk of heart disease' : 'Not at risk'}`);
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  return (
    <View style={styles.container}>
      {Object.keys(patientData).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key}
          value={patientData[key]}
          onChangeText={(value) => handleInputChange(key, value)}
          keyboardType="numeric"
        />
      ))}
      <Button title="Générer un patient" onPress={generatePatientData} />
      <Button title="Lancer la prédiction" onPress={handlePrediction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '80%',
  },
});
