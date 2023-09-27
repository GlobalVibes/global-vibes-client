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
                <p>Name:<strong> {user.name}</strong></p> 
                <p>Country:<strong>{user.country}</strong></p> 
                <p>Language:<strong>{user.language}</strong></p> 
            </div>
        </div>
    )
}

export default UserDetails;