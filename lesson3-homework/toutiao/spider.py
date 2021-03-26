import requests
import json
import time
import math
import hashlib
from bs4 import BeautifulSoup

LOAD_FILENAME = "load.json"

def getASCP():
    t = int(math.floor(time.time()))
    e = hex(t).upper()[2:]
    m = hashlib.md5()
    m.update(str(t).encode(encoding='utf-8'))
    i = m.hexdigest().upper()

    if len(e) != 8:
        AS = '479BB4B7254C150'
        CP = '7E0AC8874BB0985'
        return AS,CP

    n = i[0:5]
    a = i[-5:]
    s = ''
    r = ''
    for o in range(5):
        s += n[o] + e[o]
        r += e[o + 3] + a[o]

    AS = 'A1' + s + e[-3:]
    CP = e[0:3] + r + 'E1'
    print("AS:"+AS,"CP:"+CP)
    return AS,CP


def save_load(load_dict):
    dumped_json_load = json.dumps(load_dict)
    fw = open(LOAD_FILENAME,"w")
    fw.write(dumped_json_load)
    fw.close()


def get_url(max_behot_time,AS,CP):
    url = 'https://www.toutiao.com/api/pc/feed/?category=news_hot&utm_source=toutiao&widen=1' \
           '&max_behot_time={0}' \
           '&max_behot_time_tmp={0}' \
           '&tadrequire=true' \
           '&as={1}' \
           '&cp={2}'.format(max_behot_time,AS,CP)
    print(url)
    return url

def get_item(url):
    load_dict = {}
    cookies = {"tt_webid":"6413971664988276225"}
    wbdata = requests.get(url,cookies = cookies).content
    wbdata2 = json.loads(wbdata)

    data = wbdata2['data']
    i = 0
    for news in data:
        title = news['title']
        news_url = news['source_url']
        news_url = "https://www.toutiao.com"+news_url
        if('comments_count' in news.keys()):
            comments_count = news['comments_count']
        else:
            comments_count = 0

        if('middle_image' in news.keys()):
            middle_image_url = news["middle_image"]
        else:
            middle_image_url = ""
        media_url = "https://www.toutiao.com" + news["media_url"]
        if("media_avatar_url" in news.keys()):
            media_avatar_url = "https:" + news["media_avatar_url"]
        else:
            media_avatar_url = ""
        single_mode = news["single_mode"]
        behot_time = news["behot_time"]

        load_dict[i] = {}
        #load_dict[i] = news
        load_dict[i]["title"] = title
        load_dict[i]["news_url"] = news_url
        load_dict[i]["comments"] = comments_count
        load_dict[i]["middle_image_url"] = middle_image_url
        load_dict[i]["media_url"] = media_url
        load_dict[i]["media_avatar_url"] = media_avatar_url
        load_dict[i]["single_mode"] = single_mode
        load_dict[i]["behot_time"] = behot_time

        response = requests.get(media_url)
        soup = BeautifulSoup(response.text, 'html.parser')
        media_name = soup.find('span', class_ = 'name').text
        load_dict[i]["media_name"] = media_name
        i = i + 1
        print(title)
        print("--------------------------------------------------------")
    save_load(load_dict)
    next_data = wbdata2['next']
    next_max_behot_time = next_data['max_behot_time']
    print("next_max_behot_time:{0}".format(next_max_behot_time))
    return next_max_behot_time


refresh = 2
for x in range(0,refresh):
    print("第{0}次：".format(x))
    if x == 0:
        max_behot_time = 0
    else:
        max_behot_time = next_max_behot_time
        print (max_behot_time)

    AS,CP = getASCP()
    url = get_url(max_behot_time,AS,CP)
    next_max_behot_time = get_item(url)

