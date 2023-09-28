import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../context/auth.contex';
import service from "../../services/file-upload.service";

function AllUsersPosts() {
    const { user } = useContext(AuthContext);
    const [allUsersPosts, setAllUsersPosts] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [commentTexts, setCommentTexts] = useState({}); 

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/posts`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(response => {
                const postsWithLikesInitialized = response.data.map(post => ({
                    ...post,
                    likes: 0,
                    comments: [], 
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
                    likes: 0,
                    comments: [], 
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

    const handleCommentChange = (e, postId) => {
        const updatedCommentTexts = { ...commentTexts };
        updatedCommentTexts[postId] = e.target.value;
        setCommentTexts(updatedCommentTexts);
    };

    const handleCommentSubmit = (postId) => {
        const newCommentText = commentTexts[postId];

        if (newCommentText) {
            const newComment = {
                text: newCommentText,
                
            };

            const updatedPosts = allUsersPosts.map((post) => {
                if (post._id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, newComment],
                    };
                }
                return post;
            });

            setAllUsersPosts(updatedPosts);
            const updatedCommentTexts = { ...commentTexts };
            updatedCommentTexts[postId] = ''; 
            setCommentTexts(updatedCommentTexts);
        }
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
                <div key={post._id} className="post" style={{width: '60%', margin: '30px auto', color: 'black'}}>
                        <p style={{color: 'white', backgroundColor: 'purple', width:'100px', height:'30px', padding: '5px', borderRadius: '40px', margin: '0 auto'}}>{post.hobby.title}</p>   
                        <br/>                    
                        <div style={{display: 'flex', flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
                        {post.image && 
                        (<img src={post.image} alt={post.description} width='500' height='500' style={{objectFit: 'cover'}}/>)
                        }
                        <p style={{textAlign: 'center'}}>{post.description}</p>
                        </div>
                    <button onClick={() => handleLikeClick(post._id)}>
                        <span role="img" aria-label="heart">❤️</span> {post.likes}
                    </button>
                    <input
                        type="text"
                        placeholder="Add a comment"
                        value={commentTexts[post._id] || ''}
                        onChange={(e) => handleCommentChange(e, post._id)}
                    />
                    <button onClick={() => handleCommentSubmit(post._id)}>
                        Comment
                    </button>
                    <div className="comments">
                        <label>Coments</label>
                        <br />
                        {post.comments.map((comment, index) => (
                            <div key={index} className="comment">
                                {comment.text}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllUsersPosts;