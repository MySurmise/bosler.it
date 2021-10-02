const cheerio  = require('cheerio');
const { cloneNode } = require('domhandler');
const fetch = require('node-fetch');
const got = require('got')

url = "https://www.amazon.de/s?k=The+God+Delusion"
/*
fetch(url).then((resp) => {
    resp.json()
}).then(resp => console.log(resp))
*/

huhn = async () => {
    try {
        const resp = await got(url)
        console.log(resp.body)
    } catch (error) {
        console.log(error)
    }
}

huhn()
