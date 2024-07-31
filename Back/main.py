from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from Arduino import arduino

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

@app.get("/get_bpm")
async def get_bpm():
    global bpm_value
    bpm = arduino.read_bpm()
    if bpm is not None:
        bpm_value = bpm
    return {"bpm": bpm_value}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, log_level="info")
