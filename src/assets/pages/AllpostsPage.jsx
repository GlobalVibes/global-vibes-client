import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../context/auth.contex';
import service from "../../services/file-upload.service";
import { Link } from 'react-router-dom';

function AllPosts() {
    const { user } = useContext(AuthContext);
    const [allPosts, setallPosts] = useState([])

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/posts`)
            .then(response => {
                setallPosts(response.data)
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        service.getPosts()
            .then((data) => {

                setallPosts(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="user-posts">
            <h2>All Posts</h2>
            <>
                <label><Link to="/signup"> <button>Sign Up</button> </Link> to be part of our community and share your posts as well!</label>

            </>
            <>
                <label>Already have an acount? <Link to="/login"> <button>Login</button> </Link></label>
            </>
            {allPosts && allPosts.map((post) => (
                <div key={post._id} className="post">
                    <img src={post.image} alt={post.description} />
                    <p>{post.description}</p>
                    <p>{post.hobby}</p>
                </div>
            ))}
        </div>
    );
};
export default AllPosts;