import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (

<> 
      
<BrowserRouter>
  <div className="App">
      <Navbar/>
      <h2>This is Inotebook</h2>
  </div>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/about"element={<About/>}/>
      {/* <Route path="*" element={<Error />} /> */}
    </Routes>
  </BrowserRouter>
  
</>
  );
}

export default App;
