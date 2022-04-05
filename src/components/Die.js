import React from "react";

export default function Die(props) {
    // function freeze() {
    //     frozen = !frozen;
    //     props.frozen = frozen;
    //     props.value = value;
    // }

    return (
        <div 
            className={`die ${props.isHeld? "held-button" : ""}`} 
            onClick={props.holdDice}    
        >
            <h2>{props.value}</h2>
        </div>
    )
}