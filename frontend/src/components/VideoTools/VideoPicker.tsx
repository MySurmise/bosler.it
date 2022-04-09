import {
    faAngleRight,
    faCheck,
    faCircle,
    faCircleArrowRight,
    faCircleCheck,
    faCircleNotch,
    faCirclePlus,
    faCircleXmark, faMagnifyingGlass, faScissors
} from "@fortawesome/free-solid-svg-icons";
import React, {createRef, MutableRefObject, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./VideoPicker.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {extractID} from "components/VideoTools/VideoMenu";
import AddNewVideoPopup from "./AddNewVideoPopup";
import VideoCard from "./VideoCard";
import BackHomeButton from "../misc/BackHomeButton";
import VisibilitySensor from "react-visibility-sensor";
import Spacer from "../misc/Spacer";
import {SearchVideoLyrics} from "./SearchVideoLyrics";


function VideoPicker() {




    let link = useParams()["link"];
    const [activated, setactivated] = useState<(boolean | undefined)[]>([]);
    const [videos, setvideos] = useState<IVideoData[]>([]);
    const [finishedLoading, setfinishedLoading] = useState(false);
    const [finishedSmallLoading, setfinishedSmallLoading] = useState(true);
    const [pageLoaded, setpageLoaded] = useState(false);
    const [addNew, setaddNew] = useState(false)
    const [searchMode, setsearchMode] = useState(false);
    const [captions, setcaptions] = useState<Icaptions[]>([]);

    let refs: any = [];

    function fetchNewVideos(link: string) {
        setfinishedSmallLoading(false)
        setfinishedLoading(videos.length > 0)
        fetch(`https://bosler.it:3000/playlistValues/${encodeURIComponent(link)}`)
            .then((o) => o.text())
            .then((o) => {
                //console.log(o);
                o.split("\n").forEach((video) => {
                    if (video == "") {
                        return;
                    }
                    try {
                        let parsedVideo = JSON.parse(video)
                        if (videos.filter(videoInArray => videoInArray.id == parsedVideo["id"]).length == 0) {
                            setvideos((old) => [...old, parsedVideo]);
                        }
                    } catch (exc) {
                        console.log(exc);
                        console.log("Couldn't parse following response:");
                        console.log(video);
                    }
                });

                console.log("Finished request and added videos.");
                setfinishedLoading(true);
                setfinishedSmallLoading(true)
            })
            .catch((ex) => {
                console.log("ERROR: " + ex);
            });
    }


    useEffect(() => {
        window.history.replaceState("", "select videos to use", "/videopicker");
        console.log("Started request to " + link);
        if (typeof link == "string") {
            fetchNewVideos(link)
        } else {
            setfinishedLoading(true);
        }
    }, []);

    function convertToHMS(totalSeconds: number): string {
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
        let seconds = totalSeconds % 60;

        // wow such brain. So logic. Much smart.
        return (
            (hours > 0 ? hours + ":" : "") +
            (minutes >= 10 || hours == 0 ? minutes : "0" + minutes) +
            ":" +
            (seconds >= 10 ? seconds : "0" + seconds)
        );
    }

    function changeAll(changeValue: boolean) {
        setactivated(new Array(videos.length).fill(changeValue));
    }

    function searchCaptions() {
        setsearchMode(true)
        let chosenVideos = videos.filter(video => video.activated || video.activated === undefined)
        console.log(chosenVideos);
        fetch('https://bosler.it:3000/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chosenVideos)
        })
            .then(value => value.text())
            .then(value => console.log(value))
    }


    return (
        <div>
            <BackHomeButton/>
            {
                <div className={styles.videoCard + " " + styles.tableHead}>
                    <div className={styles.tableHeading}>
                        Youtube-Playlist | {videos.length} video{videos.length == 1 ? "" : "s"} | Total length:{" "}
                        {convertToHMS(videos.reduce((a, b) => a + b.duration, 0))}
                    </div>
                    {!finishedSmallLoading ? <FontAwesomeIcon className={styles.spinning + " " + styles.smallLoading}
                                                              icon={faCircleNotch}/> : null}
                    {
                        !searchMode ? (
                                <>
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
                                </>
                            )
                            : null
                    }
                </div>

            }
            <div className={styles.spaceAtTop}/>
            {!finishedLoading ? (
                <>
                    <FontAwesomeIcon className={styles.spinning + " " + styles.loading} icon={faCircleNotch}/>
                    <div className={styles.pleaseWait}>Loading videos... This can take multiple minutes...<br/>
                        Loading ca. 50 videos/second <br/>
                        Avoid large channels.
                    </div>
                </>
            ) : (
                !searchMode ?
                    <>
                        {videos.map((video, idx) => {
                            //console.log(video);
                            let thumbnailLinks = video["thumbnails"];
                                return (
                                    <VisibilitySensor
                                    >
                                        <VideoCard
                                            id={idx}
                                            url={video["original_url"]}
                                            thumbnailLink={video["thumbnail"] === undefined ? thumbnailLinks[thumbnailLinks.length - 1]["url"] : video["thumbnail"]}
                                            title={video["title"]}
                                            channelName={video["uploader"]}
                                            activated={activated}
                                            setactivated={setactivated}
                                            searchMode={searchMode}
                                        />
                                    </VisibilitySensor>
                                );

                        })}
                        <span className={styles.searchOuter} onClick={() => {
                            return searchCaptions()
                        }}>
                <FontAwesomeIcon icon={faCircle} className={styles.search}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchInner}/>
                </span>
                        <span className={styles.cutOuter}>
                <FontAwesomeIcon icon={faCircle} className={styles.search} />
                <FontAwesomeIcon icon={faScissors} className={styles.cutInner}/>
                </span>
                        <FontAwesomeIcon icon={faCirclePlus} className={styles.plus} onClick={() => {
                            setaddNew(true)
                        }}/>
                        {addNew ?
                            <AddNewVideoPopup setaddNew={setaddNew} fetchNewVideos={fetchNewVideos}/>
                            :
                            null
                        }

                    </> : (
                        captions.map(({caption, video}, idx) => {
                            //console.log(video);
                            let thumbnailLinks = video["thumbnails"];
                            return (
                                <VisibilitySensor>
                                    <VideoCard
                                        id={idx}
                                        url={video["original_url"]}
                                        thumbnailLink={video["thumbnail"] === undefined ? thumbnailLinks[thumbnailLinks.length - 1]["url"] : video["thumbnail"]}
                                        title={video["title"]}
                                        channelName={video["uploader"]}
                                        activated={activated}
                                        setactivated={setactivated}
                                        searchMode={searchMode}
                                        captions={caption}
                                    />
                                </VisibilitySensor>
                            );
                        }))
            )
            }
        </div>
    );
}

export default VideoPicker;

export interface IThumbnailData {
    height: number;
    id: string;
    preference: number;
    resolution: string;
    url: string;
    width: number;
}

export interface IVideoData {
    title: string;
    url: string;
    thumbnailLinks: IThumbnailData;
    duration: number;
}
export interface Icaptions {
    captions: { text: string, start: number, end: number },
    video: IVideoData
}

