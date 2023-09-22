
import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";
import AddPost from "../components/AddPost"
import "../pages/userpage.css";


function UserHomePage() {
    return (
        <div className="user-homepage">
            <UserDetails />
            <AddPost />
            <UserPosts />
        </div>
    )
}

export default UserHomePage;