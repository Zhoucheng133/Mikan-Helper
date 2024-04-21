# parameters 参数变量

# Aira地址，默认端口为16800
aria_link="http://192.168.31.236:16800/jsonrpc"

# Aria密钥，没有留空
aria_secret="prc_password"

# 订阅模式，使用个人的rss订阅链接
# 注意启用这个模式会忽略start_with内容，并且务必填写subscript_url订阅地址
# 注意禁用这个模式会从所有列表中筛选符合start_with和exclude的内容进行下载
subscript_mode=False

# 订阅地址，如果没有启用订阅模式会自动忽略下面的内容
subscript_url="https://mikanime.tv/RSS/MyBangumi?token="

# 如果是以下字符串为开头的内容进行下载
# 注意如果启用订阅模式会自动忽略下面的内容
start_with=[
    "[BML] 终末列车寻往何方"
]

# 排除出现以下字符串，订阅模式是否开启都会进行筛选
exclude=[
    "繁", "MKV", "v2", "CHS&CHT"
]

# 更新频率 (单位为分钟)
update_freq=15