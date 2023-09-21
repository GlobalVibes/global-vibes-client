import './App.css'
import HomePage from './assets/pages/HomePage';
import {Routes, Route} from 'react-router-dom';
import SignupPage from './assets/pages/SignupPage';
import LoginPage from './assets/pages/LoginPage';
import UserHomePage from './assets/pages/UserHomePage';
import NavBar from './assets/components/NavBar';
function App() {

  return (
    <>
    <NavBar />
    
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/auth/signup" element={<SignupPage />}></Route>
      <Route path="/auth/login" element={<LoginPage />}></Route>
      <Route path="/api/posts" element={<UserHomePage />}></Route>
    </Routes>
    </>
  )
}

export default App
