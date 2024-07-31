import asyncio
import serial_asyncio
from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO, emit
import joblib
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

model_path = os.getenv('MODEL_PATH')
model = joblib.load(model_path)

arduino_port = 'COM11'  # Assurez-vous que ce port est correct

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']
    prediction = model.predict([data])
    return jsonify({'prediction': int(prediction[0])})

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

async def read_from_arduino():
    reader, _ = await serial_asyncio.open_serial_connection(url=arduino_port, baudrate=9600)
    while True:
        try:
            line = await reader.readline()
            bpm = line.decode('utf-8').strip()
            print(f"Received BPM: {bpm}")  # Affichez les données reçues
            if bpm:
                socketio.emit('bpm', {'bpm': bpm})
        except Exception as e:
            print(f"Erreur lors de la lecture du port série. Détails : {e}")
            break

async def main():
    asyncio.create_task(read_from_arduino())
    socketio.run(app, debug=True)

if __name__ == '__main__':
    asyncio.run(main())
