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
                <label><Link to="/signup"> <button style={{border: 'none', backgroundColor: 'purple', color: 'white', borderRadius: '10px', padding: '5px'}}>Sign Up</button> </Link> to be part of our community and share your posts as well!</label>

            </>
            <>
                <label>Already have an acount? <Link to="/login"> <button style={{border: 'none', backgroundColor: 'purple', color: 'white', borderRadius: '10px', padding: '5px'}}>Login</button> </Link></label>
            </>
            {allPosts && allPosts.map((post) => (
                <div key={post._id} className="post" style={{width: '60%', margin: '30px auto', color: 'black'}}>
                        <p style={{color: 'white', backgroundColor: 'purple', width:'100px', height:'30px', padding: '5px', borderRadius: '40px', margin: '0 auto'}}>{post.hobby.title}</p>   
                        <br/>                    
                        <div style={{display: 'flex', flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
                        {post.image && 
                        (<img src={post.image} alt={post.description} width='500' height='500' style={{objectFit: 'cover'}}/>)
                        }
                        <p style={{textAlign: 'center'}}>{post.description}</p>
                        </div>
                </div>
            ))}
        </div>
    );
};
export default AllPosts;