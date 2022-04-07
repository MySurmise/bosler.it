import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction, useState } from 'react'
import styles from "./VideoPicker.module.css";
import {Icaptions} from "./VideoPicker";

interface videoCardI {
    id: number;
    thumbnailLink: string;
    title: string;
    channelName: string;
    url: string;
    activated: (boolean | undefined)[];
    setactivated: any;
    searchMode: boolean;
    captions?: Icaptions;
}

function VideoCard(props: videoCardI) {

    return (
        <div className={styles.videoCard}>
            <a href={props.url}>
                <div className={styles.videoCardTitle}>{props.title}</div>
                <img loading='lazy' className={styles.videoCardThumbnail} src={props.thumbnailLink} alt="thumbnail"/>
                <div className={styles.videoCardAuthor}>{props.channelName}</div>
            </a>
            {!props.searchMode ? (
            <>
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={styles.yes + " " + (props.activated[props.id] !== undefined && props.activated[props.id] ? styles.activated : "")}
                    onMouseDown={() => {
                        console.log(props.id + "true");
                        updateActivated(true);
                    }}
                />
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={styles.no + " " + (props.activated[props.id] !== undefined && !props.activated[props.id] ? styles.activated : "")}
                    onMouseDown={() => {
                        console.log(props.id + "false");
                        updateActivated(false);
                    }}
                />
                </>) : null}
        </div>
    );

    function updateActivated(value: boolean) {
        props.setactivated((activated) => {
            if (activated.length >= props.id) {
                return [...activated.slice(0, props.id), value, ...activated.slice(props.id + 1)];
            } else {
                return [...activated, ...(new Array(props.id - activated.length +1).fill(value))];
            }
        });
    }
}



export default VideoCard