# Mikan Connector Python

注意，如果你想要通过[Mikan订阅列表](https://mikanime.tv/Home/MyBangumi)来下载更新的番剧，移步到[Mikan Connector](https://github.com/Zhoucheng133/Mikan-Connector)，本项目是用于通过Mikan的[列表](https://mikanime.tv/Home/Classic)中筛选所需要下载的番剧

如果你希望在一般的系统中使用，你可以尝试使用[Motrix](https://motrix.app/)，如果你在服务器上使用，建议使用Docker安装Aria2

### 通用步骤
- 安装[Python3](https://www.python.org/)
- 安装所需要的依赖，你也可以手动安装
  ```bash
  pip3 install requests
  pip3 install feedparser
  # 根据你的Python安装方式，也有可能为
  pip install requests
  pip install feedparser
  ```
- 编辑本项目中的`parameters.py`，如果没有务必自行创建:
  ```py
  # parameters 参数变量

  # Aira地址，默认端口为16800
  aria_link="http://192.168.31.236:16800/jsonrpc"

  # Aria密钥，没有留空
  aria_secret="prc_password"

  # 如果是以下字符串为开头的内容进行下载
  start_with=[
      "[BML] 终末列车寻往何方",
      "[银色子弹字幕组][名侦探柯南]",
  ]

  # 排除出现以下字符串
  exclude=[
      "繁", "MKV", "v2", "CHS&CHT"
  ]

  # 更新频率 (单位为分钟)
  update_freq=15
  ```
- 执行命令来运行服务
  ```bash
  python3 main.py
  # 根据你的Python3安装方式也有可能为
  python main.py
  ```

### 如果使用Motrix

如果你想使用Motrix作为下载工具，你可以遵循以下步骤

- 从[Motrix官方网站](https://motrix.app/)下载安装Motrix
- 确认你的Motrix中Aria2的RPC端口号，位于`偏好设置 - 进阶设置 - PRC 监听端口`，默认为16800；默认的RPC 密钥为空 (即不需要密钥)，你可以自定义你的密钥
  
### 如果使用Aria2

这里以使用Docker安装Aria2为例

注意保存自己设定的端口号 (对应容器的端口号为PRC_PORT) 和 RPC_SECRET
