import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "components/Home/Home";
import Mathtools from "components/Mathtools/Mathtools";
import Relations from "components/Relations";
import Sandbox from "components/Sandbox";
import YTExtractor from "components/VideoTools/YTExtractor";
import VideoMenu from "components/VideoTools/VideoMenu";
import Supercut from "components/VideoTools/Supercut";
import Main_tq from "components/TypeQuotes/Main_tq"
import Quotetyping_tq from "components/TypeQuotes/Quotetyping_tq"
import "styles/App.css";
import { useState } from "react";
import TsTest from "components/misc/TsTest";
import { useEffect } from "react";

function App() {
  const host = window.location.hostname;
  let subdomain = "";
  let splittedHost = host.split(".");

  if (splittedHost.length !== 1) {
    if (splittedHost[splittedHost.length - 1] === "localhost") {
      subdomain = splittedHost.slice(0, -1).join(".");
    } else {
      subdomain = splittedHost.slice(0, -2).join(".");
    }
  } 

  useEffect(() => {    
    document.title = `bosler.it - Marius Bosler`;
  }, []);


  switch (subdomain) {
    case "tq":
      return (
        <Router>
          <Routes>
            <Route path="" element={<Main_tq />} />
            <Route path="/quote/:quoteid" element={<Quotetyping_tq />} />
          </Routes>
        </Router>
      )
    case "":
      return (
        <Router>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/mathtools" element={<Mathtools />} />
            <Route path="/videoTools" element={<VideoMenu />} />
            <Route path="/transcribe/:id" element={<YTExtractor />} />
            <Route path="/supercut/:link" element={<Supercut />} />
            <Route path="/supercut" element={<Supercut />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/relations" element={<Relations />} />
            <Route path="/tstest" element={<TsTest />} />
          </Routes>
        </Router>
      );
    default:
      let url = window.location.href
      window.location = url.replace(subdomain + ".", "")
      return null;
  }
}

export default App;
