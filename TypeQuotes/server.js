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
const spawn = require("child_process").spawn;
const upload = require("express-fileupload");
const { render } = require("mustache");

// Standard function from the documentation. Works a treat.
const convert = async (file, output, preset) => {
  const converter = new pdftohtml(file, output)

  // If you would like to tap into progress then create
  // progress handler
  converter.progress((ret) => {
    const progress = (ret.current * 100.0) / ret.total

    console.log(`${progress} %`)
  })

  try {
    // convert() returns promise
    await converter.convert(preset || 'ipad')
  } catch (err) {
    console.error(`Psst! something went wrong: ${err.msg}`)
  }

}


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
app.use(upload())

const db = new dbm(path.join(__dirname, "files/Quotes/DB/Quotes.db"), {
  verbose: timelog,
  fileMustExist: true,
});

const insertIntoQuotes = (quoteObject) => {
  timelog(quoteObject)
  timelog(util.format(`insert into Quotes (lang, text, authorname, authorimg, authorurl, originurl, originimg)
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
  timelog(path.join(__dirname, "files/Quotes/DB/queuedb.db"))
  timelog(quoteObject)
  timelog(util.format(`insert into Quotes (lang, text, authorname, authorimg, authorurl, originurl, originimg)
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
app.get("/", (req, res) => {
  res.render("pug/layouts/main.pug")
});

app.get("/newsingle", (req, res) => {
  randomQuote = db.prepare("SELECT quoteid FROM Quotes ORDER BY RANDOM() LIMIT 1").get();
  res.redirect("/quote/" + randomQuote.quoteid);
});

app.get("/addnew", (req, res) => {
  timelog("Addnew");
  authors = db.prepare("select distinct authorname from quotes").all();
  authorArray = [];
  authors.forEach((entry) => {
    authorArray.push(entry.authorname);
  });
  searchengines = ["Amazon"]
  timelog(authorArray);
  res.render("pug/addnew.pug", { authorArray, searchengines });
});

app.get("/search", (req, res) => {
  timelog(req.query.query);
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
    timelog(req.query[value], req.query)
    timelog(typeof (req.query[value]))

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
      .replaceAll("’", "'")
      .replaceAll("‚", '"')
      .replaceAll("`", '"')
      .replaceAll("'", "\'")
      .replaceAll("…", "...")

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

app.get('/amazingsearch', (req, res) => {
  timelog(req.query)

  const pythonProcess = spawn('python3 ' + __dirname + "/files/Javascript/amazonsearcher.py " + req.query.lang + " " + req.query.q, { shell: true })

  timelog(('python3 ' + __dirname + "/files/Javascript/amazonsearcher.py " + req.query.lang + " " + req.query.q))
  pythonProcess.stdout.pipe(process.stdout)
  pythonProcess.stderr.pipe(process.stderr);
  pythonProcess.stdout.on('data', (data) => {
    timelog(data.toString().replaceAll("'", '"'))
    responsejson = JSON.parse(data.toString().replaceAll("'", '"'))
    res.json(responsejson)
    pythonProcess.kill('SIGINT')
  })
})

app.get('/newquotes', (req, res) => {
  if (typeof (queuedb) == "undefined") {
    queuedb = new dbm(path.join(__dirname, "files/Quotes/DB/queuedb.db"), {
      verbose: timelog,
    });
  }
  if (req.query.key) {
    fs.readFile("files/key.txt", 'utf8', (err, data) => {
      key = data.toString()
      if (req.query.key == key) {
        if (req.query.quoteid) {
          timelog(quoteData)
          if (req.query.approve == "true") {
            try {
              delete quoteData.quoteid
            } finally {
              timelog("Deleted")
            }
            insertIntoQuotes(quoteData)
            queuedb.prepare("delete from Quotes where quoteid=" + req.query.quoteid).run();
            timelog("approved", req.query.quoteid)
            res.redirect("/newquotes?key=" + key)
            return
          } else {
            queuedb.prepare("delete from Quotes where quoteid=" + req.query.quoteid).run();
            timelog("not approved", req.query.quoteid)
            res.redirect("/newquotes?key=" + key)
            return
          }
        }

        quoteData = queuedb.prepare("select * from Quotes").get();
        res.render("pug/newquotesproof", quoteData)
      } else {
        attempted = true
        res.render("pug/newquotes", { attempted })
      }
    })
  } else {
    attempted = false
    res.render("pug/newquotes", { attempted })
  }
})

app.get('/pdf', (req, res) => {
  res.render('pug/pdf.pug')
})

app.get('/last', (req, res) => {
  res.sendFile(__dirname + '/files/pdf/Output/' + count + ".html")
  delete count
})


app.post('/pdfupload', function (req, res) {
  let PDF;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  PDF = req.files.PDF;
  directory = fs.readdirSync('./files/pdf/pdf-documents/')
  count = parseInt(directory[0].slice(6))
  uploadPath = __dirname + '/files/pdf/pdf-documents/' + count + ".pdf"
  fs.rename(__dirname + '/files/pdf/pdf-documents/.count' + count, __dirname + '/files/pdf/pdf-documents/.count' + (count + 1), (err) => { if (err) console.log(err) })
  if (directory.length > 10) {
    output = fs.readdirSync(__dirname + '/files/pdf/Output/')
    try {
      output.splice(output.indexOf(".gitkeep"), 1)
    } catch { }
    output.sort(function (a, b) {
      return parseInt(a) - parseInt(b);
    });
    output.slice(0, -5).forEach((file) => {
      fs.unlink(__dirname + '/files/pdf/Output/' + file, (err) => { if (err) console.log(err) })
    })
    try {
      directory.splice(output.indexOf(".gitkeep"), 1)
    } catch { }
    directory.sort(function (a, b) {
      return parseInt(a) - parseInt(b);
    });
    directory.slice(1, -5).forEach((file) => {
      fs.unlink(__dirname + '/files/pdf/pdf-documents/' + file, (err) => { if (err) console.log(err) })
    })
  }



  PDF.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);
    const convertion = spawn("pdf2htmlEX " + __dirname + "/files/pdf/pdf-documents/" + count + ".pdf  --dest-dir " + __dirname + "/files/pdf/Output/", { shell: true })
    console.log("pdf2htmlEX " + __dirname + "/files/pdf/pdf-documents/" + count + ".pdf  --dest-dir " + __dirname + "/files/pdf/Output/")
    convertion.stdout.pipe(process.stdout)
    convertion.stderr.pipe(process.stderr);
    convertion.on('exit', () => {
      convertion.kill('SIGINT')
      res.render('pug/pdfwrite.pug')
    })

  })

});


















if (!os.release().endsWith('WSL2')) {
  const port = 80
  app.listen(port, () => {
    timelog(`listening at http://quote.ddns.net:${port}`);
  });

  https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/archive/bosler.it/privkey1.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/archive/bosler.it/cert1.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/archive/bosler.it/chain1.pem")
  }, app).listen(443);
  timelog(`listening at https://bosler.it:${443}`);

} else {
  const port = 5000
  app.listen(port, () => {
    timelog(`listening at http://localhost:${port}/pdf`);
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
