import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../context/auth.contex';
import { Link, useNavigate } from "react-router-dom";
const storedToken = localStorage.getItem("authToken");
import service from "../../services/file-upload.service";

function AllUsersPosts() {
    const { user } = useContext(AuthContext);
    const [allUsersPosts, setAllUsersPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/posts`)
            .then(response => {
                setAllUsersPosts(response.data)
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        service.getPosts()
            .then((data) => {

                setAllUsersPosts(data);
            })
            .catch((err) => console.log(err));
    }, []);

    
    return (
        <div className="user-posts">
            <h2>Posts</h2>
            <input
            type="text"
            placeholder="Filter by hobby"
            value={filterValue}
            onChange={handleFilterChange}
          />
            {allUsersPosts && allUsersPosts.map((post) => (
                <div key={post._id} className="post">
                    <img src={post.image} alt={post.description} />
                    <p>{post.description}</p>
                    <p>{post.hobby.tittle}</p>

                    <button onClick={(e) => (post._id)}>Comment</button>
                    <button onClick={(e) => (post._id)}>Like</button>
                </div>
            ))}
        </div>
    );
};
export default UserPosts;