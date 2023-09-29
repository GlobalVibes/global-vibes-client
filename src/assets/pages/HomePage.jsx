import {Routes, Route, Link} from 'react-router-dom';
import Logo from "../pages/images/GlobalVibesLogo.png";
function HomePage(){
    return (
      <div id="bodyHome">
        <div id="upperPage">
          <img src={Logo} alt="Logo" />
          <div id="btn-container">
            <button class="btn"><Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Log in</Link></button>
            <button class="btn"><Link to="/signup" style={{color: 'white', textDecoration: 'none'}}>Sign up</Link></button>
            <Link to="/posts" style={{color: 'white', textDecoration: 'none'}}><button id="checkourpostbutton">Check our posts</button></Link>
          </div>
        </div>
        <div id="lowerPart">
          <h2 id="welcometext">Welcome! The biggest platform for global meetup</h2>          
        </div>
      </div>
    );
}



export default HomePage;
