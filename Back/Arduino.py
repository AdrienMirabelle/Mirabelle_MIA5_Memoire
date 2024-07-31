import serial
import time

class Arduino:
    def __init__(self, port='COM11', baudrate=115200, timeout=1):
        self.ard = serial.Serial(port=port, baudrate=baudrate, timeout=timeout)
        time.sleep(2)  
    
    def read_bpm(self):
        if self.ard.in_waiting > 0:
            data = self.ard.readline().decode('utf-8').strip()
            if data.startswith("BPM"):
                return int(data.split()[1])
        return None

arduino = Arduino()
