import axios from "axios";
import { useState, useContext} from "react";
import { AuthContext } from "../context/auth.contex";
const storedToken =  localStorage.getItem("authToken")
function AddHobby({hobbies, setHobbies}) {
    const [title, setTitle] = useState("");      
  
    const handleSubmit = (e) => {
        e.preventDefault();        

        const requestBody = { title };

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/hobbies`, requestBody, {
                headers: { Authorization: `Bearer ${storedToken}` },
              })
            .then((response) => {

                setTitle("");               
                setHobbies((prev) => [...prev, response.data])
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
                
                <button type="submit">Add Hobby</button>
            </form>
        </div>
    );
}

export default AddHobby;