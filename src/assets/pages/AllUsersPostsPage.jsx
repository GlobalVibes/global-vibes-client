import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../context/auth.contex';
import service from "../../services/file-upload.service";

function AllUsersPosts() {
    const { user } = useContext(AuthContext);
    const [allUsersPosts, setAllUsersPosts] = useState([]);
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/posts`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(response => {
                const postsWithLikesInitialized = response.data.map(post => ({
                    ...post,
                    likes: 0 
                }));
                setAllUsersPosts(postsWithLikesInitialized);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        service.getPosts()
            .then((data) => {
                const postsWithLikesInitialized = data.map(post => ({
                    ...post,
                    likes: 0 
                }));
                setAllUsersPosts(postsWithLikesInitialized);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleFilterChange = (e) => {
        const filteredPosts = allUsersPosts.filter(post =>
            post.hobby.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilterValue(e.target.value);
        setAllUsersPosts(filteredPosts);
    };

    const handleLikeClick = (postId) => {
        
        const updatedPosts = allUsersPosts.map(post => {
            if (post._id === postId) {
             
                const updatedPost = { ...post, likes: post.likes + 1 };
                return updatedPost;
            }
            return post;
        });
        setAllUsersPosts(updatedPosts);
    };

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
                    <p>{post.hobby.title}</p>
                    <button onClick={() => handleLikeClick(post._id)}>
                        <span role="img" aria-label="heart">❤️</span> {post.likes}
                    </button>
                    <button onClick={(e) => (post._id)}>Comment</button>
                </div>
            ))}
        </div>
    );
}

export default AllUsersPosts;