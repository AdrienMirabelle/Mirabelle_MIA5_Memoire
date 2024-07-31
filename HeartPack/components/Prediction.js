import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PredictionScreen = () => {
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

  const handleInputChange = (field, value) => {
    setPatientData({
      ...patientData,
      [field]: value,
    });
  };

  const generateRandomPatient = () => {
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
      const response = await fetch('http://192.168.1.118:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: Object.values(patientData).map(Number) }),
      });
      const result = await response.json();
      alert(result.prediction === 1 ? 'Suspicion de maladie cardiaque' : 'Pas de suspicion de maladie cardiaque');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {Object.keys(patientData).map((field, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={field}
          value={patientData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          keyboardType="numeric"
        />
      ))}
      <Button title="Générer un patient" onPress={generateRandomPatient} />
      <Button title="Lancer la prédiction" onPress={handlePrediction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: '100%',
  },
});

export default PredictionScreen;