var express = require('express');
var path = require('path');
var cors = require('cors');
var https = require('https');
var http = require('http');
var fs = require('fs');
var exec = require("child_process").exec;
var app = express();
var timelog = function (objectToLog) {
    var currentTime = new Date(Date.now());
    if (typeof objectToLog == "string" || typeof objectToLog == "undefined") {
        console.log("[" + ("" + currentTime).split(" ").slice(1, 5).join(" ") + "] " + objectToLog);
    }
    else {
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
app.use(cors({ credentials: true, origin: true }));
app.use((req,res,next) => {
  timelog(req.url)
  next()
})

app.get("/playlistValues/:link",
  function (req, res) {
    
  var returnTitles = function (error, stdout, stderr) {
    if (error) {
      console.log("error: ".concat(error.message));
      return;
    }
    if (stderr) {
      console.log("stderr: ".concat(stderr));
      return;
    }
    console.log(stdout)
    res.send(stdout)
  };
    var options = {
      maxBuffer: 1024 * 1000,
      //shell: "/usr/local/bin/fish"
    }
  /*
  if (process.platform == "linux") {
    options = {
      shell: "/usr/local/bin/fish "
    }
  }
  */
    console.log(`Executing command "yt-dlp -j  --flat-playlist --skip-download ${req.params.link}"`)

    const child = exec(`yt-dlp -j  --flat-playlist --skip-download ${req.params.link}`,
      options);
    //child.stdout.pipe(process.stdout)
    var output = ""
    child.stdout.on('data', function (data) {
      res.write(data.toString())
    });
    child.on('exit', () => {
      res.end()
    })
});
var port = 3000;
/*

app.listen(port, () => {
    timelog(`listening at http://localhost:${port}`);
});
*/
try {
  var server = https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/bosler.it-0001/privkey.pem", 'utf8'),
    cert: fs.readFileSync("/etc/letsencrypt/live/bosler.it-0001/fullchain.pem", 'utf8')
  }, app);
  console.log("Creating https Server")
} catch {
  try {
    var server = https.createServer({
      key: fs.readFileSync("/home/ubuntu/keys/bosler.it-0001/privkey3.pem", 'utf8'),
      cert: fs.readFileSync("/home/ubuntu/keys/bosler.it-0001/fullchain3.pem", 'utf8')
    }, app);
    console.log("Creating https Server")
  } catch (exc) {
    console.log(exc)
    var server = http.createServer(app)
    console.log("Creating http Server")
  }
}
server.listen(port);
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
