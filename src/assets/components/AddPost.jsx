import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.contex";
import service from "../../services/file-upload.service";

function AddPost({ hobbies, setHobbies, getPosts, userPosts }) {
  const [newPost, setNewPost] = useState({
    image: "",
    description: "",
    hobby: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { storedToken } = useContext(AuthContext);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("profilePhoto", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setNewPost({ ...newPost, image: response.fileUrl });
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/posts`, newPost, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setNewPost({
          image: "",
          description: "",
          hobby: "",
        });
        getPosts();
      })
      .catch((error) => {
        console.error("Error creating a new post:", error);
      });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
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
    <div>
      <button
        type="button"
        className="btn btn-custom"
        onClick={toggleForm}
      >
        {isFormOpen ? "Hide Form" : "Add Post"}
      </button>

      <div
        className={`collapse ${isFormOpen ? "show" : ""}`}
        id="addPostForm"
      >
        <form onSubmit={handleSubmit} id="AddPost">
          <h3>Add a New Post</h3>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => {
                handleFileUpload(e);
              }}
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
              rows="1"
              cols="5"
            ></textarea>
          </div>

          <div>
            <label htmlFor="hobby">Hobby:</label>
            <select
              id="hobby"
              name="hobby"
              value={newPost.hobby}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Hobby</option>
              {hobbies.map((elem) => {
                return (
                  <option key={elem._id} value={elem._id}>
                    {elem.title}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit">Add Post</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;


