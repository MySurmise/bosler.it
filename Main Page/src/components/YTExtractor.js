import React from 'react'
import BackHomeButton from './BackHomeButton'
import '../styles/App.css'
import '../styles/YTExtractor.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Youtube from 'react-youtube'
import ytex from '../styles/YTExtractor.module.css'


function YTExtractor() {
    const [res, setres] = useState("")
    const [inputValue, setinputValue] = useState("")
    const [textField, settextField] = useState("")
    const [loopBegin, setloopBegin] = useState(0)
    const [loopLength, setloopLength] = useState(3)
    const [loopEnd, setloopEnd] = useState(loopLength)

    const [player, setplayer] = useState("")
    const [currentTime, setcurrentTime] = useState(0)
    

    const getLoopBegin = () => {
        return loopBegin
    }

    const getLoopEnd = () => {
        return loopEnd
    }
    const onPlayerReady = (event) => {
        event.target.playVideo();
        event.target.unMute();
        setplayer(event.target)
        setInterval(() => {
           loop(event.target) 
        })
    }
    
    const loop = (thisplayer) => {
        setcurrentTime(thisplayer.getCurrentTime())
    }

    useEffect(() => {
        if (player != "" && player.getCurrentTime() > loopEnd) {
            player.seekTo(loopBegin)
        } 
    })

    
    const onInputKeyPress = (event) => {
        //console.log(event.key);
        if (event.key == "Enter") {
            if (event.ctrlKey) {
                settextField(inputValue + "\n" + textField)
                setinputValue("")
            } else if (event.shiftKey) {
                setloopBegin(loopBegin - 3)
                setloopEnd(loopEnd - 3)
                player.seekTo(loopBegin - 3)
            } else {
                setloopBegin(loopBegin + 3)
                setloopEnd(loopEnd + 3)
                player.seekTo(loopBegin + 3)
                console.log("Seeking" + (loopBegin+3) + loopEnd);
            }
        } else {
            setloopBegin(loopBegin + 0.1)
            setloopEnd(loopEnd + 0.1)
        }
        if (player.getCurrentTime() > loopEnd) {
            player.seekTo(loopBegin)
        }
        if (loopBegin < 0) {
            setloopBegin(0)
        }
        if (loopEnd < 5) {
            setloopEnd(5)
        }
    }    

    return (
        <div>
      <BackHomeButton />
            <h3 className='construction Heading'> This is where I am building a tool to cut sequences from Youtube.</h3>
            <div>
            {res}
            </div>
            <Youtube
                className={ytex.YTPlayer}
                videoId={"e632ECYF0U0"}
                onReady={ onPlayerReady}
            />
            <div
                className={ytex.blocker}
            ></div>
            <input
                className={ytex.inputField}
                value={inputValue}
                onChange={(e) => { setinputValue(e.target.value) }}
                onKeyPress={(e) => { onInputKeyPress(e) }}
            >
            </input>
            <textfield
                className = {ytex.mainTextField}
            >
                {textField}
            </textfield>
            <h1 className={ytex.loopBegin}>
                {(Math.round(loopBegin*100)/100).toFixed(1)}
            </h1>
            <h1 className={ytex.currentTime}>
                {(Math.round(currentTime * 100) / 100).toFixed(1)}
            </h1>
            <h1 className={ytex.loopEnd}>
                {(Math.round(loopEnd * 100) / 100).toFixed(1)}
            </h1>
        </div>        
    )
}

export default YTExtractor