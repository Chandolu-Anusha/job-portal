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

    const initials = (user?.name || "U")
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("");

    return (
        <div className="profile-page">
            <div className="page-container">
                <h2 className="profile-title">My Profile</h2>
                <p className="profile-subtitle">
                    Manage your personal information and account settings.
                </p>

                {user && (
                    <div className="profile-card">
                        <div className="profile-head">
                            <div className="profile-avatar">{initials}</div>
                            <div>
                                <h3 className="profile-name">{user.name}</h3>
                                <span className="badge badge-primary">{user.role}</span>
                            </div>
                        </div>

                        <div className="profile-details">
                            <div className="detail-item">
                                <span className="detail-label">Email</span>
                                <span className="detail-value">{user.email}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Phone</span>
                                <span className="detail-value">{user.phone || "Not added yet"}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Location</span>
                                <span className="detail-value">{user.location || "Not added yet"}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Skills</span>
                                <span className="detail-value">{user.skills || "Not added yet"}</span>
                            </div>
                        </div>

                        {user.bio && (
                            <div className="profile-bio">
                                <span className="detail-label">Bio</span>
                                <p>{user.bio}</p>
                            </div>
                        )}

                       <div className="profile-action">
                            <Link to="/edit-profile">
                                <button className="profile-btn primary">Edit Profile</button>
                            </Link>
                            <Link to="/change-password">
                            <button className="profile-btn outline">Change Password</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;