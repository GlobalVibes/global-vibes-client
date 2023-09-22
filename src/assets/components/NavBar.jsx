import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../context/auth.contex";
import { Link } from 'react-router-dom';

function NavBar() {

  const {
    isLoggedIn,
    user,
    logOutUser
  } = useContext(AuthContext);

  return (
    <div id="navbar">
      {isLoggedIn && (
        <>
          <Link to="/posts">
            <button>User homepage</button>
          </Link>

          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
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