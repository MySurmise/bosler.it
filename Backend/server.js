const express = require("express");
const pug = require("pug");
const app = express();
const port = 5000;
const path = require("path");
const fs = require("fs");
const dbm = require("better-sqlite3");
const util = require("util");
const langdetect = require("langdetect");
const wiki = require("wikijs").default;
const fetch = require("node-fetch");

const timelog = (objectToLog) => {
  currentTime = new Date(Date.now());
  if (typeof objectToLog == "string" || typeof objectToLog == "undefined") {
    console.log(
      "[" +
        ("" + currentTime).split(" ").slice(1, 5).join(" ") +
        "] " +
        objectToLog
    );
  } else {
    console.log(
      "[" + ("" + currentTime).split(" ").slice(1, 5).join(" ") + "] "
    );
    console.log(objectToLog);
  }
};

app.set("view engine", "pug");
app.set("views", __dirname + "/files/Design/views");
app.use(express.static(path.join(__dirname, "files")));

const db = new dbm(path.join(__dirname, "files/Quotes/DB/Quotes.db"), {
  verbose: timelog,
  fileMustExist: true,
});
var quoteids = new Set();

app.get(["/", "/newsingle"], (req, res) => {
  randomQuote = db
    .prepare("SELECT quoteid FROM Quotes ORDER BY RANDOM() LIMIT 1")
    .get();
  res.redirect("/quote/" + randomQuote.quoteid);
});

app.get("/addnew", (req, res) => {
  console.log("Addnew");
  authors = db.prepare("select distinct authorname from quotes").all();
  authorArray = [];
  authors.forEach((entry) => {
    authorArray.push(entry.authorname);
  });
  console.log(authorArray);
  res.render("pug/addnew.pug", { authorArray });
});

app.get("/search", (req, res) => {
  console.log(req.query.query);
  res.json(langdetect.detect(req.query.query));
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

app.get("/quote/:quoteid([0-9]+)", (req, res) => {
  timelog("Received GET Request for quote " + req.params.quoteid);
  /*
    quoteData = JSON.parse(fs.readFileSync(path.join(__dirname, 'files/Quotes/quote.json'), 'utf8'))
    
    authorurl: quoteData.authorurl,
      authorimg: quoteData.authorimg,
      originurl: quoteData.originurl,
      originimg: quoteData.originimg,
      text: quoteData.text,
      authorname: quoteData.authorname,
      quoteurl: "/quote/" + req.params.quoteid
      */

  quoteData = db
    .prepare(
      util.format("select * from Quotes where quoteid = %d", req.params.quoteid)
    )
    .get();
  if (typeof quoteData === "undefined") {
    res.render("pug/quotetyping", {
      text: "This quote is not available. Come not back later.",
      authorname: "- The Creator (Not Tyler)",
      quoteurl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    });
    return;
  }
  quoteData.quoteurl = req.url;
  timelog(quoteData);
  res.render("pug/quotetyping", quoteData);
});

app.listen(port, () => {
  timelog(`listening at http://localhost:${port}`);
});
