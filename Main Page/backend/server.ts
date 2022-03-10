const express = require('express')
const path = require('path')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const { exec } = require("child_process");


const app = express();
const timelog = (objectToLog: string) => {
    const currentTime = new Date(Date.now());
    if (typeof objectToLog == "string" || typeof objectToLog == "undefined") {
        console.log("[" + ("" + currentTime).split(" ").slice(1, 5).join(" ") + "] " + objectToLog);
    } else {
        console.log("[" + ("" + currentTime).split(" ").slice(1, 5).join(" ") + "] ");
        console.log(objectToLog);
    }
};

/*
app.use(function (request, response, next) {

    if (request.secure) {
        console.log(request.headers.host)
        console.log(request.url)

        return response.redirect(301, "http://" + request.headers.host.replace('www.', '') + request.url);
    }

    next();
})
*/

app.use(cors({ credentials: true, origin: true }))


app.get("/playlistValues/:id", (req: { params: { id: string | any[] } }, res: any) => {
  const returnTitles: any = (error: { message: any }, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log(`stdout: ${stdout}`)
  }
  
  if (req.params.id.length == 11) {
    exec(`yt-dlp -j  --flat-playlist --skip-download 'https://youtu.be/${req.params.id}'`, returnTitles);
  } else {
    exec(`yt-dlp -j  --flat-playlist --skip-download 'https://youtube.com/playlist?list=${req.params.id}'`,
      returnTitles);
  }
})

const port = 3000
/*
app.listen(port, () => {
    timelog(`listening at http://localhost:${port}`);
});
*/

const server = https.createServer({
  key: fs.readFileSync(`/etc/letsencrypt/live/bosler.it-0001/privkey.pem`, 'utf8'),
  cert: fs.readFileSync(`/etc/letsencrypt/live/bosler.it-0001/fullchain.pem`, 'utf8')
}, app);

server.listen(port)






































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
