from flask import Flask, jsonify, request, send_file, send_from_directory
import threading
import time
import feedparser
import datetime
import requests

app = Flask(__name__)
# CORS(app)

formData={
    'subscribeMode': True,
    'rssLink': "",
    'bangumi': [],
    'rules': [],
    'updateFreq': 15,
    'ariaLink': "",
    'ariaSecret': "",
}
log=[
    
]

class ServerThread(threading.Thread):

    pre_ls=[]
    ls=[]

    def __init__(self):
        threading.Thread.__init__(self)
        self._stop_event = threading.Event()

    def downloadHandler(self, url):
        data=f'''
{{
    "jsonrpc": "2.0",
    "method": "aria2.addUri",
    "id": 1,
    "params": [
        "token:{formData['ariaSecret']}",
        ["{url}"],
        {{
            "split": "5",
            "max-connection-per-server": "5",
            "seed-ratio": "0"
        }}
    ]
}}
        '''
        requests.post(formData['ariaLink'], data)

    def run(self):
        while not self._stop_event.is_set():
            self.mainLoop()
            time.sleep(formData['updateFreq']*60)

    def addLog(self, logtype, val):
        current_time=datetime.datetime.now()
        if len(log)>=50:
            log.pop(0)
        log.append({
            "type": logtype,
            "time": current_time.strftime("%Y-%m-%d %H:%M:%S"),
            "value": val
        })

    def rssRequest(self):
        try:
            rss_data=feedparser.parse(requests.get(formData['rssLink']).text)
            return rss_data
        except requests.RequestException as e:
            self.addLog("err", "请求出错")
            return ""
        
    def judge(self):
        newItems = [item for item in self.ls if item not in self.pre_ls]
        download_ls=[]
        exclude=[]
        include=[]
        for item in formData['rules']:
            if item['type']=='include':
                include.append(item['value'])
            else:
                exclude.append(item['value'])

        # 记得把False改为True
        if formData["subscribeMode"]==True:
            for item in newItems:
                if all(exclude_word not in item['title'] for exclude_word in exclude) and all(include_word in item['title'] for include_word in include):
                    download_ls.append(item)
        else:
            for item in newItems:
                if all(exclude_word not in item['title'] for exclude_word in exclude) and all(include_word in item['title'] for include_word in include):
                    for list_item in formData['bangumi']:
                        if list_item["ass"] in item['title'] and list_item["title"] in item['title']:
                            download_ls.append(item)
                            break

        for item in download_ls:
            print("下载: "+item["title"])
            self.addLog("download", "下载: "+item["title"])
            self.downloadHandler(item["url"])

    def mainLoop(self):
        rss_data=self.rssRequest()
        if len(rss_data)==0:
            print("请求失败!")
            return
        rss_list=[]
        for item in rss_data.entries:
            rss_list.append({
                "title": item['id'],
                "url": item['links'][2]['href'],
                "length": item['links'][2]['length'],
            })
        print("请求rss服务器")
        self.addLog("ok", "请求rss服务器")
        if len(self.pre_ls)==0 and len(self.ls)==0:
            self.ls=rss_list
        else:
            self.pre_ls=self.ls
            self.ls=rss_list
            self.judge()

    def stop(self):
        self._stop_event.set()

server_thread = None

@app.route('/')
def home():
    return send_from_directory('ui/dist', "index.html")

@app.route('/assets/<path:path>')
def assets(path):
    return send_file("ui/dist/assets/"+path)

@app.route('/api/log')
def getLog():
    global log
    return jsonify({'status': 'ok', 'log': log})

@app.route('/api/status')
def getStatus():
    global server_thread
    global formData
    if server_thread is not None and server_thread.is_alive():
        return jsonify({'status': 'ok', 'formData': formData}), 200
    else:
        return jsonify({'status': 'false', 'formData': formData}), 200

@app.route('/api/run', methods=['POST'])
def startServer():
    global server_thread
    global formData
    formData = request.json
    if server_thread is None or not server_thread.is_alive():
        server_thread = ServerThread()
        server_thread.start()
        return jsonify({'status':'ok', 'message': 'loop started'}), 200
    else:
        return jsonify({'status': 'err', 'message': 'loop running'}), 400

@app.route('/api/stop', methods=['POST'])
def stopServer():
    global server_thread
    if server_thread is not None and server_thread.is_alive():
        server_thread.stop()
        server_thread.join()
        return jsonify({'status':'ok', 'message': 'loop stoped'}), 200
    else:
        return jsonify({'status':'err', 'message': 'no loop'}), 400


if __name__ == '__main__':
    app.run("0.0.0.0", 8811)
