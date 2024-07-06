from flask import Flask, Response

app = Flask(__name__)

@app.route('/')
def hello_world():
    xml_content=''
    with open('Test/after.xml', 'r', encoding='utf-8') as file:
        xml_content = file.read()
    return Response(xml_content, mimetype='application/xml')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)