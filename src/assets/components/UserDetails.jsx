import { useContext } from "react";
import { AuthContext } from '../context/auth.contex';

function UserDetails() {
    const {user} = useContext(AuthContext);
    return (
        <div className="user-details">
            <img
                src={user.profilePhoto}
                alt={user.name}
                height={100}
                width={50}
                className="user-avatar"
            />

            <div className="user-info">
                <h3>Name: {user.name}</h3> 
                <h3>Country:{user.country}</h3> 
                <h3>Language:{user.language}</h3> 
            </div>
        </div>
    )
}

export default UserDetails;