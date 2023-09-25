import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const storedToken = localStorage.getItem("authToken");
import {useNavigate} from 'react-router-dom';

function UpdatePost() {
    
  const { postId } = useParams();
  const [newPost, setNewPost] = useState({image: "", description: ""});
  const navigate = useNavigate();

  //useEffect runs on render and when postId changes (postId comes from the URL params). Fetches the post based on ID
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`)
      .then((response) => {
        setNewPost(response.data);
      });
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newPost);

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, newPost, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const createdPost = response.data;
        navigate(`/user-homepage`);
      })
      .catch((error) => {
        console.error("Error creating a new post:", error);
      });
  };
  console.log("hello")

  return (
    // newPost && to be sure you have a post before rendering
    newPost && (
      <form onSubmit={handleSubmit}>
        <h1>Update Post</h1>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={newPost.image}
            onChange={(e) =>
              setNewPost((prev) => ({ ...prev, image: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  );
}

export default UpdatePost;
