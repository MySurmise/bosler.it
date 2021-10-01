const express = require("express");
const pug = require("pug");
const path = require("path");
const fs = require("fs");
const dbm = require("better-sqlite3");
const util = require("util");
const langdetect = require("langdetect");
const wiki = require("wikijs").default;
const fetch = require("node-fetch");
const { time } = require("console");
const https = require("https")
const os = require("os")
const crypto = require("crypto");
const { send } = require("process");

const app = express();
const timelog = (objectToLog) => {
  currentTime = new Date(Date.now());
  if (typeof objectToLog == "string" || typeof objectToLog == "undefined") {
    console.log("[" + ("" + currentTime).split(" ").slice(1, 5).join(" ") + "] " + objectToLog);
  } else {
    console.log("[" + ("" + currentTime).split(" ").slice(1, 5).join(" ") + "] ");
    console.log(objectToLog);
  }
};

app.set("view engine", "pug");
app.set("views", __dirname + "/files/Design/views");
app.use(express.static(path.join(__dirname, "files/public")));

const db = new dbm(path.join(__dirname, "files/Quotes/DB/Quotes.db"), {
  verbose: timelog,
  fileMustExist: true,
});

const insertIntoQuotes = (quoteObject) => {
  console.log(quoteObject)
  console.log(util.format(`insert into Quotes (lang, text, authorname, authorimg, authorurl, originurl, originimg) 
    values(
    '%s',   // lang
    '%s',   // text
    '%s',   // authorname
    '%s',   // authorimg
    '%s',   // authorurl
    '%s',   // originurl
    '%s'    // originimg
    )`, quoteObject.lang, quoteObject.text, quoteObject.authorname, quoteObject.authorimg, quoteObject.authorurl,
    quoteObject.originurl, quoteObject.originimg))

  db.prepare(
    util.format("insert into Quotes (lang, text, authorname, authorimg, authorurl, originurl, originimg) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s')",
     quoteObject.lang, quoteObject.text, quoteObject.authorname, quoteObject.authorimg, quoteObject.authorurl,
      quoteObject.originurl, quoteObject.originimg)
  ).run()
}



const insertIntoQuoteQueue = (quoteObject) => { //WARNING! Queue!!
  queuedb = new dbm(path.join(__dirname, "files/Quotes/DB/queuedb.db"), {
    verbose: timelog,
  });
	console.log(path.join(__dirname, "files/Quotes/DB/queuedb.db"))
  console.log(quoteObject)
  console.log(util.format(`insert into Quotes (lang, text, authorname, authorimg, authorurl, originurl, originimg) 
    values(
    '%s',   // lang
    '%s',   // text
    '%s',   // authorname
    '%s',   // authorimg
    '%s',   // authorurl
    '%s',   // originurl
    '%s'    // originimg
    )`, quoteObject.lang, quoteObject.text, quoteObject.authorname, quoteObject.authorimg, quoteObject.authorurl,
    quoteObject.originurl, quoteObject.originimg))

  queuedb.prepare(
    util.format("insert into Quotes (lang, text, authorname, authorimg, authorurl, originurl, originimg) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s')",
      quoteObject.lang, quoteObject.text, quoteObject.authorname, quoteObject.authorimg, quoteObject.authorurl,
      quoteObject.originurl, quoteObject.originimg)
  ).run()
}


var quoteids = new Set();

app.get(["/", "/newsingle"], (req, res) => {
  randomQuote = db.prepare("SELECT quoteid FROM Quotes ORDER BY RANDOM() LIMIT 1").get();
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

app.get("/.well-known/acme-challenge/6s36QDvfVYI-Ma9wV2lctR2wQw9_RqzYEgT7AmHV9HI", (req, res) => {
  res.send("6s36QDvfVYI-Ma9wV2lctR2wQw9_RqzYEgT7AmHV9HI.T8nJYvuumLTvxwQgP7c74XuRyvEYJmqGKT5VyU-pcU0");
});


app.get("/quote/:quoteid([0-9]+)", (req, res) => {
  timelog("Received GET Request for quote " + req.params.quoteid);


  quoteData = db.prepare(util.format("select * from Quotes where quoteid = %d", req.params.quoteid)).get();
  if (typeof quoteData === "undefined") {
    res.render("pug/quotetyping", {
      text: "This quote is not available. Come not back later.",
      authorname: "- The Creator (Not Tyler)",
      quoteurl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    });
    return;
  }

  quoteData.quoteurl = req.url;
  if (quoteData.authorimg == "" || quoteData.authorimg == null) {
    quoteData.authorimg = "/defaultauthor.png";
  }
  if (quoteData.originimg == "" || quoteData.originimg == null) {
    quoteData.originimg = "/defaultorigin.png";
  }
  timelog(quoteData);
  res.render("pug/quotetyping", quoteData);
});

app.get('/submit', (req, res) => {
  	newquote = {}
	Object.keys(req.query).forEach((value) => {
		console.log(req.query[value], req.query)
		console.log(typeof( req.query[value]))

		newquote[value] = req.query[value]
			.replaceAll("'", "''")
			.replaceAll("\n", " ")
			.replaceAll("\r", " ")
			.replaceAll("  ", " ")
			.replaceAll("  ", " ")
			.replaceAll("  ", " ")
			.replaceAll("‘", "\'")
			.replaceAll("“", '"')
			.replaceAll("”", '"')
			.replaceAll("„", '"')
			.replaceAll("’", '"')			
			.replaceAll("‚", '"')			
			.replaceAll("`", '"')
			.replaceAll("'", "\'")

	})
	if (crypto.createHash('sha256').update(req.query.commitpass).digest('base64') == "YaEktf/spITQaDGuMHjO0xWBkVIwS9ncEpZ1KvlvMKs=") {
	
    insertIntoQuotes(newquote)
    res.redirect("success")
  } else {
    insertIntoQuoteQueue(newquote)
    res.redirect("enqueued")
  }
})

app.get('/success', (req, res) => {
    res.render("pug/success")
})

app.get('/enqueued', (req, res) => {
    res.render("pug/enqueued")
})






















if (!os.release().endsWith('WSL2')) {
  const port = 80
  app.listen(port, () => {
    timelog(`listening at http://quote.ddns.net:${port}`);
  });

  https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/archive/quote.ddns.net/privkey1.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/archive/quote.ddns.net/cert1.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/archive/quote.ddns.net/chain1.pem")
  }, app).listen(443);
  timelog(`listening at https://quote.ddns.net:${443}`);

} else {
  const port = 5000
  app.listen(port, () => {
    timelog(`listening at http://localhost:${port}`);
  });
}







































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
