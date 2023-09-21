import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";
import AddPost from "../components/AddPost"


function UserHomePage() {
    return (
        <div>
            <UserDetails/>
            <AddPost />
            <UserPosts />
        </div>
    )
}

export default UserHomePage;