# from flask import Flask, jsonify
# from flask_cors import CORS
# import serial
# import threading
# import time
# import queue

# app = Flask(__name__)
# CORS(app)

# bpm_queue = queue.Queue()

# def read_from_arduino():
#     try:
#         arduino = serial.Serial('COM11', 115200)
#         print("Arduino connection established")
#         while True:
#             line = arduino.readline().decode('utf-8').strip()
#             if line.startswith("BPM"):
#                 bpm_value = int(line.split()[1])
#                 print(f"Received: {bpm_value}")
#                 if bpm_queue.qsize() >= 10:
#                     bpm_queue.get()
#                 bpm_queue.put(bpm_value)
#     except Exception as e:
#         print(f"Error reading from Arduino: {e}")

# @app.route('/get_bpm', methods=['GET'])
# def get_bpm():
#     if not bpm_queue.empty():
#         latest_bpm = bpm_queue.get()
#         print(f"Returning BPM: {latest_bpm}")
#         return jsonify({'bpm': latest_bpm})
#     else:
#         print("No data available yet.")
#         return jsonify({'bpm': 0})

# if __name__ == '__main__':
#     arduino_thread = threading.Thread(target=read_from_arduino)
#     arduino_thread.start()
#     app.run(host='0.0.0.0', port=5000, debug=True)



# import serial
# import time

# arduinoData=serial.Serial('COM11', 115200)
# time.sleep(1)

# while True:
#     while (arduinoData.inWaiting()==0):
#         pass
#     DataPacket=arduinoData.readline()
#     print(DataPacket)
