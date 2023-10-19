// Import necessary dependencies and components from React and your custom context
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext.js";


// Define a functional component called AddNotes
const AddNotes = () => {
  // Use the useContext hook to access the state and methods from the custom context
  const context = useContext(noteContext);


  // Destructure the addNotes method from the context
  const { addNotes } = context;


  // Initialize a piece of state using the useState hook to manage the form input values
  const [note, setNote] = useState({
    title: "",
    description: "",
    tags: "default",
  });

  // Define a function to handle the form submission
  const handleClick = (e) => {
    // Call the addNotes method with the data from the 'note' state
    addNotes(note.title, note.description, note.tags);
    // Prevent the default form submission behavior
    e.preventDefault();
  };

  // Define a function to update the 'note' state when input values change
  const onChange = (e) => {
    // Update the 'note' state using the spread operator to preserve existing properties
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Render the UI elements and the form for adding notes
  return (
    <div>
      <div className="container">
        <h2 style={{ marginTop: 70 }}>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              onChange={onChange} // Call the 'onChange' function when the title input changes
              name="title" // Set the 'name' property to "title" for the input
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              name="description" // Set the 'name' property to "description" for the input
              type="text"
              className="form-control"
              id="description"
              onChange={onChange} // Call the 'onChange' function when the description input changes
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

// Export the AddNotes component as the default export
export default AddNotes;
