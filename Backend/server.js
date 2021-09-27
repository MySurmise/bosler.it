const express = require("express")
const pug = require("pug")
const app = express()
const port = 5000
const path = require("path")
const fs = require("fs")
const dbm = require("better-sqlite3")
const util = require("util")



app.set('view engine', 'pug')
app.set('views', __dirname + "/files/Design/views")
app.use(express.static(path.join(__dirname, 'files')))
const db = new dbm(path.join(__dirname, 'files/Quotes/DB/Quotes.db'), { verbose: console.log, fileMustExist: true })
var quoteids = new Set()

app.get(/\/(newsingle)?$/, (req, res) => {

  randomQuote = db.prepare(util.format('SELECT quoteid FROM Quotes ORDER BY RANDOM() LIMIT 1')).get()
  res.redirect('/quote/' + randomQuote.quoteid)
})
 
app.get('/quote/:quoteid([0-9]+)', (req, res) => {
  currentTime = new Date(Date.now())

  console.log("[" + ("" + currentTime).split(" ").slice(1, 5).join(" ") + "] " + "Received GET Request for quote " + req.params.quoteid)
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
  

  quoteData = db.prepare(util.format('select * from Quotes where quoteid = %d', req.params.quoteid)).get()
  if (typeof (quoteData) === 'undefined') {
    res.render('pug/quotetyping', {text: "Quote not available."})
    return
  }
  console.log(quoteData)
  res.render('pug/quotetyping', quoteData)
})    
 
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})