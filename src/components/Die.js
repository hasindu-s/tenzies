import React from "react";
import './Die.css';

export default function Die(props) {
    const classes = `die ${props.isHeld? "held-button" : ""}`

    let dots = [];

    for (let i = 0; i < props.value; i++) {
        dots.push(<span key={i} className="dot"></span>);
    }

    return (
        <div 
            className={classes} 
            onClick={props.holdDice}    
        >
            {dots}
        </div>
    )
}