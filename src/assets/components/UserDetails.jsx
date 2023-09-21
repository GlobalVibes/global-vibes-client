import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function UserDetails() {

    const [user, setUser] = useState({})
    const { userId } = useParams();

    const getUSer = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
            .then(response => {
                setUser(response.data)
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
                width={50} />

            <container>
                <h3>Name:</h3> {user.name}
                <h3>Name:</h3> {user.country}
                <h3>Name:</h3> {user.language}
            </container>
        </div>
    )
}

export default UserDetails;