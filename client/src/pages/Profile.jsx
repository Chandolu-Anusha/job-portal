import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./Profile.css";
import "./ChangePassword.css";

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/auth/profile");
            console.log("setting user:",response.data.user)
            setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data);
        }
    };
    console.log("Current state:",user);
    return (
        <div className="profile-page">
            <h2 className="profilr-title">Profile</h2>

            {user && (
                <div className="profile-card">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong>{user.email}</p>
                    <p><strong>Role:</strong>{user.role}</p>

                    <p><strong>Phone: </strong>{user.phone  ||  "Not added yet"}</p>
                    <p><strong>Location: </strong>{user.location  || "Not added yet"}</p>
                    <p><strong>Bio: </strong>{user.bio  || "Not added yet"}</p>
                    <p><strong>Skills: </strong>{user.skills || "Not added yet"}</p>

                   <div className="profile-action">
                        <Link to="/edit-profile">
                            <button className="profile-btn">Edit Profile</button>
                        </Link>
                        <Link to="/change-password">
                        <button className="profile-btn">Change Password</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;