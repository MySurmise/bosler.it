import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
import Mathtools from "./components/Mathtools";
import Relations from "./components/Relations";
import Sandbox from "./components/Sandbox";
import YTExtractor from "./components/YTExtractor";
import VideoMenu from "./components/VideoMenu";
import Supercut from "./components/Supercut";

import './styles/App.css';

function App() {
  console.log(window.location)
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/mathtools" element={<Mathtools/>} />
        <Route path="/videoTools" element={<VideoMenu/>} />
        <Route path="/transcribe/:id" element={<YTExtractor/>} />
        <Route path="/supercut/:id" element={<Supercut/>} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/relations" element={<Relations/>} />
      </Routes>
    </Router>
  );
}

export default App;
