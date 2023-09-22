// Importing necessary styles and components
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/noteState";

// Define the main App component
function App() {
  return (
    <>
      {/* Wrapping the entire app with NoteState to provide context */}
      <NoteState>
        {/* Setting up routing using BrowserRouter */}
        <BrowserRouter>
          
            <Navbar /> {/* Displaying the Navbar component */}
            {/* Defining routes using Routes */}
      
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Route to Home component */}
              <Route path="/about" element={<About />} />
              {/* Route to About component */}
            </Routes>
      
        </BrowserRouter>
      </NoteState>
    </>
  );
}

// Exporting the App component as the default export
export default App;
