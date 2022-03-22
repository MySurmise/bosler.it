import React, { CSSProperties } from 'react'

function Test() {
    
    const testStyle : CSSProperties = {
        position: "absolute",
        top: "210vh"
    } 
    return (
        <div style={testStyle}>
          Test
      </div>
  )
}

export default Test