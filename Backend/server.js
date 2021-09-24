const express = require("express")
const pug = require("pug")
const app = express()
const port = 3000
const path = require("path")
const fs = require("fs")




app.set('view engine', 'pug')
app.set('views', __dirname + "/files/Design/views")
app.use(express.static(path.join(__dirname, 'files')))

app.get('/quote/:quoteid([0-9]+)', (req, res) => {

  console.log("Received GET Request for quote " + req.params.quoteid)

  quoteData = JSON.parse(fs.readFileSync('files/Quotes/quote.json', 'utf8'))

  
  res.render('pug/quotetyping', {
    authorurl: quoteData.authorurl,
    authorimg: quoteData.authorimg,
    originurl: quoteData.originurl,
    originimg: quoteData.originimg,
    text: quoteData.text,
    authorname: quoteData.authorname,
    quoteurl: "/quote/" + req.params.quoteid
  })
})    
 
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}/quote/2`)
})