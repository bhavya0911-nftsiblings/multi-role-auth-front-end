import { Navigate } from "react-router-dom";
import { Context } from "../main";
import { useContext, useEffect } from "react";

const Profile = () => {

    const { isAuthenticated, user } = useContext(Context);

    if(!isAuthenticated) {
        return (
            <Navigate to={"/"} />
        )
    }

    return (
        <div>
            <div>
                <span>Name: </span>
                <span>{user.name}</span>
            </div>
            <div>
                <span>Email: </span>
                <span>{user.email}</span>
            </div>
            <di>
                <span>Role: </span>
                <span>{user.role}</span>
            </di>
        </div>
    )

};

export default Profile;