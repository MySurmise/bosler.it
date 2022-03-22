import React, {FunctionComponent, useEffect, useState} from 'react';
import bildVonMir from 'public/bildVonMir.jpg'
import styles from './Home.module.css'
interface OwnProps {}

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
        if (!showText && window.scrollY >= window.innerHeight ) {
            setshowText(true)
        }
    }
    return (
        <div>
            {userLang.startsWith("de") || countryOfOrigin == "DE"?
                <img src={bildVonMir} className={styles.myImage} />: null}
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
                    </>
                    :
                    null
            }
        </div>
    );


};

export default MeDescription;
