import React, { Component } from 'react'
import styles from './../styles/ProjectButton.module.css'

class ProjectButton extends Component {
    constructor({ text, pos, link }) {
        super({ text, pos, link })
        this.text = text
        this.link = link
        this.transformation = 0;
        if (pos) {
            switch (pos) {
                case 1:
                    this.transformation = '50'
                    break;
                case 2:
                    this.transformation = '35'
                    break;
                case 3:
                    this.transformation = '65'
                    break;
                case 4:
                    this.transformation = '20'
                    break;
                case 5:
                    this.transformation = '80'
                    break;
                default:
                    console.log(pos)
                    console.log(this.transformation)
                    break;
            }
            this.position = {
                left: this.transformation + 'vw',
                transform: 'translateX(-50%)',
            }
        } 
    }

    buttonClicked = () => {
        console.log("Button " + this.text + " clicked")
        if (this.link) {
            window.location.href = this.link
        }
    }

    buttonEntered = () => {
        console.log("Entered " + this.text)
    }

    

    render() {
        return (
            <div
                className={styles.projectButton}
                style={this.position}

                onClick={() => this.buttonClicked()}
                onMouseEnter={() => this.buttonEntered()}>
                {this.text}
            </div>
        )
    }
}

export default ProjectButton