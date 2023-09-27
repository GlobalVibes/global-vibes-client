import {Routes, Route, Link} from 'react-router-dom';
import Logo from "../pages/images/GlobalVibesLogo.png";
function HomePage(){
    return (
      <div id="bodyHome">
        <div id="upperPage">
          <img src={Logo} alt="Logo" />
          <div id="btn-container">
            <button><Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Log in</Link></button>
            <button><Link to="/signup" style={{color: 'white', textDecoration: 'none'}}>Sign up</Link></button>
          </div>
        </div>
        <div id="lowerPart">
          <p>Welcome! The biggest platform for global meetup</p>
          <Link to="/posts" style={{color: 'white', textDecoration: 'none'}}>Check our posts</Link>
        </div>
        

      </div>
    );
}



export default HomePage;
