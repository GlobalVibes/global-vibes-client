import React from "react";
import { Link } from "react-router-dom";

function UserPosts(props) {
    console.log("props.userPosts");
    
    return (
        <div className="user-posts">
            <h2>Your posts</h2>
            {props.userPosts.map((post) => (
                <div key={post._id} className="post">
                    <img src={post.image} alt={post.description} />
                    <p>{post.description}</p>
                    <p>{post.hobbie}</p>
                    <button onClick={() => props.handleDelete(post._id)}>Delete</button>
                    <Link to={`/update/${post._id}`}>Update</Link>
                </div>
            ))}
        </div>
    );
}

export default UserPosts;