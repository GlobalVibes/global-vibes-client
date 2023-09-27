import { useState,  useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext} from '../context/auth.contex';
import service from '../../services/file-upload.service';
import api from "../../services/api";
function SignupPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [profilePhoto, setProfilePhoto] = useState("");
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
      api
        .post(`/auth/signup`, requestBody)
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


    const handleFileUpload = (e) => {
      // console.log("The file to be uploaded is: ", e.target.files[0]);
   
      const uploadData = new FormData();
   
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("profilePhoto", e.target.files[0]);
   
      service
        .uploadImage(uploadData)
        .then(response => {
          console.log("response is: ", response.fileUrl);
          // response carries "fileUrl" which we can use to update the state
          setProfilePhoto(response.fileUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };


    return (
      <div id="signupbody">
        <form onSubmit={handleSignupSubmit} id="signupformbody">
          <h1>Sign up</h1>
          <fieldset style={{border: 'none', width: '100%', height: '50px', margin: '0 auto', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <label htmlFor="email" style={{marginBottom: "10px"}}>
              Email:
            </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmail}
                style={{border: 'none', width: '70%', height: '50px', margin: '0 auto', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', border: 'none', padding: '10px'}}
              />
          </fieldset>
          <fieldset style={{border: 'none', width: '100%', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <label htmlFor="password" style={{marginBottom: "10px"}}>
              Password: 
            </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePassword}
                style={{border: 'none', width: '70%', height: '50px', margin: '0 auto', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', border: 'none', padding: '10px'}}
              />          
          </fieldset>
          <fieldset style={{border: 'none', width: '100%', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <label htmlFor="name" style={{marginBottom: "10px"}}>
              Name:
            </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleName}
                style={{border: 'none', width: '70%', height: '50px', margin: '0 auto', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', border: 'none', padding: '10px'}}
              />
          </fieldset>
          <fieldset style={{border: 'none', width: '100%', height: '40%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <label htmlFor="profilePhoto" style={{marginBottom: "10px"}}>
              {" "}
              Profile Photo:
            </label>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                onChange={(e) => {handleFileUpload(e)}}
                style={{border: 'none', width: '70%', height: '40%', margin: '0 auto', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', border: 'none'}}
              />
          </fieldset>
          <fieldset style={{border: 'none', width: '100%', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <label htmlFor="country" style={{marginBottom: "10px"}}>
              Country:
            </label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={handleCountry}
                style={{border: 'none', width: '70%', height: '50px', margin: '0 auto', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', border: 'none', padding: '10px'}}
              />
           
          </fieldset>
          <fieldset style={{border: 'none', width: '100%', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', border: 'none'}}>
            <label htmlFor="langugage" style={{marginBottom: "10px"}}>
              Language:
            </label>
              <input
                type="text"
                id="langugage"
                name="language"
                value={language}
                onChange={handleLanguage}
                style={{border: 'none', width: '70%', height: '50px', margin: '0 auto', height: '30%',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', border: 'none', padding: '10px'}}
              />
          </fieldset>
          <button id="signupbutton"type="submit" style={{height: '50px', width: '70%', margin: '0 auto', borderRadius: '20px', border: 'none'}}>Sign up</button>
        </form>
      </div>
    );
}

export default SignupPage;