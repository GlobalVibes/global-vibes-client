import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const storedToken = localStorage.getItem("authToken");
import { AuthContext } from '../context/auth.contex';
function UserPosts() {
    const { user } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([])
    const { author } = useParams();
    const getUserPosts = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/posts`)
            .then(response => {
                setUserPosts(response.data)
            })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        getUserPosts();
    }, []);
    const handleDelete = (postId) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/posts`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setUserPosts(userPosts.filter((post) => post.id !== postId));
            })
            .catch((error) => console.log(error));
    };
    const handleUpdate = (postId) => {
        // will be implemented later
    };
    return (
        <div className="user-posts">
            <h2>Your posts</h2>
            {userPosts.map((post) => (
                <div key={post.id} className="post">
                    <img src={post.image} alt={post.description} />
                    <p>{post.description}</p>
                    <p>{post.hobby}</p>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                    <button onClick={() => handleUpdate(post.id)}>Update</button>
                </div>
            ))}
        </div>
    );
};
export default UserPosts;