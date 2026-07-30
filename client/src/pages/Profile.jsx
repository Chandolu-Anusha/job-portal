import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

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
        <div>
            <h2>Profile</h2>

            {user && (
                <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong>{user.email}</p>
                    <p><strong>Role:</strong>{user.role}</p>

                    <p><string>Phone:</string>{user.phone  ||  "Not added yet"}</p>
                    <p><strong>Location:</strong>{user.location  || "Not added yet"}</p>
                    <p><strong>Bio:</strong>{user.bio  || "Not added yet"}</p>
                    <p><strong>Skills</strong>{user.skills || "Not added yet"}</p>

                    <Link to="/change-password">
                       <button>Change Password</button>
                    </Link>
                    <Link to="/edit-profile">
                        <button>Edit Profile</button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default Profile;