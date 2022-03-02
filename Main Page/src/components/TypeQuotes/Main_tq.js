import React from 'react'
import clip from "public/TypeQuotes/Images/clip.png";
import "styles/TypeQuotes/style.css";

function Main_tq(props) {
  document.title = "TypeQuotes"
  document.body.classList.add("coloredBody")

  return (
    <div>
      <nav><a href="/">
        <img class="logo" src={clip} alt="TypeQuotes Logo"></img>
      </a>
        <div class="navbar" target="_blank" title="Go to TypeQuotes Home">
          <a href="/">
          <p class="titlename typing">TypeQuotes</p>
          <p></p></a>
          <div class="navlinks">
            <a class="navlinkitem" href="https://bosler.it"> Home</a>
            <a class="navlinkitem"> Start Multiplayer</a>
            <a class="navlinkitem" href="/newsingle"> Start Singleplayer</a>
            <a class="navlinkitem" href="/addnew"> Add new</a>
          </div>
        </div>
      </nav>
      {props.children}
    </div>
  )
}

export default Main_tq