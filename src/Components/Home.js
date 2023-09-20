
import React, { useContext } from 'react'; // Import React and useContext hook from React
import noteContext from '../context/notes/noteContext'; // Import the noteContext from the specified path

import { useEffect } from 'react'; // Import the useEffect hook from React

const Home = () => {
  const a = useContext(noteContext); // Access the noteContext using the useContext hook and store it in variable 'a'
  
  useEffect(() => {
    a.update(); // eslint-disable-next-line 
    
    // eslint-disable-next-line
  }, []); // Run this effect only once when the component mounts 

  return (
    <div className='my-5'>
      This is the home component. {a.state.name} and has class {a.state.class}
    </div> // Render a simple component displaying text and values from the noteContext state
  );
}

export default Home; // Export the Home component as the default export for this file
