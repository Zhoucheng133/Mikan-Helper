import parameters
import requests
import feedparser
import asyncio


class Server:
    pre_ls=[]
    ls=[]

    def downloadHandler(self, url):
        data=f'''
{{
    "jsonrpc": "2.0",
    "method": "aria2.addUri",
    "id": 1,
    "params": [
        "token:{parameters.aria_secret}",
        ["{url}"],
        {{
            "split": "5",
            "max-connection-per-server": "5",
            "seed-ratio": "0"
        }}
    ]
}}
        '''
        requests.post(parameters.aria_link, data)

    def judge(self):
        newItems = [item for item in self.ls if item not in self.pre_ls]
        download_ls=[]
        for item in newItems:
            if not any(exclude in item['title'] for exclude in parameters.exclude):
                if any(item['title'].startswith(prefix) for prefix in parameters.start_with):
                    download_ls.append(item)
        for item in download_ls:
            print("下载: "+item["title"])
            self.downloadHandler(item["url"])

    def rssRequest(self):
        try:
            rss_data=feedparser.parse(requests.get("https://mikanime.tv/RSS/Classic").text)
            return rss_data
        except requests.RequestException as e:
            print("请求出现错误")
            return ""

    def loop(self):
        rss_data=self.rssRequest()
        if len(rss_data)==0:
            return
        rss_list=[]
        for item in rss_data.entries:
            rss_list.append({
                "title": item['id'],
                "url": item['links'][2]['href'],
                "length": item['links'][2]['length'],
            })
        print("请求rss服务器")
        if len(self.pre_ls)==0 and len(self.ls)==0:
            self.ls=rss_list
        else:
            self.pre_ls=self.ls
            self.ls=rss_list
            self.judge()

    async def mainLoop(self):
        while True:
            self.loop()
            await asyncio.sleep(parameters.update_freq*60)



if __name__ == "__main__":
    asyncio.run(Server().mainLoop())
