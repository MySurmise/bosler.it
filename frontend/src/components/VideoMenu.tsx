import React from 'react'
import BackHomeButton from './BackHomeButton'
import { useState } from 'react'
import styles from '../styles/VideoMenu.module.css' 

function VideoMenu() {
    const [videoLink, setvideoLink] = useState("")
    const [idLabel, setidLabel] = useState("")
    const [invalidID, setinvalidID] = useState(false)
    const [generatedLink, setgeneratedLink] = useState("")
    const [playlistID, setplaylistID] = useState(0)

    const changeToTool = (tool : string) => {
        if (!invalidID) {
            if (tool == "supercut") {
                window.location.href = "/" + tool + "/" + encodeURIComponent(generatedLink)
            } else {
                window.location.href = "/" + tool + "/" + idLabel
            }
        }
    }

    const updateID = (e: React.ChangeEvent<HTMLInputElement>) => {
        let id: string;
        let link = e.target.value
        if (link.includes("playlist?list=")) {
            id = link.split("playlist?list=")[1].split((/[^0-9A-z+\-_]/))[0]
            setplaylistID(1)
            if (/^[0-9A-z+\-_](?:.{23}|.{33})$/.test(id)) {
                setidLabel( id)
                setinvalidID(false)
                setgeneratedLink("https://youtube.com/playlist?list=" + id)
            } else {
                setidLabel("invalid Link or ID!" + id)
                setinvalidID(true)
                setgeneratedLink("https://youtube.com")
            }
            return;
        }
        else if (link.includes("/channel/")) {
            id = link.split("/channel/")[1].split((/[^0-9A-z+\-_]/))[0]
            setplaylistID(2)
            if (/^[0-9A-z+\-_](?:.{23}|.{33})$/.test(id)) {
                setidLabel( id)
                setinvalidID(false)
                setgeneratedLink("https://youtube.com/playlist?list=" + id.replace("UC", "UU"))
            } else {
                setidLabel("invalid Link or ID!" + id)
                setinvalidID(true)
                setgeneratedLink("https://youtube.com")
            }
            return;
        } else if (link.includes("/c/")) {
            id = link.split("/c/")[1].split((/[^0-9A-z+\-_]/))[0]
            setplaylistID(2)
            setidLabel( id)
            setinvalidID(false)
            setgeneratedLink(`https://youtube.com/c/${id}`)
            return;
        } else if (
          link.includes("youtube.com/") &&
          link.split("youtube.com/")[1] != "" &&
          link.split("youtube.com/")[1].split(/[^0-9A-z+\-_]/).length == 1
        ) {
          id = link.split("youtube.com/")[1];
          setplaylistID(2);
          setidLabel(id);
          setinvalidID(false);
          setgeneratedLink(`https://youtube.com/c/${id}`);
          return;
        } else if (link.includes("youtu.be/")) {
          id = link.split("be/")[1].substring(0, 11);
        } else if (link.includes("=")) {
          id = link.split("=")[1].substring(0, 11);
        } else {
          id = link;
        }
        setplaylistID(0)
        if (/^[0-9A-z+\-_]{11}$/.test(id)) {
            setidLabel(id)
            setinvalidID(false)
            setgeneratedLink("https://youtube.com/watch?v=" + id)
        } else {
            setidLabel("invalid Link or ID!")
            setinvalidID(true)
            setgeneratedLink("https://youtube.com")
        }
    }

    return (
      <div>
          <BackHomeButton />
          <h1 className={styles.heading}>Video Menu </h1>
          <h1 className={styles.subheading}>Type in YouTube-Link and choose Tool </h1>
          <input
              className={styles.inputField}
                value={videoLink}
                onChange={(e) => {
                    setvideoLink(e.target.value)
                    updateID(e)
                }}
              placeholder={"Type in Youtube-Link, -Channel, or -Playlist..."}
          >
            </input>
            <a href={generatedLink}>
            <h1
                className={styles.idLabel}
                    style={invalidID ? { color: "rgba(255,50,50,0.5)" } : {}}>
                    {playlistID == 1 ? "Playlist-" : (playlistID == 2? "Channel-":"Video-" )}ID: {idLabel}</h1>
            </a>
            <div className={styles.buttons}>
                {playlistID == 0 ?
                    <button
                        className={styles.button}
                        onClick={() => changeToTool('transcribe')}>
                        Transcribe Video
                    </button>
                    : ""}
              <button
                  className={styles.button}
                    onClick={() => changeToTool('supercut')}>
                  Make Supercut
              </button>
          </div>
      </div>
  )
}

export default VideoMenu