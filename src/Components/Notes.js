import React, { useContext, useEffect,useState, useRef } from "react";
import noteContext from "../context/notes/noteContext.js";
import Notesitem from "./Notesitem.js";
import AddNotes from "./AddNotes.js";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchNotes } = context;
  useEffect(() => {
    fetchNotes(); // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags});
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tags: "default",
  });

  // Define a function to update the 'note' state when input values change
  const onChange = (e) => {
    // Update the 'note' state using the spread operator to preserve existing properties
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click();
    console.log('updating the note');
  }

  return (
    <>
      <AddNotes />
      <div className="container my-3">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      aria-describedby="emailHelp"
                      onChange={onChange} // Call the 'onChange' function when the title input changes
                      name="etitle" // Set the 'name' property to "title" for the input
                      value={note.etitle}
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      name="edescription" // Set the 'name' property to "description" for the input
                      type="text"
                      className="form-control"
                      id="description"
                      value={note.edescription}
                      onChange={onChange} // Call the 'onChange' function when the description input changes
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Tags
                    </label>
                    <input
                      name="etags" // Set the 'name' property to "description" for the input
                      type="text"
                      className="form-control"
                      id="etags"
                      onChange={onChange} // Call the 'onChange' function when the description input changes
                      value={note.etags}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button  type="button" onClick={handleClick} className="btn btn-primary">
                  Update Note
                </button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row my-3">
          <h2>Your Notes</h2>
          {notes.map((note) => {
            return (
              <Notesitem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
