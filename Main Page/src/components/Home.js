import React from "react";
import "../styles/App.css";
import Navbar from "./Navbar";
import Logos from "./Logos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Test from "./Test";

function Home() {
  console.log("Send request")
  
 
  
  return (
    <div className="App">
      <Navbar />
      <Logos logos={["gh", "li"]} />

      <h1 className="backgroundHeading">bosler.IT</h1>
      <FontAwesomeIcon
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }}
        className="arrowAtBottom"
        icon={faAngleDown}
      />

      <Test />
    </div>
  );
}

export default Home;
