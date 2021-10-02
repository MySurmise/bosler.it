
import requests
from bs4 import BeautifulSoup
from pprint import pprint
import sys

url = "https://www.amazon.de/s?k=" + " ".join(sys.argv[1:])
HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})

# fetch the url
page = requests.get(url, headers=HEADERS)

# create the object that will contain all the info in the url
results = []
soup = BeautifulSoup(page.content, features="html.parser")
for img in soup.find_all("img", class_="s-image"):
    if str(img.parent.parent).find("slredirect") == -1:
        results.append(str(img['src']))
        results.append("http://amazon.de" + str(img.parent.parent['href']))
            
pprint(results)

with open("test.txt", mode="w+", encoding="utf-8") as f:
    f.write(str(soup))