import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.contex";
const storedToken = localStorage.getItem("authToken");

function AddHobby({ hobbies, setHobbies }) {
  const [title, setTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/hobbies`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setHobbies((prev) => [...prev, response.data]);
      })
      .catch((error) => console.log(error));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="AddHobby">
      <button onClick={toggleDropdown}
      className="btn btn-custom">
        {isDropdownOpen ? 'Hide Form' : 'Add Hobby'}
      </button>
      {isDropdownOpen && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ borderRadius: '10px' }}
          />
          <button type="submit" style={{ backgroundColor: 'pink', borderRadius: '10px', padding: '5px', border: 'none' }}>Add Hobby</button>
        </form>
      )}
    </div>
  );
}

export default AddHobby;
