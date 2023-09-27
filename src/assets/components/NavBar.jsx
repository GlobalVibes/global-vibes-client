import React from 'react';
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.contex";
import { Link } from 'react-router-dom';

function NavBar() {

  const {
    isLoggedIn,    
    logOutUser
  } = useContext(AuthContext); 

  return (
    <div id="navbar">
      {isLoggedIn && (
        <>
          <Link to="/user-homepage">
            <button>User homepage</button>
          </Link>

          <button onClick={logOutUser}>Logout</button>

          <Link to="/allposts"> <button>Check other posts</button> </Link>
          
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </div>
  );
}

export default NavBar;