import {useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from "axios";
 import { AuthContext } from '../context/auth.contex.jsx';
 const API_URL = "http://localhost:5005";

function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken);  
        authenticateUser(); 
        navigate('/api/post');                       
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
    }
    return (
      <div id="loginbody">
        <form onSubmit={handleLoginSubmit} id="loginform">
          <h1>Log in</h1>
          <fieldset>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </fieldset>

          <button type="submit">Log in</button>
        </form>
      </div>
    );
}

export default LoginPage;