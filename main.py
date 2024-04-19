from threading import Thread
from flask import Flask, send_file, send_from_directory

log=[]

# class MainServer:


app = Flask(__name__)
@app.route('/api')
def api():
    return log

@app.route('/')
def home():
    return send_from_directory('ui/dist', "index.html")

@app.route('/assets/<path:path>')
def assets(path):
    return send_file("ui/dist/assets/"+path)


if __name__=="__main__":
    t1 = Thread(target=app.run, args=("0.0.0.0", 8811))