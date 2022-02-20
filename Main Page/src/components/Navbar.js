import React, { Component } from "react";
import ProjectButton from "./ProjectButton";
import styles from "./../styles/Navbar.module.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.projectButtonBar = {
      overflow: "visible",
      width: "100%",
      paddingTop: "0.5vmax",
      height: "8vmin",
      display: "block-inline",
      position: "sticky",
      top: "0vmax",
      zIndex: "10",
      pointerEvents: "none",
    };
  }

  render() {
    return (
      <h1 className={styles.navbar}>
        <div style={this.projectButtonBar}>
          <ProjectButton text="TypeQuotes" pos={1} link="https://tq.bosler.it" />
        </div>
        <div style={this.projectButtonBar}>
          <ProjectButton text="Relations" pos={2} link="relations" />
          <ProjectButton text="MathTools" pos={3} link="mathtools" />
        </div>
        <div style={this.projectButtonBar}>
          <ProjectButton text="Sandbox" pos={4} link="sandbox" />
          <ProjectButton text="YTExtractor" pos={5} link="ytex" />
        </div>
      </h1>
    );
  }
}

export default Navbar;
