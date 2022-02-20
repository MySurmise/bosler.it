import React from 'react'
import ProjectButton from './ProjectButton'
function BackHomeButton() {
    return (
         <ProjectButton
                text="≪ Home"
                link="/"
                style={{ position: "absolute", left: "1vw", top: "1vw" }}
            />
  )
}

export default BackHomeButton