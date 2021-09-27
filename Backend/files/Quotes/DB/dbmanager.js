dbm = require("better-sqlite3")
path = require("path")
util = require("util")
const db = new dbm(path.join(__dirname, 'Quotes.db'), { verbose: console.log,  fileMustExist: true})
//db.prepare('create table Quotes(quoteid INT NOT NULL PRIMARY KEY, text VARCHAR(1000))').run()

// lang = language code, standardized after ISO 639-1, (only two letters)


const insertIntoQuotes = (lang, text, authorname, authorimg, authorurl, originurl, originimg) => {
    console.log(util.format(`insert into Quotes (lang, text, authorname, authorimg, authorurl, originurl, originimg) 
    values(
    '%s',   // lang
    '%s',   // text
    '%s',   // authorname
    '%s',   // authorimg
    '%s',   // authorurl
    '%s',   // originurl
    '%s'    // originimg
    )`, lang, text, authorname, authorimg, authorurl, originurl, originimg))

    db.prepare(
        util.format("insert into Quotes (lang, text, authorname, authorimg, authorurl, originurl, originimg) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s')",
            lang, text, authorname, authorimg, authorurl, originurl, originimg)
    ).run()
}
const stmt2 = db.prepare('select * from Quotes').all()
console.log(typeof(stmt2))
insertIntoQuotes(   
    lang = "de",
    text = " Das bin ich nicht gewöhnt, ich kann mich nicht bequemen, Den Spaten in die Hand zu nehmen. Das enge Leben steht mir gar nicht an.",
    authorname = "Johann Wolfgang von Goethe",
    authorimg = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Goethe_%28Stieler_1828%29.jpg/486px-Goethe_%28Stieler_1828%29.jpg",
    authorurl = "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
    originurl = "https://www.amazon.de/Faust-Trag%C3%B6die-Zweiter-Reclams-Universal-Bibliothek/dp/315014048X/ref=asc_df_315014048X/",
    originimg = "https://m.media-amazon.com/images/P/B079H2LR7J.01._SCLZZZZZZZ_SX500_.jpg"
) 
