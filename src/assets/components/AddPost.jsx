import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.contex";
import service from "../../services/file-upload.service";

function AddPost() {
  const { storedToken } = useContext(AuthContext);
  const [hobbies, setHobbies] = useState([]);
  const [newPost, setNewPost] = useState({
    image: "",
    description: "",
    hobby: "",
  });
  const [imageUrl, setImageUrl] = useState("")

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("profilePhoto", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setNewPost({...newPost, image: response.fileUrl});
      })
      .catch(err => console.log("Error while uploading the file: ", err));
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
    console.log(newPost);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/posts`, newPost, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setNewPost(" ");
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
        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="image">Image URL:</label>
            <input
              type="file"
              id="image"
              name="image"
            //   value={newPost.image}
              onChange={(e) => {handleFileUpload(e)}}
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
