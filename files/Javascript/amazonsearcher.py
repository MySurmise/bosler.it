import requests
from bs4 import BeautifulSoup
from pprint import pprint
import sys
language = sys.argv[1]
url = "https://www.amazon." + language + "/s?k=" + " ".join(sys.argv[2:])
HEADERS = ({
'Host': 'www.amazon.' + language + '',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
'Accept-Language': '' + language + '; q=0.5',
'Accept-Encoding': 'gzip, deflate, br',
'DNT': '1',
'Connection': 'keep-alive',
'Cookie': 'session-id-time=2082787201l; i18n-prefs=EUR;',
'Upgrade-Insecure-Requests': '1',
'Sec-Fetch-Dest': 'document',
'Sec-Fetch-Mode': 'navigate',
'Sec-Fetch-Site': 'none',
'Sec-Fetch-User': '?1',
'Cache-Control': 'max-age=0',
'TE': 'trailers'
    })

# fetch the url
try:
    page = requests.get(url, headers=HEADERS)
except:
    HEADERS["Host"] = 'www.amazon.com'
    language = 'com'
    page = requests.get("https://www.amazon.com/s?k=" + " ".join(sys.argv[2:]), headers=HEADERS)
results = {}
soup = BeautifulSoup(page.content, features="html.parser")
#print(soup.prettify())
counter = 1
for img in soup.find_all("img", class_="s-image"):
    if (counter > 10):
        break
    
    if str(img.parent.parent).find("slredirect") == -1:
        results[str(counter)] = {"img": str(img['src']), "url": "http://amazon." + language + str(img.parent.parent['href'])}
        counter += 1
        
        
            
pprint(results)
exit()
sys.stdout.flush()
with open("test.txt", mode="w+", encoding="utf-8") as f:
    f.write(str(soup))
