import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const storedToken = localStorage.getItem("authToken");

function UserDetails() {

    const [user, setUser] = useState({})
    const { userId } = useParams();

    const getUSer = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/users/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setUser(response.data)
                console.log(response.data);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getUSer();
    }, [userId]);

    return (
        <div className="user-details">
            <img
                src={user.image}
                alt={user.name}
                height={100}
                width={50}
                className="user-avatar"
            />

            <div className="user-info">
                <h3>Name:{user.name}</h3> 
                <h3>County:{user.country}</h3> 
                <h3>Language:{user.language}</h3> 
            </div>
        </div>
    )
}

export default UserDetails;