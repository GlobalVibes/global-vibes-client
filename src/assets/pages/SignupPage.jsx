import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  AuthContext } from '../context/auth.contex.jsx';
const API_URL = "http://localhost:5005";

function SignupPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [profilePhoto, setProfile] = useState("");
    const [country, setCountry] = useState("");
    const [language, setLanguage] = useState("");

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);
    
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handleProfile = (e) => setProfile(e.target.value);
    const handleCountry = (e) => setCountry(e.target.value);
    const handleLanguage = (e) => setLanguage(e.target.value);
  
  const handleSignupSubmit = (e) => {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { email, password, name, profilePhoto, country, language };
      console.log(requestBody);
      // Make an axios request to the API
      // If the POST request is a successful redirect to the login page
      // If the request resolves with an error, set the error message in the state
      axios
        .post(`${API_URL}/auth/signup`, requestBody)
        .then((response) => {
          console.log(response)
          navigate("/login");
        })
        .catch((error) => {
          console.log('error', error)
          //const errorDescription = error.response.data.message;
          //setErrorMessage(errorDescription);
        });
    };
  
    return (
      <div>
        <form onSubmit={handleSignupSubmit}>
          <h1>Sign up</h1>
          <fieldset>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePassword}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleName}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="profilePhoto">
              {" "}
              Profile Photo:
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                value={profilePhoto}
                onChange={handleProfile}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="country">
              Country:
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={handleCountry}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="langugage">
              Language:
              <input
                type="text"
                id="langugage"
                name="language"
                value={language}
                onChange={handleLanguage}
              />
            </label>
          </fieldset>
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
}

export default SignupPage;