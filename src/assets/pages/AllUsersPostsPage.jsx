import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../context/auth.contex';
import service from "../../services/file-upload.service";

function AllUsersPosts() {
    const { user } = useContext(AuthContext);
    const [allUsersPosts, setAllUsersPosts] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    

    const handleFilterChange = (e) => {
        const filteredPosts = allUsersPosts.filter(post =>
            post.hobby.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilterValue(e.target.value);
        setAllUsersPosts(filteredPosts);
    };
    
    useEffect(() => {
       
        service.getPosts()
            .then((data) => {               
                const postsWithLikes = data.map(post => ({
                    ...post,
                   
                }));
                setAllUsersPosts(postsWithLikes);
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
                <div key={post._id} className="post" style={{ width: '60%', margin: '30px auto', color: 'black' }}>
                    <p style={{ color: 'white', backgroundColor: 'purple', width: '100px', height: '30px', padding: '5px', borderRadius: '40px', margin: '0 auto' }}>{post.hobby.title}</p>
                    <br />
                    <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                        {post.image &&
                            (<img src={post.image} alt={post.description} width='500' height='500' style={{ objectFit: 'cover' }} />)
                        }
                        <p style={{ textAlign: 'center' }}>{post.description}</p>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}

export default AllUsersPosts;