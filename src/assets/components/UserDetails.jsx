import { useContext } from "react";
import { AuthContext } from "../context/auth.contex";

function UserDetails() {
    const {
        user
       } = useContext(AuthContext); 
    console.log(user);

    
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