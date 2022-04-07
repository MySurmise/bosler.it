import React from 'react'
import { useState } from 'react'
import styles from './VideoMenu.module.css'
import BackHomeButton from "../misc/BackHomeButton";

function VideoMenu() {
    const [videoLink, setvideoLink] = useState("")
    const [idLabel, setidLabel] = useState("")
    const [invalidID, setinvalidID] = useState(false)
    const [generatedLink, setgeneratedLink] = useState("")
    const [playlistID, setplaylistID] = useState(0)

    const changeToTool = (tool : string) => {
        if (!invalidID) {
            if (tool == "VideoPicker") {
                window.location.href = "/" + tool + "/" + encodeURIComponent(generatedLink)
            } else {
                window.location.href = "/" + tool + "/" + idLabel
            }
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
            <div className={styles.buttons}>
                {playlistID == 0 ? (
                    <button className={styles.button} onClick={() => changeToTool("transcribe")}>
                        Transcribe Video
                    </button>
                ) : (
                    ""
                )}
                <button className={styles.button} onClick={() => changeToTool("VideoPicker")}>
                    Make Supercut
                    <br />
                    or
                    <br />
                    Search Lyrics
                </button>
            </div>
        </div>
    );
}

function extractID(link: string) : [number, string, boolean, string] {
    let id: string
    let playListID: number
    let idLabel = ""
    let invalidID = false
    let generatedLink = ""

    function wrongID() {
        idLabel = ("invalid Link or ID!")
        invalidID = true
        generatedLink = ("https://youtube.com")
    }

    if (link.includes("playlist?list=")) {
        id = link.split("playlist?list=")[1].split((/[^0-9A-z+\-\_]/))[0]
        playListID = 1
        if (/^[0-9A-z+\-_](?:.{23}|.{33})$/.test(id)) {
            idLabel = id
            invalidID = false
            generatedLink = "https://youtube.com/playlist?list=" + id
        } else {
            wrongID()
        }
        return [playListID, idLabel, invalidID, generatedLink]
    }
    else if (link.includes("/channel/")) {
        id = link.split("/channel/")[1].split((/[^0-9A-z+\-\_]/))[0]
        playListID = (2)
        if (/^[0-9A-z+\-_](?:.{23}|.{33})$/.test(id)) {
            idLabel = id
            invalidID = false
            generatedLink = "https://youtube.com/playlist?list=" + id.replace("UC", "UU")
        } else {
            wrongID()
        }
        return [playListID, idLabel, invalidID, generatedLink]
    } else if (link.includes("/c/")) {
        id = link.split("/c/")[1].split((/[^0-9A-z+\-\_]/))[0]
        playListID = 2
        idLabel = id
        invalidID = false
        generatedLink = `https://youtube.com/c/${id}`
        return [playListID, idLabel, invalidID, generatedLink]
    } else if (link.includes("/user/")) {
        id = link.split("/user/")[1].split((/[^0-9A-z+\-\_]/))[0]
        playListID = 2
        idLabel = id
        invalidID = false
        generatedLink = `https://youtube.com/user/${id}`
        return [playListID, idLabel, invalidID, generatedLink]
    } else if (link.includes("youtube.com/") &&
        link.split("youtube.com/")[1] != "" &&
        link.split("youtube.com/")[1].split(/[^0-9A-z+\-\_]/).length == 1) {
        id = link.split("youtube.com/")[1]
        playListID = 2
        idLabel = id
        invalidID = false
        generatedLink = `https://youtube.com/c/${id}`
        return [playListID, idLabel, invalidID, generatedLink]
    } else if (link.includes("youtu.be/")) {
        id = link.split("be/")[1].substring(0, 11)
    } else if (link.includes("=")) {
        id = link.split("=")[1].substring(0, 11)
    } else {
        id = link
    }
    playListID = 0

    if (/^[0-9A-z+\-_]{11}$/.test(id)) {
        idLabel = id
        invalidID = false
        generatedLink = "https://youtube.com/watch?v=" + id
    } else {
        wrongID()
    }
    return [playListID, idLabel, invalidID, generatedLink]
}



export default VideoMenu
export {extractID}
