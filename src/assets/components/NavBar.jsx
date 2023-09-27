import React from 'react';
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.contex";
import { Link } from 'react-router-dom';

function NavBar() {

  const {
    isLoggedIn,    
    logOutUser
  } = useContext(AuthContext);

  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    onFilterChange(e.target.value); 
  };

  return (
    <div id="navbar">
      {isLoggedIn && (
        <>
          <Link to="/user-homepage">
            <button>User homepage</button>
          </Link>

          <button onClick={logOutUser}>Logout</button>
          
          <input
            type="text"
            placeholder="Filter by hobby"
            value={filterValue}
            onChange={handleFilterChange}
          />
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