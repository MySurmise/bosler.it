import React from 'react'
import BackHomeButton from './BackHomeButton'
import styles from '../styles/VideoMenu.module.css'
import { useState } from 'react'

function VideoMenu() {
    const [videoLink, setvideoLink] = useState("")
    const [idLabel, setidLabel] = useState("")
    const [invalidID, setinvalidID] = useState(false)
    const changeToTool = (tool) => {
        if (!invalidID && idLabel.length == 11) {
            window.location.href = "/" + tool + "/" + idLabel
        }
    }

    const updateID = (e) => {
        let id;
        let link = e.target.value
        if (link.includes("youtu.be/")) {
            id = link.split("be/")[1].substring(0, 11)
        } else if (link.includes("=")) {
            id = link.split("=")[1].substring(0, 11)
        } else {
            id = link
        }
        if (/^[0-9A-z+\-\_]{11}$/.test(id)) {
            setidLabel(id)
            setinvalidID(false)
        } else {
            setidLabel("invalid Link or ID!")
            setinvalidID(true)
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
              placeholder={"Type in Youtube-Link..."}
          >
            </input>

            <h1
                className={styles.idLabel}
                style={invalidID ? { color: "rgba(255,50,50,0.5)" } : {} }>ID: {idLabel}</h1>

          <div className={styles.buttons}>
              <button
                className={styles.button}
                    onClick={() => changeToTool('transcribe')}>
                  Transcribe Video
              </button>
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