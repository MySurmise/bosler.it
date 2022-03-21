import React from 'react'
import styles from "../styles/Mathtools.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";


function FoldingCard(props) {
    
    const [enlarged, setenlarged] = useState(false);

    
  return (
      <div className={styles.flipDownCard +
          ` ${enlarged ? styles.enlarged : ""}`}>
          <div className={styles.hasseDiagramm}>
              <FontAwesomeIcon
                  className={styles.enlargeArrow + ` ${enlarged ? styles.flipped : ""}`}
                  onClick={() => {
                      setenlarged(!enlarged);
                  }}
                  icon={faAngleDown}
              />
              <h1
                  onClick={() => {
                      setenlarged(!enlarged);
                  }}
                  className={styles.cardHeading}
              >{props.title}</h1>
              <br />
              
          </div>
            {props.children}
      </div>
  )
}

export default FoldingCard