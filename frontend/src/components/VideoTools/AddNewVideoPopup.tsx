import React, {FunctionComponent, useState} from 'react';
import styles from './Supercut.module.css'
import videoMenuStyles from './VideoMenu.module.css';
import VideoMenu, {extractID} from "./VideoMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";




function AddNewVideoPopup ({setaddNew, fetchNewVideos}) {
  const [videoLink, setvideoLink] = useState("")
  const [idLabel, setidLabel] = useState("")
  const [invalidID, setinvalidID] = useState(false)
  const [generatedLink, setgeneratedLink] = useState("")
  const [playlistID, setplaylistID] = useState(0)


  return (<div className={styles.popupOuter}
               onClick={(e) => {
                 if ((e.target as HTMLDivElement).className.includes("popupOuter")) {
                   setaddNew(false);
                 }
               }
               }>
    <div className={styles.popupInner}>
        <input
            className={videoMenuStyles.inputField}
            value={videoLink}
            onChange={(e) => {
                setvideoLink(e.target.value);
                let updatedValues = extractID(e.target.value);
                setplaylistID(updatedValues[0]);
                setidLabel(updatedValues[1]);
                setinvalidID(updatedValues[2]);
                setgeneratedLink(updatedValues[3]);
            }}
            placeholder={"Type in Youtube-Link, -Channel, or -Playlist..."}
        />

      <a href={generatedLink}>
        <h1 className={styles.idLabel} style={invalidID ? { color: "rgba(255,50,50,0.5)" } : {}}>
          {playlistID == 1 ? "Playlist-" : playlistID == 2 ? "Channel-" : "Video-"}ID: {idLabel}
        </h1>
      </a>

        <FontAwesomeIcon icon={faCircleXmark} className={styles.cancel} onClick={() => setaddNew(false)}/>
        <FontAwesomeIcon icon={faCircleCheck} className={styles.ok} onClick={() => {
            setaddNew(false)
            console.log("fetching new videos to " + generatedLink)
            fetchNewVideos(generatedLink)
        }}/>

    </div>
  </div>);
};

export default AddNewVideoPopup;
