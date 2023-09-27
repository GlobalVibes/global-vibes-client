import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../context/auth.contex';
import { Link, useNavigate } from "react-router-dom";
const storedToken = localStorage.getItem("authToken");
import service from "../../services/file-upload.service";
function UserPosts() {
    const { user } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/posts`)
            .then(response => {
                setUserPosts(response.data)
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        service.getPosts()
          .then((data) => {
            // console.log("data", data);
            setUserPosts(data);
          })
          .catch((err) => console.log(err));
      }, []);
    const handleDelete = (postId) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                setUserPosts(userPosts.filter((current) => current._id !== postId))
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="user-posts">
            <h2>Your posts</h2>
            {userPosts && userPosts.map((post) => (
                <div key={post._id} className="post">
                    <img src={post.image} alt={post.description} />
                    <p>{post.description}</p>
                    <p>{post.hobbie}</p>
                    <p>{post.user}</p>
                    <button onClick={(e) => handleDelete(post._id)}>Delete</button>
                    <Link to={`/update/${post._id}`}>Update</Link>
                </div>
            ))}
        </div>
    );
};
export default UserPosts;