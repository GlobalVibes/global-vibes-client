import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.contex";

function UserPosts(props) {
    const { user } = useContext(AuthContext); 
    console.log(props)
    return (
        <div className="user-posts">
            <h2>Your posts</h2>
            { props.userPosts &&
        props.userPosts.map((post) => { 
                return post.author === user._id && (
                    <div key={post._id} className="post" style={{ color: 'black' }}>
                        <img src={post.image} alt={post.description} />
                        <p>{post.description}</p>
                        <p>{post.hobby.title}</p>
                        <button onClick={() => props.handleDelete(post._id)}>Delete</button>
                        <Link to={`/update/${post._id}`}>Update</Link>
                    </div>
                )
                })}
        </div>
    );
}
export default UserPosts;