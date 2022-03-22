import React from "react";
import "../styles/App.css";
import BackHomeButton from "./misc/BackHomeButton";
import styles from "./Mathtools/Mathtools.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
function Sandbox() {
  const [inputValue, setinputValue] = useState("");
  const [resultString, setresultString] = useState("");
  const [enlarged, setenlarged] = useState(false);

  const primeFactorization = (numberToCompute) => {
    var primeFactors = [],
      div = 2;
    while (numberToCompute > 2) {
      if (numberToCompute % div == 0) {
        primeFactors.push(div);
        numberToCompute = numberToCompute / div;
      } else {
        div++;
      }
    }
    return primeFactors;
  };

  const teilBarkeitsHassediagramm = (valueToCalculateHasseDiagramm) => {
    const computedNumbers = [];

    var numbersToCompute = new Set();
    numbersToCompute.add(valueToCalculateHasseDiagramm);

    while (numbersToCompute.size > 1 || (numbersToCompute.size > 0 && !numbersToCompute.has(1))) {
      computedNumbers.push(numbersToCompute);
      console.log(numbersToCompute);
      let newNumbersToCompute = new Set();
      numbersToCompute.forEach((numberToCompute) => {
        const primeFactors = primeFactorization(numberToCompute);
        primeFactors.forEach((primeFactor) => {
          newNumbersToCompute.add(numberToCompute / primeFactor);
        });
      });
      numbersToCompute = newNumbersToCompute;
    }
    console.log(numbersToCompute);

    var computedNumbersString = "";
    computedNumbers.forEach((computedNumbersSet) => {
      computedNumbersString += [...computedNumbersSet].join(" ") + "\n";
    });
    computedNumbersString += "1";
    return computedNumbersString;
  };

  return (
    <div>
      <BackHomeButton />
      <h3 className="constructionHeading"> This is my Sandbox to build and experiment with React components </h3>
      <div className={styles.flipDownCard + ` ${enlarged ? styles.enlarged : ""}`}>
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
          >
            Hassediagramm zur Teilbarkeitsrelation
          </h1>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(styles.flipDownCard);
              setresultString(teilBarkeitsHassediagramm(parseInt(inputValue)));
            }}
          >
            <input type="text" value={inputValue} onChange={(e) => setinputValue(e.target.value)} className={styles.numberInputField} />
            <button type="submit" className={styles.submitButton}>
              Calculate
            </button>
          </form>
          <h1 style={{ whiteSpace: "break-spaces" }}>Result: {"\n\n" + resultString}</h1>
        </div>
      </div>
    </div>
  );
}

export default Sandbox;
