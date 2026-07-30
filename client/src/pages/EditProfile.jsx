import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Edit Profile</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name || ""}
                    onChange={handleChange}
                /><br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email || ""}
                    onChange={handleChange}
                /><br /><br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                /><br /><br />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location || ""}
                    onChange={handleChange}
                /><br /><br />

                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="skills"
                    placeholder="Skills"
                    value={formData.skills || ""}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default EditProfile;