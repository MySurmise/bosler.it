import React from 'react'
import ProjectButton from '../Navbar/ProjectButton'
function BackHomeButton() {
    return (
         <ProjectButton
                link="/"
                style={{ position: "absolute", left: "1vw", top: "1vw" }}
            />
  )
}

export default BackHomeButton