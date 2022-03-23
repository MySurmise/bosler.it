import React, {ReactChild, ReactChildren, ReactNode} from 'react'

function Spacer(props : {height : string, children?: ReactNode}) {
  return (
      <div style={{
  position: "relative",
  height: props.height,
        pointerEvents:"none"
}}>
          {props.children}
      </div>
  )
}

export default Spacer