import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        skills: "",
        location: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/auth/profile");
            setFormData(response.data.user);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put("/auth/profile",formData);

            localStorage.setItem("user",JSON.stringify(response.data.user));

            alert("Profile Updated Successfully");
            navigate("/profile");
            
        } catch (error) {
            console.log(error.response?.data);
        }
    };
return (
    <div className="edit-profile-page">

        <h2 className="edit-profile-title">Edit Profile</h2>

        <form className="edit-profile-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Phone</label>
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Location</label>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Bio</label>
                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Skills</label>
                <input
                    type="text"
                    name="skills"
                    placeholder="Skills (HTML, CSS, React...)"
                    value={formData.skills || ""}
                    onChange={handleChange}
                />
            </div>

            <button className="update-profile-btn" type="submit">
                Update Profile
            </button>

        </form>

    </div>
);
}

export default EditProfile;