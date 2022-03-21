import { faCircleCheck, faCircleNotch, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { createRef, MutableRefObject, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "components/VideoCard";
import styles from "styles/Supercut.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Supercut() {

  interface VideoData {
    title: string;
    url: string;
    thumbnailLinks: ThumbnailData;
    duration: number;
  }
  
  interface ThumbnailData {
    height: number;
    id: string;
    preference: number;
    resolution: string;
    url: string;
    width: number
  }
 
  let link = useParams()["link"];
  const [activated, setactivated] = useState<(boolean|undefined)[]>([])
  const [videos, setvideos] = useState<VideoData[]>([]);
  let refs: any = [];
  useEffect(() => {
    
    window.history.replaceState("", "select videos to use", "/supercut");
    console.log("Started request to " + link);
    if (typeof link == "string") {
      fetch(`https://bosler.it:3000/playlistValues/${encodeURIComponent(link)}`)
        .then((o) => o.text()) 
        .then((o) => {
          //console.log(o);
          o.split("\n").forEach((video) => {
            if (video == "") {
              return;
            }
            try {
              setvideos(old => [...old, JSON.parse(video)])
            } catch (exc) {
              console.log(exc);
              console.log("Couldn't parse following response:");
              console.log(video);
            }
          });
/*
          videos.map((o) => {
            console.log(o);
          });
*/
              console.log("fin");
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
    

  }, []);


  
  function convertToHMS(totalSeconds: number): string {
    let hours = Math.floor(totalSeconds / 3600)
    let minutes = Math.floor((totalSeconds - (hours*3600)) / 60)
    let seconds = totalSeconds % 60

    // wow such brain. So logic. Much smart.
    return (hours > 0 ? hours + ":" : "") +
      (minutes >= 10 || hours == 0 ? minutes : "0" + minutes) + ":" +
      (seconds >= 10 ? seconds : "0" + seconds)
   }
  
  function changeAll(changeValue: boolean) {
    setactivated(new Array(videos.length).fill(changeValue))
  }

  return (
    <div>
      {
        <div className={styles.videoCard + " " + styles.tableHead}>
          <div className={styles.tableHeading}>
            Youtube-Playlist | {videos.length} video{videos.length == 1? "" : "s"} | Total length: {convertToHMS(videos.reduce((a, b) => a + b.duration, 0))}
          </div>
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={styles.yes + " " + (activated.every((o) => o) && videos.length == activated.length ? styles.activated : "")}
            onMouseDown={() => changeAll(true)}
          />
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={styles.no + " " + (activated.every((o) => !o) && videos.length == activated.length ? styles.activated : "")}
            onMouseDown={() => changeAll(false)}
          />
        </div>
      }
      {videos.length == 0 ? (
        <FontAwesomeIcon className={styles.spinning + " " + styles.loading} icon={faCircleNotch} />
      ) : (
        videos.map((video, idx) => {
          //console.log(video);
          const ref = createRef() as MutableRefObject<HTMLDivElement>;
          refs.push(ref);
          let thumbnailLinks = video["thumbnails"];
          return (
            <VideoCard
              key={idx}
              id={idx}
              url={video["original_url"]}
              thumbnailLink={video["thumbnail"] === undefined ? thumbnailLinks[thumbnailLinks.length - 1]["url"] : video["thumbnail"]}
              title={video["title"]}
              channelName={video["uploader"]}
              activated={activated}
              setactivated={setactivated}
            />
          );
        })
      )}
    </div>
  );
}

export default Supercut;


