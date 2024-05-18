FROM python:3.9.13-slim-buster
WORKDIR /app
COPY . /app
RUN pip config set global.index-url http://mirrors.aliyun.com/pypi/simple
RUN pip config set install.trusted-host mirrors.aliyun.com
RUN pip install -r requirements.txt
# 下面两行用于设置时区，可以根据自己的情况设定
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo 'Asia/Shanghai' >/etc/timezone \
EXPOSE 8811
CMD ["python", "main.py"]