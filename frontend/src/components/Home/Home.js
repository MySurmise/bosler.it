import React from "react";
import "styles/App.css";
import Navbar from "components/Navbar/Navbar";
import Logos from "./Logos";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import MeDescription from "./MeDescription";

function Home() {

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

      <MeDescription />
    </div>
  );
}

export default Home;
