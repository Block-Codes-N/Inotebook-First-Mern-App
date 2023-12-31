import NoteContext from "./noteContext"; // Importing the NoteContext from "./noteContext"
import { useState } from "react";

const NoteState = (props) => {
  // Defining a functional component called NoteState which takes props
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial); //

  // Fetching notes from the server

  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/notesFetched`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMWM0ZTM1YTU0NTQyNzcyMmQzYWIzIn0sImlhdCI6MTY5NTA0NDk4NH0.wTMS84uz0KDOtDcGbf3R4HB3wlIEQPIBP3BeC-s0CH8",
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };




  // add notes
  // API call
  const addNotes = async (title, description, tags) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMWM0ZTM1YTU0NTQyNzcyMmQzYWIzIn0sImlhdCI6MTY5NTA0NDk4NH0.wTMS84uz0KDOtDcGbf3R4HB3wlIEQPIBP3BeC-s0CH8",
      },
      body: JSON.stringify({ title, description, tags }),
    });

    const note = {
      _id: "65094c494a47126b4828747d50",
      user: "6501c4e35a545427722d3aeb3",
      title: title,
      tags: tags,
      description: description,
      date: "2023-09-19T07:22:49.177Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // edit  notes

  //API calls

  // logic for editing notes on the client side.
  const editNote = async (id, title, description, tags) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMWM0ZTM1YTU0NTQyNzcyMmQzYWIzIn0sImlhdCI6MTY5NTA0NDk4NH0.wTMS84uz0KDOtDcGbf3R4HB3wlIEQPIBP3BeC-s0CH8",
      },
      body: JSON.stringify({ title, description, tags }),
    });

    return response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tags;
      }
    }
  };

  // delete old notes
  // Define a function called "deleteNote" that takes an "id" parameter.
  const deleteNote = async (id) => {
    const deleteeNote = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMWM0ZTM1YTU0NTQyNzcyMmQzYWIzIn0sImlhdCI6MTY5NTA0NDk4NH0.wTMS84uz0KDOtDcGbf3R4HB3wlIEQPIBP3BeC-s0CH8",
      },
    });
    // Log a message to the console indicating the deletion of a note with the provided "id."
    console.log("deleting the note with id " + id);

    // Create a new array called "newNote" by filtering the "notes" array to remove items with a matching "_id."
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });

    // Update the "notes" array with the newly filtered "newNote" array.
    setNotes(newNote);
  };

  return (
    // Returning the NoteContext.Provider with a value containing the 'state' and 'update' function
    <NoteContext.Provider
      value={{ notes, editNote, addNotes, deleteNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState; // Exporting the NoteState component as the default export
