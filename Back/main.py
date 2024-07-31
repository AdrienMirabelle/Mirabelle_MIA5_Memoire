from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from Arduino import arduino
from joblib import load
import os

app = FastAPI()

# Configuration de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Vous pouvez restreindre cela aux domaines de votre application React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bpm_value = 0

# Charger le modèle
model_path = os.getenv('MODEL_PATH', 'random_forest_heart_disease_model.joblib')
model = load(model_path)

@app.get("/get_bpm")
async def get_bpm():
    global bpm_value
    bpm = arduino.read_bpm()
    if bpm is not None:
        bpm_value = bpm
    return {"bpm": bpm_value}

@app.post("/predict")
async def predict(data: dict):
    try:
        features = data.get("data", [])
        if len(features) != 13:
            raise HTTPException(status_code=400, detail="Invalid input data")
        prediction = model.predict([features])
        return {"prediction": int(prediction[0])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, log_level="info")