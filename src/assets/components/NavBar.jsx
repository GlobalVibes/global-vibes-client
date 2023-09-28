import React from 'react';
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.contex";
import { Link } from 'react-router-dom';
import GlobalVibes from '../pages/images/GlobalVibesLogo.png';
function NavBar() {

  const {
    isLoggedIn,
    logOutUser
  } = useContext(AuthContext);

  return (
    <div id="navbar">
      {isLoggedIn && (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <img src={GlobalVibes} alt="Logo" width='200' height='150' style={{ objectFit: 'cover' }} />
          <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '30px' }}>
            <Link to="/">
              <button onClick={logOutUser} id="logoutbutton">Logout</button>
            </Link>            
            <Link to="/allposts"> <button id="checkotherpostsbutton">Check other posts</button> </Link>
            <Link to="/user-homepage">
              <button id="homepagebutton">Homepage</button>
            </Link>
          </div>
        </div>


      )}

      {!isLoggedIn && (
        <div>
          <Link to="/signup"> <button id="signupbutton">Sign Up</button> </Link>
          <Link to="/login"> <button id="loginbutton">Login</button> </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;