import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.contex";

function AddPost(props) {
  const { storedToken } = useContext(AuthContext);
  const [hobbies, setHobbies] = useState([]);
  const [newPost, setNewPost] = useState({
    image: "",
    description: "",
    hobby: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();    

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/posts`, newPost, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.getPosts()
       
        setNewPost({
          image: "",
          description: "",
          hobby: "",
        });      
      })
      .catch((error) => {
        console.error("Error creating a new post:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/hobbies`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((hobbies) => {
        setHobbies(hobbies.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    newPost && (
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

            <select id="hobby">
              {hobbies.map((elem) => {
                return (
                  <option key={elem._id} value={elem.description}>
                    {elem.title}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit">Add Post</button>
        </form>
      </div>
    )
  );
}
export default AddPost;
