import React, { useState } from 'react'

type Props = {}

function TsTest({ }: Props) {
  const [inputField, setinputField] = useState("")
  const [name, setname] = useState("")
  const [age, setage] = useState(0)
  const [email, setemail] = useState("")

  const styles = {
    width: "500px",
    height: "40px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    "font-size": "20px"
  } as React.CSSProperties
  const button = {
    top: "50px"
  } as React.CSSProperties

  const field = {
    top: "100px",
    height: "fit-contents",
    color: "white"
  } as React.CSSProperties

  function submitted(inputFieldValue: string): void {
    
    const values: string[] = inputFieldValue.split(" ")
    setname(values[0])
    setage(parseInt(values[1])) 
    setemail(values[2])
    onDownload(values)
  }
  
  function download(content:string, fileName:string, contentType: string) {
		  const a = document.createElement("a");
		  const file = new Blob([content], { type: contentType });
		  a.href = URL.createObjectURL(file);
		  a.download = fileName;
		  a.click();
		}

		function onDownload(jsonData : string[]){
			download(JSON.stringify(jsonData), "daten.json", "text/plain");
		}

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitted(inputField)
        }}
      >
      <input
          type="text"
          
          style={styles}
        value={inputField}
          onChange={(e) => setinputField(e.target.value)}
          placeholder="Type in Name, Age and Email separated by space"
        ></input>
        <button type="submit" style = {{...styles, ...button}}>
          Submit
        </button>
      </form>
      <div style = {{...styles, ...field}}>
        {name + "  "}
        {age + "  "}
        {email + "  "}
      </div>
    </div>
  )
}

export default TsTest


