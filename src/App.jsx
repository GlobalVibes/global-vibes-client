import './App.css'
import HomePage from './assets/pages/HomePage';
import {Routes, Route} from 'react-router-dom';
import SignupPage from './assets/pages/SignupPage';
import LoginPage from './assets/pages/LoginPage';
import UserHomePage from './assets/pages/UserHomePage';
import NavBar from './assets/components/NavBar';
import IsPrivate from './assets/components/isPrivate';
import IsAnon from './assets/components/isAnon';

function App() {

  return (
    <>
    {/*<NavBar />*/}
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>}></Route>
      <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>  }></Route>
      <Route path="/posts" element={<IsPrivate><UserHomePage /></IsPrivate>}></Route>
    </Routes>
    </>
  )
}

export default App
