import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPost() {
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({
            ...newPost,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        r
        axios
            .post(`${import.meta.env.VITE_API_URL}/posts`, newPost, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {

                const createdPost = response.data;

                navigate(`/posts/${createdPost.id}`);
            })
            .catch((error) => {

                console.error("Error creating a new post:", error);
            });
    };

    const [newPost, setNewPost] = useState({
        image: "",
        description: "",
        hobby: "",
    });

    return (
        <div>
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={newPost.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newPost.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="hobby">Hobby:</label>
                    <input
                        type="text"
                        id="hobby"
                        name="hobby"
                        value={newPost.hobby}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Add Post</button>
            </form>
        </div>
    );
}

export default AddPost;






