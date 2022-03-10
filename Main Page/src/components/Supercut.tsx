import React from 'react'
import { useParams } from 'react-router-dom';

function Supercut() {
  let ID = useParams()['id'];
  if (typeof (ID) == "string") {
    fetch(`https://bosler.it:3000/playlistValues/${encodeURIComponent(ID)}`)
      .then(o => o.text())
      .then(o => console.log(o))
      .catch(ex => { console.log(ex) })
  }
    return (
      <div>Supercut</div>
    )
}

export default Supercut