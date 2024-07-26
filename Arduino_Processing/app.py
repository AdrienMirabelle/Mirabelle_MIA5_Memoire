from flask import Flask, request, jsonify
import joblib
from dotenv import load_dotenv
import os

# Charger les variables d'environnement à partir du fichier .env
load_dotenv()

app = Flask(__name__)

model_path = os.getenv('MODEL_PATH')
model = joblib.load(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = [
            data['age'], data['sex'], data['cp'], data['trestbps'], data['chol'],
            data['fbs'], data['restecg'], data['thalach'], data['exang'],
            data['oldpeak'], data['slope'], data['ca'], data['thal']
        ]
        prediction = model.predict([features])
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)
