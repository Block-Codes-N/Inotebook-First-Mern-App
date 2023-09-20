import NoteContext from "./noteContext"; // Importing the NoteContext from "./noteContext"

import React, { useState } from "react"; // Importing React and useState from the React library

const NoteState = (props) => {
  // Defining a functional component called NoteState which takes props

    const s1 = {
        "name": "noman",
        "class": "5b"
    }

    const [state, setState] = useState(s1); // Using the useState hook to initialize state with the object s1

    const update = () => {
        // Defining a function called 'update'
        setTimeout(() => {
            setState({
                "name": "ahsan",
                "class": "12th b"
            });
            // Updating the state to a new object after a delay of 1000 milliseconds (1 second)
        }, 1000);
    }

    return (
        // Returning the NoteContext.Provider with a value containing the 'state' and 'update' function
        <NoteContext.Provider value={{ state, update }}>  
            {props.children} 
        </NoteContext.Provider>
    )
}

export default NoteState; // Exporting the NoteState component as the default export
