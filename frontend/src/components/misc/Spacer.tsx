import React, {ReactChild, ReactChildren, ReactNode} from 'react'

function Spacer(props : {height : string, className?: string, children?: ReactNode}) {
  return (
      <div style={{
  position: "relative",
  height: props.height,
        pointerEvents:"none"
}} className={props.className}>
          {props.children}
      </div>
  )
}

export default Spacer