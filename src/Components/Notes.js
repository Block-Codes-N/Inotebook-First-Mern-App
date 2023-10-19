import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext.js";
import Notesitem from "./Notesitem.js";
import AddNotes from "./AddNotes.js";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, addNotes } = context;
  return (
    <>
    <AddNotes/>
    <div className="container my-5">
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Notesitem key = {note._id} note={note} />;
        })}
      </div>
    </div>
    </>
  );
};

export default Notes;
