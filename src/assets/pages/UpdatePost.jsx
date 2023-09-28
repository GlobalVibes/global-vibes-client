import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.contex";
import {useNavigate} from 'react-router-dom';
import service from "../../services/file-upload.service";

function UpdatePost() {
 const [hobbies, setHobbies] = useState([]);
  const [newPost, setNewPost] = useState({
    image: "",
    description: "",
    hobby: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false); // State to manage form visibility

  const {postId} = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    console.log("new post", newPost)
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, newPost, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // setNewPost({...newPost, response.data});
                console.log(response.data);
        navigate(`/user-homepage`);
      })
      .catch((error) => {
        console.error("Error creating a new post:", error);
      });
    }

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
    // newPost && to be sure you have a post before rendering
    newPost && (
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', gap: '50px', padding: '20px', color:'white'}}>
        <h1>Edit Post</h1>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            //value={newPost.description}
            onChange={(e) => 
              setNewPost((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
            <label htmlFor="hobby">Hobby:</label>
            <select
              id="hobby"
              name="hobby"
              value={newPost.hobby}
              onChange={(e) => 
                setNewPost((prev) => ({ ...prev, hobby: e.target.value }))
              }
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
          <button type="submit" style={{ backgroundColor: 'pink', borderRadius: '10px', padding: '5px', border: 'none' }}>Submit</button>
      </form>
    )
  );
}

export default UpdatePost;
