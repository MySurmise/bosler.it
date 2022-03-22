import React from 'react'
import clip from "public/TypeQuotes/Images/clip.png";
import "styles/TypeQuotes/style.css";

function Main_tq(props) {
  document.title = "TypeQuotes"
  document.body.classList.add("coloredBody")

  return (
    <div>
      <nav><a href="/">
        <img className="logo" src={clip} alt="TypeQuotes Logo"/>
      </a>
        <div className="navbar" target="_blank" title="Go to TypeQuotes Home">
          <a href="/">
          <p className="titlename typing">TypeQuotes</p>
          <p/></a>
          <div className="navlinks">
            <a className="navlinkitem" href="https://bosler.it"> Home</a>
            <a className="navlinkitem"> Start Multiplayer</a>
            <a className="navlinkitem" href="/newsingle"> Start Singleplayer</a>
            <a className="navlinkitem" href="/addnew"> Add new</a>
          </div>
        </div>
      </nav>
      {props.children}
    </div>
  )
}

export default Main_tq