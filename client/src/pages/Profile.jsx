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
            setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <div>
            <h2>Profile</h2>

            {user && (
                <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong>{user.email}</p>
                    <p><strong>Role:</strong>{user.role}</p>
                </>
            )}
        </div>
    );
}

export default Profile;