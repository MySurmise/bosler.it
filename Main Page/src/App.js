import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "components/Home";
import Mathtools from "components/Mathtools";
import Relations from "components/Relations";
import Sandbox from "components/Sandbox";
import YTExtractor from "components/YTExtractor";
import VideoMenu from "components/VideoMenu";
import Supercut from "components/Supercut";
import Main_tq from "components/TypeQuotes/Main_tq"
import Quotetyping_tq from "components/TypeQuotes/Quotetyping_tq"
import "styles/App.css";
import { useState } from "react";

function App() {
  const host = window.location.hostname;
  let subdomain = "";
  let splittedHost = host.split(".");

  if (splittedHost.length !== 1) {
    if (splittedHost[splittedHost.length - 1] == "localhost") {
      subdomain = splittedHost.slice(0, -1).join(".");
    } else {
      subdomain = splittedHost.slice(0, -2).join(".");
    }
  } 



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
            <Route path="/supercut/:id" element={<Supercut />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/relations" element={<Relations />} />
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
