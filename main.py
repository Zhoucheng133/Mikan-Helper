from flask import Flask, jsonify, request, send_file, send_from_directory
import threading
import time

app = Flask(__name__)

val="Hello Python"

aria_link=""
aria_secret=""
subscript_mode=False
subscript_url=""
start_with=[]
exclude=[]
update_freq=""

class ServerThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self._stop_event = threading.Event()

    def run(self):
        while not self._stop_event.is_set():
            print(val)
            time.sleep(3)

    def stop(self):
        self._stop_event.set()

server_thread = None

@app.route('/')
def home():
    return send_from_directory('ui/dist', "index.html")

@app.route('/assets/<path:path>')
def assets(path):
    return send_file("ui/dist/assets/"+path)

@app.route('/api/run', methods=['POST'])
def startServer():
    global server_thread
    if server_thread is None or not server_thread.is_alive():
        server_thread = ServerThread()
        server_thread.start()
        return jsonify({'status':'ok', 'message': 'loop started'}), 200
    else:
        return jsonify({'status': 'err', 'message': 'loop running'}), 400

@app.route('/api/stop', methods=['POST'])
def StopServer():
    global server_thread
    if server_thread is not None and server_thread.is_alive():
        server_thread.stop()
        server_thread.join()
        return jsonify({'status':'ok', 'message': 'loop stoped'}), 200
    else:
        return jsonify({'status':'err', 'message': 'no loop'}), 400


if __name__ == '__main__':
    app.run("0.0.0.0", 8811)
