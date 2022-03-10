import React from "react";
import Main_tq from "./Main_tq";
import { useParams } from "react-router-dom";



function Quotetyping_tq() {
  var quoteData;
  
/*
    const db = new sqlite3.Database("public/TypeQuotes/Quotes/DB/Quotes.db",
    {
        verbose: timelog,
        fileMustExist: true,
    });

    let quoteid = useParams()['quoteid'];
    let quoteData = db.prepare(util.format("select * from Quotes where quoteid = %d", req.params.quoteid)).get();
  
    if (typeof quoteData === "undefined") {
        quoteData = {
            text: "This quote is not available. Come not back later.",
            authorname: "- The Creator (Not Tyler)",
            quoteurl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        }
    }

    quoteData.quoteurl = req.url;
    if (quoteData.authorimg == "" || quoteData.authorimg == null) {
        quoteData.authorimg = "/defaultauthor.png";
    }
    if (quoteData.originimg == "" || quoteData.originimg == null) {
        quoteData.originimg = "/defaultorigin.png";
    }
    timelog(quoteData);
*/
  return (
    <div>
      <Main_tq />
      <noscript>
        <p class="noscript">Site needs JavaScript Support!</p>
      </noscript>
      <div id="gamingfield">
        <div id="stats">
          <div id="progressbar">
            <div id="progressfinished"></div>
            <div id="progresscircle"></div>
          </div>
          <div id="accuracy">
            <span id="accuracynumber">69</span>% <span class="acc">ACC</span>
          </div>
          <div id="speed">
            <span id="speednumber">420</span>
            <span class="wpm"> </span>WPM
          </div>
        </div>
        <div id="quotearea">
          <a id="authorurl">
            <img id="authorimg" />
          </a>
          <a id="originurl">
            <img id="originimg" />
          </a>
          <div id="textarea">
            <span id="finishedandcurrent">
              <span id="rightfinished"></span>
              <span id="rightcurrent"></span>
              <span id="wrongcurrent"></span>
              <span id="unfinishedcurrent"> </span>
            </span>
                      <span id="unfinished">{ quoteData.text }</span>
          </div>
          <div id="authorname"></div>
          <a id="restartlink">
            <div id="restart">
              <img id="restartarrow" src="../../Images/restart.svg" />
            </div>
          </a>
          <a id="nextquotelink" href="/newsingle">
            <div id="next">
              <img id="nextarrow" src="../../Images/next.svg" />
            </div>
          </a>
        </div>
        <input id="inputfield" />
      </div>
    </div>
  );
}

export default Quotetyping_tq;
