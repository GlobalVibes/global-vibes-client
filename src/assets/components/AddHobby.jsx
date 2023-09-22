import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddHobby() {
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({
            ...newHobby,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        axios
            .post(`${import.meta.env.VITE_API_URL}/user-homepage`, newHobby, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {

                const createdHobby = response.data;

                navigate(`/user-homepage/${createdHobby.id}`);
            })
            .catch((error) => {

                console.error("Error creating a new hobby:", error);
            });
    };

    const [newHobby, setNewPost] = useState({
        title: "",
        description: "",
       
    });

    return (
        <div>
            <h2>Add a New Hobby</h2>
            <form onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newHobby.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newHobby.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                
                <button type="submit">Add Hobby</button>
            </form>
        </div>
    );
}

export default AddHobby;