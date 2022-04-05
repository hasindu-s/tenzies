import React from "react";

export default function Button(props) {
    return (
        <button className="button" onClick={props.click}>
            {props.completed? "New game" : "Roll"}
        </button>
    );
}