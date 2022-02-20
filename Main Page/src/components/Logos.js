import React from "react";
import logosCSS from "../styles/logosCSS.module.css";
import githubLogo from "../public/mainPage/github.png";
import linkedInLogo from "../public/mainPage/linkedin.png";

function Logos(props) {
  const logos = props.logos;
  return (
    <div className={logosCSS.logoContainer}>
      {logos.map((name) => {
        switch (name) {
          case "li":
            return(
            <a href={"https://github.com/MySurmise"}>
              <img className={logosCSS.logos} src={linkedInLogo} alt="LINKEDIN"></img>
              </a>
            );
          case "gh":
            return (
              <a href={"https://github.com/MySurmise"}>
                <img className={logosCSS.logos} src={githubLogo} alt="GITHUB"></img>
              </a>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default Logos;
