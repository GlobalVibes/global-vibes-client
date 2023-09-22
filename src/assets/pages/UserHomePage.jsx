
import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";
import AddPost from "../components/AddPost"
import "../pages/userpage.css";
import AddHobby from "../components/AddHobby";


function UserHomePage() {
    return (
        <div className="user-homepage">
            <UserDetails />
            <AddPost />
            <AddHobby />
            <UserPosts />
        </div>
    )
}

export default UserHomePage;