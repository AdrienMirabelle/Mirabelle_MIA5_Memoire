from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# chargement du modèle de prédiction
model = joblib.load('C:\\Users\\adrien.mirabelle\\Desktop\\Mémoire Adrien\\Prédiction_Problème_Cardiaque\\Prédiction\\random_forest_heart_disease_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    bpm = data['bpm']
    prediction = model.predict([[bpm]])
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
