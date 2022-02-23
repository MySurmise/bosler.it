import express from 'express';
import axios from "axios";
import fs from 'fs';


const app = express();
const timelog = (objectToLog) => {
    const currentTime = new Date(Date.now());
    if (typeof objectToLog == "string" || typeof objectToLog == "undefined") {
        console.log("[" + ("" + currentTime).split(" ").slice(1, 5).join(" ") + "] " + objectToLog);
    } else {
        console.log("[" + ("" + currentTime).split(" ").slice(1, 5).join(" ") + "] ");
        console.log(objectToLog);
    }
};

app.use(function (request, response, next) {

    if (request.secure) {
        console.log(request.headers.host)
        console.log(request.url)

        return response.redirect(301, "http://" + request.headers.host.replace('www.', '') + request.url);
    }

    next();
})

const huhn = (text) => {
    // fs.writeFileSync("resp", text)

    // const textSplittedByGV = text.split("googlevideo")
    const textSplittedByGV = fs.readFileSync("resp", "utf-8").split('"url"')
    textSplittedByGV.forEach(element => {
        console.log(element.split('"')[1]);
    });
}

app.get('/getGVid/:id', (req, res) => {
    const url = "https://yt5s.com/api/ajaxSearch"
    const options = {
        url: url,
        method: 'POST',
        headers: {
            'Host': 'yt5s.com',
            'User-Agent': 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 98.0) Gecko / 20100101 Firefox / 98.0',
            'Accept': "*/*",
            'Accept-Language': 'en-GB,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Length': '65',
            'Origin': 'https://yt5s.com',
            'Alt-Used': 'yt5s.com',
            'Connection': 'keep-alive',
            'Referer': 'https://yt5s.com/en59',
            'Cookie': '_ga=GA1.2.115760330.1643119747; __atuvc=6%7C4%2C0%7C5%2C0%7C6%2C0%7C7%2C1%7C8; _gid=GA1.2.1260849973.1645486509; __cflb=0H28v43enqchLaHs3rxJBVssg17Z5n6MvJkvbYf79ho; _gat_gtag_UA_122831834_4=1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'TE': 'trailers'
        },

        body: "q=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DidX-x5W5O30&vt=home"
    };
    console.log(options.body);
    
    const apiConnection = axios.create({
        timeout: 1000
    })
    apiConnection.interceptors.request.use(request => {
        console.log('Starting Request', request)
        return request
    })
    apiConnection.interceptors.response.use(response => {
        //console.log('Response:', response)
        return response
    })
    apiConnection.post(url, options)
        .then(response => {
            return response.data
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log("That didn't work\n" + error);
        })
    res.send("huhn")
})



const port = 4000
app.listen(port, () => {
    timelog(`listening at http://localhost:${port}`);
});







































/* Authorsearch. Abandoned because also possible in browser and my Server is literally a Raspi.
app.get("/authorsearch", (req, res) => {
  currentauth = req.query.q;
  console.log(
    '"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' +
      currentauth +
      '&utf8=&format=json"'
  );
  fetch(
    "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
      currentauth +
      "&utf8=&format=json"
  )
    .then((resp) => resp.json())
    .then((resp) => {
      author = Object.values(resp.query.search)[0].title;
      if (typeof author !== "undefined") {
        return author;
      } else {
        throw new Error("Nothing found!");
      }
    })
    .then((author) => {
      authorname = console.log(
        '"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=' +
          author +
          '&format=json"'
      );
      return fetch(
        "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=" +
          author +
          "&format=json"
      );
    })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log((resp = Object.values(resp.query.pages)[0].pageimage));
      if (typeof resp !== "undefined") {
        fetch(
          "https://en.wikipedia.org/w/api.php?action=query&prop=info&titles=" +
            author +
            "&inprop=url&format=json"
        )
          .then((resp) => resp.json())
          .then((erg) => {
            author = Object.values(erg.query.pages)[0]
            response = {
              name: author.title,
              src: "https://commons.wikimedia.org/wiki/Special:FilePath/" + resp,
              link: author.fullurl
            };
            res.json(response);
          })
      } else {
        console.log('Debug 1')
        res.json();
      }
    })
    .catch((err) => console.log(err));
});
*/
