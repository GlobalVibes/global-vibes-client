import axios from "axios";
import { useState} from "react";


function AddHobby() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");    


    const handleSubmit = (e) => {
        e.preventDefault();        

        const requestBody = { title, description };

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/hobbies`, requestBody)
            .then((response) => {

                setTitle("");
                setDescription("");
                
            })
            .catch((error) => console.log(error));
    };


    return (
        <div className="AddHobby">
            <form onSubmit={handleSubmit}>           
             <h3>Add New Hobby</h3>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Add Hobby</button>
            </form>
        </div>
    );
}

export default AddHobby;