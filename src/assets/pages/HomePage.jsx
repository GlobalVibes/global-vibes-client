import {Routes, Route, Link} from 'react-router-dom';
import Logo from "../GlobalVibesLogo.png";
function HomePage(){
    return (
      <div id="bodyHome">
        <div id="upperPage">
          <img src={Logo} alt="Logo" />
          <div id="btn-container">
            <button><Link to="/login">Log in</Link></button>
            <button><Link to="/signup">Sign up</Link></button>
          </div>
        </div>
        <div id="lowerPart">
          <p>Welcome! The biggest platform for global meetup</p>
          <Link to="/api/posts">Meet our community</Link>
        </div>
        

      </div>
    );
}



export default HomePage;
