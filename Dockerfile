FROM python:3.9.12-buster
WORKDIR /app
COPY . /app
RUN pip config set global.index-url http://mirrors.aliyun.com/pypi/simple
RUN pip config set install.trusted-host mirrors.aliyun.com
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo 'Asia/Shanghai' >/etc/timezone \
EXPOSE 8811
CMD ["python", "main.py"]