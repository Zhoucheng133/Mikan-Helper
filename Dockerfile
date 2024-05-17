FROM python:3.9.13-slim-buster
WORKDIR /app
COPY . /app
RUN pip config set global.index-url http://mirrors.aliyun.com/pypi/simple
RUN pip config set install.trusted-host mirrors.aliyun.com
RUN pip install -r requirements.txt
EXPOSE 8811
CMD ["python", "main.py"]