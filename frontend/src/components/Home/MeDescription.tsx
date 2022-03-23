import React, {FunctionComponent, useEffect, useState} from 'react';
import bildVonMir from 'public/bildVonMir.jpg'
import styles from './Home.module.css'
import Spacer from "../misc/Spacer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

interface OwnProps {
}

type Props = OwnProps;

const MeDescription: FunctionComponent<Props> = (props) => {
    var userLang = navigator.language;
    var [showText, setshowText] = useState(false)
    var [countryOfOrigin, setcountryOfOrigin] = useState("")
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        fetch(`https://ipinfo.io/?token=c6199601d572b8`)
            .then(resp => resp.json())
            .then(resp => setcountryOfOrigin(resp.country))
            .catch(err => console.log(err))
    }, [])


    function handleScroll(e) {
        if (!showText && window.scrollY >= window.innerHeight && userLang.startsWith("de") || countryOfOrigin == "DE") {
            setshowText(true)
        }
    }

    return (
        <div>
            {userLang.startsWith("de") || countryOfOrigin == "DE" ?

                <div className={styles.myImageContainer}>
                    <img src={bildVonMir} className={styles.myImage}/>
                </div>
                :
                <div>
                    <div style={{marginTop: "25vh"}} className={styles.textBackground}>
                        <h2>HEY!</h2>
                        <span className={styles.text}>
                        <br/> This is my little Website that I built to have some Tools I need (or don't need)
                        <br/> Feel free to look around, but don't expect much! :D
                    </span>

                    </div>
                    <Spacer height={"1650vh"}>
                        <FontAwesomeIcon icon={faHeart} style={{
                            color: "white",
                            position: "absolute",
                            left: "50%",
                            bottom: "5vh"
                        }}
                        />
                    </Spacer>
                </div>
            }
            {
                showText ?
                    <>
                        <div className={styles.textBackground}>
                            <h2>HEY!</h2>
                            <span className={styles.text}>
                        Ich bin Marius, 19 Jahre alt und Informatikstudent.
                    </span>
                        </div>
                        <div className={styles.textBackgroundBelow}>
                    <span className={styles.text}>
                        <br/>
                        <br/>
                        Ich mache diese Seite, um Tools für mich zu bauen und nebenher WebDev zu üben.
                        <br/>
                        Schau dich gerne mal um, und falls irgendwelche Fragen aufkommen, schreib mich an!
                    </span>
                        </div>
                        <div className={styles.bottomLinks}>
                            <a className={styles.text} href={"mailto:marius.bosler@zoho.com"}>Kontakt</a>
                        </div>
                    </>
                    :
                    null
            }
        </div>
    );


};

export default MeDescription;
