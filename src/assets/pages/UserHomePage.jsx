
import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";
import AddPost from "../components/AddPost"
import "../pages/userpage.css";
import AddHobby from "../components/AddHobby";
import { useState, useEffect } from "react";
import axios from "axios";
const storedToken = localStorage.getItem("authToken");
import { AuthContext } from '../context/auth.contex';


function UserHomePage() {

<<<<<<< HEAD
=======
    const [userPosts, setUserPosts] = useState([]);
    console.log(userPosts)

    useEffect(() => {
        getPosts();        
    }, []);

    const getPosts = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/posts`)
            .then((response) => {
                setUserPosts(response.data);
            })
            .catch((error) => console.log(error));
    };

    const handleDelete = (postId) => {

        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                setUserPosts(userPosts.filter((current) => current._id !== postId));
            })
            .catch((error) => console.log(error));
    };


>>>>>>> refs/remotes/origin/main
    return (
        <div className="user-homepage">
            <UserDetails />
            <AddPost getPosts={getPosts} userPosts={userPosts} />
            <AddHobby />
            <UserPosts userPosts={userPosts} handleDelete={handleDelete} />
        </div>
    )
}

export default UserHomePage;