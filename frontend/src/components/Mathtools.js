import React from "react";
import "../styles/App.css";
import BackHomeButton from "./BackHomeButton";
import styles from "../styles/Mathtools.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Spacer from "./Spacer";
import FoldingCard from "./FoldingCard";

function Mathtools() {
  const [inputValueHasse, setinputValueHasse] = useState("");
  const [resultStringHasse, setresultStringHasse] = useState("");

  const [inputNumberTester, setinputNumberTester] = useState("");
  const [resultNumberTester, setresultNumberTester] = useState("");

  const primeFactorization = (numberToCompute) => {
    var primeFactors = [],
      div = 2;
    while (numberToCompute > 2) {
      if (numberToCompute % div === 0) {
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
      <Navbar />
      <Spacer height="3vw" />
      <FoldingCard className={styles.flipDownCard} title="Hassediagramm zur Teilbarkeitsrelation">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setresultStringHasse(teilBarkeitsHassediagramm(parseInt(inputValueHasse)));
          }}
        >
          <input
            type="text"
            value={inputValueHasse}
            onChange={(e) => setinputValueHasse(e.target.value)}
            className={styles.numberInputField}
          />
          <button type="submit" className={styles.submitButton}>
            Calculate
          </button>
        </form>
        <h1 style={{ whiteSpace: "break-spaces" }}>{"\n" + resultStringHasse}</h1>
      </FoldingCard>
      <Spacer height="1vw" />
      <FoldingCard className={styles.flipDownCard} title="Primzahltester">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const numberToCalc = parseInt(inputNumberTester);
            if (numberToCalc <= 1) {
              setresultNumberTester("Numbers 1 and smaller aren't prime. \nAnd you should know that.");
            } else {
              const result = primeFactorization(numberToCalc);
              setresultNumberTester(
                (numberToCalc !== 1 && result.length === 0) || (result.length === 1 && result[0] === numberToCalc)
                  ? "Yes"
                  : "No! Divisible by " + [...new Set(result)].join(", ")
              );
              console.log(result);
            }
          }}
        >
          <input
            type="text"
            value={inputNumberTester}
            onChange={(e) => setinputNumberTester(e.target.value)}
            className={styles.numberInputField}
          />
          <button type="submit" className={styles.submitButton}>
            Is Prime?
          </button>
        </form>
        <h1 style={{ whiteSpace: "break-spaces" }}>{"\n" + resultNumberTester}</h1>
      </FoldingCard>
      <Spacer height="1vw" />
    </div>
  );
}

export default Mathtools;
