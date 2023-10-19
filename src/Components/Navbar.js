
import React from 'react'
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

    let location = useLocation();

    return (
        <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark text-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Inotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/home"? "active": ""}`} aria-current="page" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                <Link className= {`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link>
                </li>      
            </ul>
            </div>
        </div>
        </nav>
        </div>
    )
  }

  export default Navbar;