import axios from "axios";
import { useState} from "react";


function AddHobby() {
    const [title, setTitle] = useState("");      

    const handleSubmit = (e) => {
        e.preventDefault();        

        const requestBody = { title };

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/hobbies`, requestBody)
            .then((response) => {

                setTitle("");               
                
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="AddHobby">
            <h3>Add New Hobby</h3>

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />             
                
                <button type="submit">Add Hobby</button>
            </form>
        </div>
    );
}

export default AddHobby;