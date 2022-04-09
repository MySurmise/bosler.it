import * as React from 'react';
import styles from "./VideoPicker.module.css";
import videoMenuStyles from './VideoMenu.module.css';
import {useState} from "react";



export function SearchVideoLyrics() {
    const [searchInput, setsearchInput] = useState("");
    
    
    return (
        <div className={styles.searchPopupOuter}>
            <input className={videoMenuStyles.inputField}
                   value = {searchInput}
                   onChange={(e) => setsearchInput(e.target.value)}
            > </input>
        </div>
    );
};