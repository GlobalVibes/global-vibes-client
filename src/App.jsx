import './App.css'
import HomePage from './assets/pages/HomePage';
import {Routes, Route} from 'react-router-dom';
import SignupPage from './assets/pages/SignupPage';
import LoginPage from './assets/pages/LoginPage';
import NavBar from './assets/components/NavBar';
import IsPrivate from './assets/components/isPrivate';
import IsAnon from './assets/components/isAnon';
import UserHomePage from './assets/pages/UserHomePage';
import UpdatePost from './assets/pages/UpdatePost';
import AllPosts from './assets/pages/AllpostsPage';
import AllUsersPosts from './assets/pages/AllUsersPostsPage';
import { useContext } from 'react';
import { AuthContext } from './assets/context/auth.contex';




function App() {
const { user} = useContext(AuthContext)
  return (
    <>
    {user &&   <NavBar />}
  

    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/user-homepage" element={<IsPrivate><UserHomePage /></IsPrivate>}></Route>  
      <Route path="/update/:postId" element={<IsPrivate><UpdatePost /></IsPrivate>}></Route>
      <Route path="/posts" element={<IsAnon><AllPosts /></IsAnon>}></Route>
      <Route path="/allposts" element={<IsPrivate><AllUsersPosts /></IsPrivate>}></Route>
    </Routes>
    </>
  )
}

export default App
