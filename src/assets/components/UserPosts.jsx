import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.contex";

function UserPosts(props) {
    const { user } = useContext(AuthContext); 
    return (
        <div className="user-posts">
            <h2>Your posts</h2>
            { props.userPosts &&
        props.userPosts.map((post) => { 
                return post.author === user._id && (
                    <div key={post._id} className="post" style={{ color: 'black' }}>
                        <p style={{color: 'white', backgroundColor: 'purple', width:'100px', height:'30px', padding: '5px', borderRadius: '40px', margin: '0 auto'}}>{post.hobby.title}</p>   
                        <br/>                    
                        <div style={{display: 'flex', flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
                        {post.image && 
                        (<img src={post.image} alt={post.description} width='500' height='500' style={{objectFit: 'cover'}}/>)
                        }
                        <p style={{textAlign: 'center'}}>{post.description}</p>
                        <div style={{display: 'flex', flexDirection:"row", justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                        <button onClick={() => props.handleDelete(post._id)}>Delete</button>
                        <Link to={`/update/${post._id}`}>Update</Link>  
                        </div>   
                        </div>
                    </div>
                )
                })}
        </div>
    );
}
export default UserPosts;