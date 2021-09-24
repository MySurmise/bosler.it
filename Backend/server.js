const express = require("express")
const pug = require("pug")
const app = express()
const port = 3000
const path = require("path") 

app.set('view engine', 'pug')
app.set('views', __dirname + "/files/Design/views")
app.use(express.static(path.join(__dirname, 'files')))

app.get('/quote/:quoteid([0-9]+)', (req, res) => {
  res.render( 'pug/quotetyping')
})    

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/quote/2`)
})